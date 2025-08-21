import sys
import torch
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC
import soundfile as sf

def main():
    if len(sys.argv) < 2:
        print("Usage: python modelPipeline.py <audio_file_path>")
        sys.exit(1)

    audio_file_path = sys.argv[1]

    # Load audio file
    audio_input, samplerate = sf.read(audio_file_path)


    # Load model & processor
    processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")
    model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")


    # Tokenize audio
    input_values = processor(audio_input, return_tensors="pt", padding="longest").input_values
    # Run model
    logits = model(input_values).logits

    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)

    # Print transcription only
    print(transcription[0].strip())

if __name__ == "__main__":
    main()
