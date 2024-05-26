from pymongo.mongo_client import MongoClient
import pandas as pd

'''''
uri = "mongodb+srv://DataOwnerApi:4lQ14FEiUOgYc95d@repositorio-financiamen.es7d9dp.mongodb.net/?retryWrites=true&w=majority&appName=Repositorio-FinanciaMente"

# Create a new client and connect to the server

client = MongoClient(uri)

Cuenta = client.get_database("UserCore").get_collection("Account")



# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
'''

def sendDataAccounts(info):
    uri = "mongodb+srv://DataOwnerApi:4lQ14FEiUOgYc95d@repositorio-financiamen.es7d9dp.mongodb.net/?retryWrites=true&w=majority&appName=Repositorio-FinanciaMente"

    client = MongoClient(uri)

    Cuenta = client.get_database("UserCore").get_collection("Account")

    Cuenta.insert_one(info)

def sendBigDataAccounts(info):
    uri = "mongodb+srv://DataOwnerApi:4lQ14FEiUOgYc95d@repositorio-financiamen.es7d9dp.mongodb.net/?retryWrites=true&w=majority&appName=Repositorio-FinanciaMente"

    client = MongoClient(uri)

    Cuenta = client.get_database("UserCore").get_collection("Accounts")

    Cuenta.insert_many(info)

def sendBigTransAccounts(info):
    uri = "mongodb+srv://DataOwnerApi:4lQ14FEiUOgYc95d@repositorio-financiamen.es7d9dp.mongodb.net/?retryWrites=true&w=majority&appName=Repositorio-FinanciaMente"

    client = MongoClient(uri)

    Cuenta = client.get_database("UserCore").get_collection("AccountTransactions")

    Cuenta.insert_many(info)


def getTransAccounts():
    uri = "mongodb+srv://DataOwnerApi:4lQ14FEiUOgYc95d@repositorio-financiamen.es7d9dp.mongodb.net/?retryWrites=true&w=majority&appName=Repositorio-FinanciaMente"

    client = MongoClient(uri)
    datos = []

    Cuenta = client.get_database("UserCore").get_collection("AccountTransactions")
    return Cuenta.find({},{'account': 1, 'type':1,'amount':1,'balance':1,'value_date':1,'_id':0})
