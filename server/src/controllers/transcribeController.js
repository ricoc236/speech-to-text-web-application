const jwt = require('jsonwebtoken');
const { exec } = require('child_process');
const fs = require('fs').promises; 
const path = require('path');
const { getDB } = require('../../mongo/config/mongodb');

async function transcribe(req, res) {

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const audioPath = req.file.path;
        const resampledAudioPath = path.join(path.dirname(audioPath), `resampled_${req.file.filename}.wav`);

    
        const execAsync = (command) => {
            return new Promise((resolve, reject) => {
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        return reject(error);
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                    resolve(stdout);
                });
            });
        };

        //convert audio to 16kHz using ffmpeg
        const ffmpegCommand = `ffmpeg -i "${audioPath}" -ar 16000 "${resampledAudioPath}"`;
        try {
            await execAsync(ffmpegCommand);
        } catch (ffmpegError) {
            console.error(`FFmpeg error: ${ffmpegError.message}`);
            return res.status(500).json({ message: 'Audio resampling failed.' });
        } finally {
            // Ensure the original file is deleted
            await fs.unlink(audioPath).catch(err => console.error('Failed to delete original temp file:', err));
        }

        //run asrmodel script
        const pythonCommand = `python asrModel/modelPipeline.py "${resampledAudioPath}"`;
        let transcript = '';
        try {
            const pythonStdout = await execAsync(pythonCommand);
            transcript = pythonStdout?.trim();
        } catch (pythonError) {
            console.error(`Python script error: ${pythonError.message}`);
            return res.status(500).json({ message: 'Transcription script failed.' });
        } finally {
            
            await fs.unlink(resampledAudioPath).catch(err => console.error('Failed to delete resampled temp file:', err));
        }

        //save to mongo 
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.user;
        
        let db = getDB();
        let transcribeCollection = db.collection('transcriptions');

        await transcribeCollection.updateOne(
            { username: username },
            {
                $push: {
                    transcription: {
                        text: transcript,
                        date: new Date()
                    }
                },
            },
            { upsert: true }
        );

        const userDocument = await transcribeCollection.findOne({ username: username });
        const data_test = userDocument?.transcription; 

        return res.status(200).json({ transcription: data_test });

    } catch (error) {
        console.error('Transcription error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { transcribe };