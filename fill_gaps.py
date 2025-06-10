import numpy as np
import pandas as pd
import sqlite3
import urg_func
import ejecuta_modelo

## LEEMOS LAS TABLAS RELEVANTES

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
    # print(date)
    proj_id = df[df["Issue ID"] == issue_id]["Project ID"].values[0]
    return max(pd.to_datetime(date) - pd.DateOffset(days=30), inicio_proyecto(proj_id))

def suma_it(issue_id):
    fecha_30 = timelapse(issue_id)
    # print(fecha_30)
    input = df[df["Issue ID"] == issue_id]["Input Date"].values[0]
    # print(input)
    proj_id = df[df["Issue ID"] == issue_id]["Project ID"].values[0]
    aux = df[(df["Project ID"] == proj_id) & (df["Input Date"].between(fecha_30,input))]
    # print(aux)
    return int(aux["Iteraciones"].sum())

def suma_na(issue_id):
    # print(fecha_30)
    input = pd.to_datetime(df[df["Issue ID"] == issue_id]["Input Date"].values[0])
    # print(input)
    proj_id = df[df["Issue ID"] == issue_id]["Project ID"].values[0]
    fecha = inicio_proyecto(proj_id)
    # print(fecha)
    aux = df[(df["Project ID"] == proj_id) & (df["Input Date"].between(fecha,input)) & (df["Classification"] == "Not addressing")]
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
    aux = df[(df["Project ID"] == proj_id) & (df["Input Date"].between(fecha_30,input)) & (df["Sentiment"] == "Negative")]
    # print(aux)
    # print(aux)
    return int(aux["Issue ID"].count())




def nueva_entrada(lectura):
    dic = {
            "Issue ID": lectura["Issue ID"],
            "Project ID": lectura["Project ID"],
            "Classifiation": None,
            "Input Date": lectura["Input Date"],
            "Deadline Theor": None,
            "Deadline Real": None,
            "Employee ID": None,
            "Device": lectura["Device"],
            "Browser": lectura["Browser"],
            "Page": lectura["Page"],
            "Contact ID": lectura["Contact ID"],
            "Request": lectura["Request"],
            "Iteraciones": 0,
            "Iteraciones 30 dias": None,
            "Not addressing historico": None,
            "Sentiment": None,
            "Sentiment historico": None 
           }
    return dic


lectura = input("Introducir el json")
df = nueva_entrada(lectura)



# input = {
#         "Issue ID": "IPC10101",
#          "ProjectID"; "PC10101",
#          "Input Date": "2015-01-01"
#          }



## GENERAMOS COLUMNAS A IMPUTAR

sumas = []
for i in df["Issue ID"]:
    sumas.append(suma_it(i))
sumas



suma_not = []
for i in df["Issue ID"]:
    suma_not.append(suma_na(i))
suma_not

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
