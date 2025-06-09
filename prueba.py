import numpy as np
import pandas as pd
import urg_func

print("hola")
df = pd.read_csv("csv_prueba.csv")
df["Input Date"] = pd.to_datetime(df["Input Date"])
df["Budget"] = df["Budget"].astype(float)

urg_func.urgencia(df)

