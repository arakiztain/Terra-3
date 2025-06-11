import numpy as np
import pandas as pd
import urg_func
import ejecuta_modelo

dic = {"Issue ID": "IPC10010111","Project ID": "PC1001","Input Date": "2025-06-10","Device": "Desktop","Page": "Home",
       "Browser": "Chrome", "Contact ID": "COC101", "Request": "This is a very good job","Classification": "Bug fix",
       "Screenshot": True}
df = pd.DataFrame(dic)
print(df)