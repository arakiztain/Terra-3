import numpy as np
import pandas as pd
import os
import sys
import requests
import gdown

url = "https://drive.google.com/drive/folders/1hpXaQrMH-s434KkqVVdUXmbewQDgerCo?dmr=1&ec=wgc-drive-globalnav-goto"

gdown.download_folder(url, quiet = False, use_cookies=False)

