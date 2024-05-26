import pandas as pd 
import Mondongo as BD
import json



def constructData():

    df = pd.DataFrame(columns=['ingresos','gastos','balance'])

    Datos = BD.getTransAccounts()
    jsonData = Datos



    for datos in Datos:
        
        ingresos = datos['amount'] if datos['type'] == "INFLOW" else 0
        gastos = datos['amount'] if datos['type'] == "OUTFLOW" else 0
        balance = datos['balance']

        # Crear un nuevo registro con los valores actuales
        new_row = {'ingresos': ingresos, 'gastos': gastos, 'balance': balance}
        df = df.append(new_row, ignore_index=True)
            
# Mostrar las primeras filas del DataFrame para verificar
    df.to_csv('./MLDataset/MLData.csv',index=False)




constructData()