import sys
import torch
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC
import soundfile as sf

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 modelPipeline.py <audio_file_path>")
        sys.exit(1)

    audio_file_path = sys.argv[1]

  
    audio_input, samplerate = sf.read(audio_file_path)


    processor = Wav2Vec2Processor.from_pretrained("OthmaneJ/distil-wav2vec2")
    model = Wav2Vec2ForCTC.from_pretrained("OthmaneJ/distil-wav2vec2")

 
    input_values = processor(audio_input, return_tensors="pt", padding="longest").input_values

    logits = model(input_values).logits

    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)


    print(transcription[0].strip())

if __name__ == "__main__":
    main()