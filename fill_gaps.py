import numpy as np
import pandas as pd
import sqlite3
import urg_func
import ejecuta_modelo
import urg_func

print("Bienvenido a la espiral de autodestrucción")

## LEEMOS LAS TABLAS RELEVANTES

connection = sqlite3.connect("data/BDTerra.db")
crsr = connection.cursor()

def sql_query(query):    # Ejecuta la query
    crsr.execute(query)    # Almacena los datos de la query
    ans = crsr.fetchall()    # Obtenemos los nombres de las columnas de la tabla
    names = [description[0] for description in crsr.description]    
    return pd.DataFrame(ans,columns=names)

query1 = """
SELECT *
FROM ISSUES
"""

query2 = """
SELECT * 
FROM Projects
"""

df_orig = sql_query(query1)

df_project = sql_query(query2)

df_orig.rename(columns={"Device ":"Device"}, inplace=True)

df_orig["Input Date"] = pd.to_datetime(df_orig["Input Date"])


## DEFINIMOS FUNCIONES NECESARIAS

def inicio_proyecto(proj_id):
    inicio = pd.to_datetime(df_project[df_project["Project ID"] == proj_id]["Beggining date"].values[0])
    # print(inicio)
    return inicio

def timelapse(issue_id):
    fecha = df[df["Issue ID"] == issue_id]["Input Date"].values[0]
    fecha = pd.to_datetime(fecha)
    # print(fecha,type(fecha))
    proj_id = df[df["Issue ID"] == issue_id]["Project ID"].values[0]
    date1 = fecha - pd.DateOffset(days=30)
    # print(date1)
    ini = inicio_proyecto(proj_id)
    # print(ini)
    res = max(date1, ini)
    return res

def suma_it(issue_id):
    fecha_30 = timelapse(issue_id)
    # print(fecha_30)
    input = df[df["Issue ID"] == issue_id]["Input Date"].values[0]
    # print(input)
    proj_id = df[df["Issue ID"] == issue_id]["Project ID"].values[0]
    aux = df_orig[(df_orig["Project ID"] == proj_id) & (df_orig["Input Date"].between(fecha_30,input))]
    # print(aux)
    return int(aux["Iteraciones"].sum())

def suma_na(issue_id):
    # print(fecha_30)
    input = pd.to_datetime(df[df["Issue ID"] == issue_id]["Input Date"].values[0])
    # print(input)
    proj_id = df[df["Issue ID"] == issue_id]["Project ID"].values[0]
    fecha = inicio_proyecto(proj_id)
    # print(fecha)
    aux = df_orig[(df_orig["Project ID"] == proj_id) & (df_orig["Input Date"].between(fecha,input)) & (df_orig["Classification"] == "Not addressing")]
    # print(aux)
    return int(aux["Issue ID"].count())


def suma_neg(issue_id):
    fecha_30 = timelapse(issue_id)
    fecha_30 = pd.to_datetime(fecha_30)
    # print(fecha_30)
    input = df[df["Issue ID"] == issue_id]["Input Date"].values[0]
    input = pd.to_datetime(input)
    # print(input)
    proj_id = df[df["Issue ID"] == issue_id]["Project ID"].values[0]
    aux = df_orig[(df_orig["Project ID"] == proj_id) & (df_orig["Input Date"].between(fecha_30,input)) & (df_orig["Sentiment"] == "Negative")]
    # print(aux)
    # print(aux)
    return int(aux["Issue ID"].count())


issue_type = {"Copy Issues": "E1",
              "Design Issues": "E2",
              "Request Change": "E2",
              "New Item": "E3",
              "Not Addressing": "E4",
              "Bug Fix": "E3"}

def nueva_entrada(lectura):
    dic = {
            "Issue ID": [lectura["requestId"]],
            "Project ID": [lectura["projectId"]],
            "Classification": [lectura["request_type"]],
            "Screenshot": [int(bool(lectura["screenshotPresent"]))],
            "Urgency": [None],
            "Input Date": [pd.to_datetime(lectura["fecha"],origin = "unix",unit = "ms")],
            "Deadline Theor": [None],
            "Deadline Real": [None],
            "Employee ID": [issue_type[lectura["request_type"]]],
            "Device": [lectura["device"]],
            "Browser": [lectura["browser"]],
            "Page": [lectura["pageUrl"]],
            "Contact ID": [lectura["Contact ID"]],
            "Request": [lectura["description"]],
            "Iteraciones": [0],
            "Iteraciones 30 dias": [None],
            "Not addressing historico": [None],
            "Sentiment": [None],
            "Sentiment historico": [None]
           }
    return dic


### GENERAMOS DATAFRAME CON LA ENTRADA

dic = {
  "name": "fdss",
  "request_type": "Design Issues",
  "browser": "Firefox",
  "device": "desktop",
  "description": "asdasd",
  "pageUrl": "asdasd",
  "requestId": "2ba5def5-8ffa-420b-9e64-7398e84f9a3f",
  "projectId": "PC1001",
  "nombreProyecto": "projectname",
  "fecha": 1749565515781,
  "screenshotPresent": False,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODQ4MDc4YWMzZTMzMDk3ZGYyNjY0M2QiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNzQ5NTY0NjkzLCJleHAiOjE3NDk2NTEwOTN9.MOJVTdBCTlWBdGTLGslioPaTsP7k2yi1uvGkWkN35YY",
  "Contact ID": "COC1001"
}

print("Antes dataframe")
entrada = nueva_entrada(dic)
print(entrada.keys())
df = pd.DataFrame(entrada)
print("Kapasao")
### RELLENAMOS INFORMACIÓN FALTANTE EN EL DATAFRAME A PARTIR DE LA BASE DE DATOS

# proj_id = dic["Project ID"]
# df["Employee ID"] = df_project[df_project["Project ID"] == proj_id]["Project Manager ID"].values[0]

# input = {
#         "Issue ID": "IPC10101",
#          "ProjectID"; "PC10101",
#          "Input Date": "2015-01-01"
#          }



## GENERAMOS COLUMNAS A IMPUTAR

sumas = []
for i in df["Issue ID"]:
    print("sumas", i)

    sumas.append(suma_it(i))
sumas

suma_not = []
for i in df["Issue ID"]:
    suma_not.append(suma_na(i))
suma_not

sentimiento = {0: "Negative", 1: "Neutral", 2: "Positive"}

sentiment = []
for i in df["Issue ID"]:
    req = df[df["Issue ID"] == i]["Request"].values[0]
    sentiment.append(sentimiento[ejecuta_modelo.predict_sentiment(req)[0]])

hist_neg = []
for i in df["Issue ID"]:
    hist_neg.append(suma_neg(i))
hist_neg





## IMPUTAMOS VALORES

df["Iteraciones 30 dias"] = sumas

df["Not addressing historico"] = suma_not

df["Sentiment historico"] = hist_neg



## PREPARAMOS DATAFRAME PARA IMPUTAR URGENCIA

df2 = df.merge(df_project[["Project ID", "Budget"]], how = "left", on = "Project ID")

df2["Budget"] = df2["Budget"].astype(float)

df2["Input Date"] = pd.to_datetime(df2["Input Date"])

df["Urgency"] = urg_func.urgencia(df2)

df_orig = pd.concat([df_orig,df], axis = 0, ignore_index = True)

