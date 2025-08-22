const jwt = require('jsonwebtoken');
const { getDB } = require('../../mongo/config/mongodb');


async function history(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username;

        const db = getDB();
        let transcribeCollection = db.collection('transcriptions');

     
        const historyItems = await transcribeCollection.findOne({ username : username });
        const history = historyItems?.transcription; 
        if (!history) {
            return res.status(404).json({ message: 'No transcription history found' });
        }

        res.status(200).json({transcriptions: history});
    } catch (error) {
        console.error('Error fetching transcription history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateTranscript(req, res) {
    try {  
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username;
        const index = parseInt(req.params.index, 10);
        const { newText } = req.body;

        if (isNaN(index) || index < 0) {
            return res.status(400).json({ message: 'Invalid index' });
        }
        if (!newText || typeof newText !== 'string') {
            return res.status(400).json({ message: 'Invalid new text' });
        }

        const db = getDB();
        let transcribeCollection = db.collection('transcriptions');
        let userDocument = await transcribeCollection.updateOne({ username: username
        }, {
            $set: {
                [`transcription.${index}.text`]: newText
            }
         });
        if (userDocument.modifiedCount === 0) {
            return res.status(404).json({ message: 'Transcript not found' });
        }
        

    } catch (error) {
        console.error('Error updating transcription:', error);
        res.status(500).json({ message: 'Internal server error' });
    }   
}
module.exports = { history, updateTranscript };