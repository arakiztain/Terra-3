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


df_orig["Input Date"] = pd.to_datetime(df_orig["Input Date"])


## DEFINIMOS FUNCIONES NECESARIAS


def inicio_proyecto(proj_id):
    return pd.to_datetime(df_project[df_project["Project ID"] == proj_id]["Beggining date"].values[0])

def timelapse(issue_id):
    date = df[df["Issue ID"] == issue_id]["Input Date"].values[0]
    date = pd.to_datetime(date)
    # print(date)
    proj_id = df[df["Issue ID"] == issue_id]["Project ID"]
    return max(date - pd.DateOffset(days=30), inicio_proyecto(proj_id))

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


issue_type = {"Copy issues": "E1",
              "Design issues": "E2",
              "Request change": "E2",
              "New item": "E3",
              "Not addressing": "E4",
              "Bug fix": "E3"}

def nueva_entrada(lectura):
    dic = {
            "Issue ID": [lectura["Issue ID"]],
            "Project ID": [lectura["Project ID"]],
            "Classifiation": [lectura["Classification"]],
            "Screenshot": [bool(lectura["Screenshot"])],
            "Urgency": [None],
            "Input Date": [lectura["Input Date"]],
            "Deadline Theor": [None],
            "Deadline Real": [None],
            "Employee ID": [issue_type[lectura["Classification"]]],
            "Device": [lectura["Device"]],
            "Browser": [lectura["Browser"]],
            "Page": [lectura["Page"]],
            "Contact ID": [lectura["Contact ID"]],
            "Request": [lectura["Request"]],
            "Iteraciones": [0],
            "Iteraciones 30 dias": [None],
            "Not addressing historico": [None],
            "Sentiment": [None],
            "Sentiment historico": [None]
           }
    return dic


### GENERAMOS DATAFRAME CON LA ENTRADA

dic = {"Issue ID": "IPC10010111","Project ID": "PC1001","Input Date": "2025-06-10","Device": "Desktop","Page": "Home",
       "Browser": "Chrome", "Contact ID": "COC101", "Request": "This is a very good job","Classification": "Bug fix",
       "Screenshot": True}
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

sentiment = []
for i in df["Issue ID"]:
    req = df[df["Issue ID"] == i]["Request"].values[0]
    sentiment.append(ejecuta_modelo.predict_sentiment(req)[0])

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

df_orig = pd.concat([df_orig,df], axis = 0)

print(df)