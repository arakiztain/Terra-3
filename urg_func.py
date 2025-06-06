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
    if sent == "Negativo":
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

def dias(date):
    date = pd.to_datetime(date)
    today = pd.to_datetime(date.today())
    lapse = pd.to_datetime((today - date)).day
    if lapse >= 15:
        return 5
    if lapse >= 10:
        return 3
    if lapse >= 5:
        return 2
    return 1

def itera(iter):
    if iter >= 15:
        return 4
    if iter >= 10:
        return 2
    if iter >= 4
        return 1
    return 0

def hist_itera(h_iter):
    if iter >= 65:
        return 3
    if iter >= 45:
        return 2
    if iter >= 25:
        return 1
    return 0

def browser(brow):
    if brow == "Chrome":
        return 2
    return 1


def urgencia(df, pres):
    return -1