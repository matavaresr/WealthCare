import requests
from Variables import Variables
from belvo.client import Client
from belvo.resources import Institutions
from belvo.enums import Environment
import Mondongo as MDB
import json 

var = Variables()

def getInstitut():

    client = Client(var.SecretID, var.SecretPassword, Environment.SANDBOX.value)
    


    instuciones = Institutions.list(self=client.Institutions)
    print("Flag")
    for inst in instuciones:
       print("Flag")
       links = client.Links.list(self=inst['id'])

    print(type(links))

def getAccounts():

    data = []
    client = Client(var.SecretID, var.SecretPassword, Environment.SANDBOX.value)

    institutions = client.Institutions.list()
    Link = client.Links
    LinksCreated = []
    users = {}
    username = ""
    password = ""
    
    for inst in institutions: #busca institucion por institucion
        #print(f"ID: {inst['id']}, Name: {inst['name']}, Country: {inst['country_code']}")
        if inst['resources'] != ["TAX_COMPLIANCE_STATUS","TAX_RETURNS","TAX_STATUS","INVOICES"] and inst['resources'] != ["EMPLOYMENT_RECORDS", "OWNERS"]: #Evita Cuentas de Taxas
            i = 0
            for fields in inst['form_fields']: # busca los campos de formulario
                userkey = users.keys()
                if fields['name'] == "username": # almacena nombre
                    username = fields['label']
                    print(username)
                elif 'label' in fields: #Verifica que aun contenga el apartado label (donde se almacena el valor)
                    if fields['name'] == "password": # y su contrasena
                        password = fields['label']
                        if username in userkey: #evita sobreescribir usernames iguales
                            users[username+username] = password
                        else:
                            users[username] = password
                else: # si no sale del for
                    break
                #print(i)
                #i = i+1
            if users != {}:
                name = username 

                if username+username in users:
                    print("Flagdoble")
                    LinksCreated = Link.create(inst['name'], name, users[name+name])
                else:
                    print("Flag2")
                    LinksCreated = Link.create(inst['name'], name, users[name])
    for Links in LinksCreated:
        accounts = client.Accounts.list()
        for account in accounts:
            print(account)
            
def createJsonPerInstitue():

    data = []
    client = Client(var.SecretID, var.SecretPassword, Environment.SANDBOX.value)

    institutions = client.Institutions.list()
   

    i = 0
    for inst in institutions: #busca institucion por institucion
        #print(f"ID: {inst['id']}, Name: {inst['name']}, Country: {inst['country_code']}")
        if inst['resources'] != ["TAX_COMPLIANCE_STATUS","TAX_RETURNS","TAX_STATUS","INVOICES"] and inst['resources'] != ["EMPLOYMENT_RECORDS", "OWNERS"] : #Evita Cuentas de Taxas
            
            with open(f'./Local/Institutes/Institutes{i}.json', 'w') as file:
                json.dump(inst, file)
            i+=1

def loadJsonPerInstitute():

    
    jsonData = {}
    for log in range(0,13):
        with open(f'./Local/Institutes/Institutes{log}.json','r') as file:
            data = json.loads(file)

            jsonData = data
          
            
def Test():
    client = Client(var.SecretID, var.SecretPassword, Environment.SANDBOX.value)

    institutions = client.Institutions.list()
    link_handler = client.Links
    links_created = []
    users = {}

    # Itera sobre cada institución disponible
    for inst in institutions:
        if inst['resources'] not in [["TAX_COMPLIANCE_STATUS", "TAX_RETURNS", "TAX_STATUS", "INVOICES"], ["EMPLOYMENT_RECORDS", "OWNERS"]]:
            for field in inst['form_fields']:
                if field['name'] == "username":
                    username = field['label']
                    print(f"Username field: {username}")
                elif 'label' in field and field['name'] == "password":
                    password = field['label']
                    if username not in users:  # Evita sobrescribir
                        users[username] = password
                    else:
                        users[f"{username}_duplicate"] = password  # Manejo alternativo para duplicados
                else:
                    break

            if users:
                # Si la clave de usuario duplicada existe, utiliza esa.
                username_key = f"{username}_duplicate" if f"{username}_duplicate" in users else username
                print("Creating link for:", username)
                created_link = link_handler.create(inst['name'], username, users[username_key])
                links_created.append(created_link)

# Procesar los links creados para listar cuentas
    i = 0
    DB = MDB
    for link in links_created:
        
        accounts = client.Accounts.list()
        for account in accounts:
            print(f"Cargando Archivo {i+1}") 
            transactions = client.Transactions.list(link=account['link'])
            DB.sendBigTransAccounts(transactions)
            i = i + 1

        #print(f"Cargando Archivo {i+1}")
        #DB.sendBigDataAccounts(accounts)

       
            

#getAccounts()
Test()
#createJsonPerInstitue()
#loadJsonPerInstitute()
