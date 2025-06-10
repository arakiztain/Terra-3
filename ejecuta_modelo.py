import os
import torch
import transformers
from transformers import DebertaV2Tokenizer, DebertaV2ForSequenceClassification
import torch.nn.functional as F
# import download_model
# import descomprimir_modelo


tokenizer = DebertaV2Tokenizer.from_pretrained(path)
model = DebertaV2ForSequenceClassification.from_pretrained(path)
model.eval()

def predict_sentiment(texts):
    inputs = tokenizer(texts, return_tensors="pt", truncation=True, padding="max_length", max_length=128)    
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = F.softmax(logits, dim=-1)
        predicted_class = torch.argmax(probs, dim=1)    
    return predicted_class.tolist(), probs.tolist()  # Devuelve clases y probabilidades



# nuevas_frases = [
#     "I love this product! It's fantastic.",
#     "This is terrible, I want a refund.",
#     "It's okay, not the best but not the worst."
# ]


# clases, probabilidades = predict_sentiment(nuevas_frases)
# for frase, clase, prob in zip(nuevas_frases, clases, probabilidades):
#     print(f":nota: Frase: {frase}")
#     print(f":lupa_derecha: Sentimiento predicho: {clase} (Probabilidades: {prob})\n")