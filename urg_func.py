import numpy as np
import pandas as pd
from datetime import date
from datetime import datetime

def issue(iss):
    if iss == "Bug fix":
        return 5
    if iss == "Design" or iss == "Copy":
        return 3
    if iss == "New item":
        return 2
    return 1

def na(not_a):
    if not_a <= 3:
        return 1  
    return 3

def sentiment(sent):
    if sent == "Negative":
        return 2
    return 1

def hist_sent(h_sent):
    if h_sent >= 6:
        return 5
    if h_sent >= 3:
        return 4    
    if h_sent >= 1:
        return 2   
    return 0

def presupuesto(pres):
    if pres >= 1500000:
        return 5
    if pres >= 800000:
        return 4
    if pres >= 100000:
        return 2
    return 1


def dias(fecha, fin):
    fecha = pd.to_datetime(fecha).values[0]
    fin = pd.to_datetime(fin).values[0]
    if np.isnan(fin):
        today = pd.Timestamp.today()
        # print(today)
        # print((today-fecha).days)
        lapse = (today - fecha).days
        # print(lapse)
    else:
        # print(fin-fecha)
        lapse = (fin-fecha)/10**9/3600/24
    if lapse >= 4:
        return 3
    if lapse >= 3:
        return 2
    return 1

def itera(iter):
    if iter >= 15:
        return 4
    if iter >= 10:
        return 2
    if iter >= 4:
        return 1
    return 0

def hist_itera(h_iter):
    if h_iter >= 65:
        return 3
    if h_iter >= 45:
        return 2
    if h_iter >= 25:
        return 1
    return 0

def browser(brow):
    if brow == "Chrome":
        return 2
    return 1


def urgencia(df):
    ### PRE: A esta función se le pasa un dataframe de issues al que se también asocia a cada fila el presupuesto 
    ### del proyecto asociado al issue.
    ##################################
    ### POST: La función devuelve la culumna Urgency del DataFrame
    df_2 = df.copy()
    print(df_2.columns)
    urg = []
    for i in df_2["Issue ID"]:
        # print(i)
        iss = df_2[df_2["Issue ID"] == i]["Classification"].values[0]
        not_a = df_2[df_2["Issue ID"] == i]["Not addressing historico"].values[0]
        ###################
        #DESCOMENTAR ESTO##
        ###################
        sent = df_2[df_2["Issue ID"] == i]["Sentiment"].values[0]
        h_sent = df_2[df_2["Issue ID"] == i]["Sentiment historico"].values[0]
        ###################
        #DESCOMENTAR ESTO##
        ###################
        pres = df_2[df_2["Issue ID"] == i]["Budget"].values[0]
        fecha = df_2[df_2["Issue ID"] == i]["Input Date"]
        fin = df_2[df_2["Issue ID"] == i]["Deadline Real"]
        iter = df_2[df_2["Issue ID"] == i]["Iteraciones"].values[0]
        h_iter = df_2[df_2["Issue ID"] == i]["Iteraciones 30 dias"].values[0]
        brow = df_2[df_2["Issue ID"] == i]["Browser"].values[0]
        tot = issue(iss) + na(not_a) + sentiment("Neutro") + hist_sent(-1) + presupuesto(pres) + dias(fecha,fin) + itera(iter) + hist_itera(h_iter) + browser(brow) + sentiment(sent) + hist_sent(h_sent)


        if tot >= 20:
            urg.append("Critical")
        elif tot >= 17:
            urg.append("Urgent")
        elif tot >= 11:
            urg.append("Medium")
        else:
            urg.append("Low")
    df_2["Urgency"] = urg
    return df_2["Urgency"]