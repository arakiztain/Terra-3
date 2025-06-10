import os
import zipfile

zip_path = "C:\\Users\\pacof\\Data_Science\\The_Bridge\\TerraRipple\Modelo sentimiento Terra\\deberta_sentiment_model.zip"

extract_folder = "C:\\Users\\pacof\\Data_Science\\The_Bridge\\TerraRipple\Modelo sentimiento Terra\\"

with zipfile.ZipFile(zip_path, "r") as zip_ref:
    zip_ref.extractall(extract_folder)