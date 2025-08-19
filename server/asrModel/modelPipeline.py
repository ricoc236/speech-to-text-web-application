from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC
import torch
import soundfile as sf


#code structured based on wav2vec2-base-960h example from huggingface

audio_file_path = "sample.wav"

audio_input, samplerate = sf.read(audio_file_path)


#load model and tokenizer instead of pretrained dataset
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")

# tokenize
input_values = processor(audio_input, return_tensors="pt", padding="longest").input_values

#retrieve logits
logits = model(input_values).logits

# take argmax and decode
predicted_ids = torch.argmax(logits, dim=-1)
transcription = processor.batch_decode(predicted_ids)

print(transcription)