import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import joblib

# Cargar el archivo CSV
df = pd.read_csv('./MLDataset/MLData.csv')

# Verificar los nombres de las columnas y los primeros datos
print("Columnas del DataFrame:", df.columns)
print(df.head())

# Verificar los datos de la columna 'balance'
print("Datos de la columna 'balance':")
print(df['balance'].describe())

# Verificar si hay valores nulos o problemáticos en 'balance'
print("Valores nulos en 'balance':", df['balance'].isnull().sum())

# Verificar si hay filas duplicadas o problemáticas en el DataFrame
print("Filas duplicadas en el DataFrame:", df.duplicated().sum())

# Eliminar filas duplicadas
df = df.drop_duplicates()
print("Filas después de eliminar duplicados:", len(df))

# Ajustar la función de riesgo para asegurar una distribución más equitativa
def riesgo(row):
    if row['ingresos'] > row['gastos'] and row['balance'] > 0:
        return 'bajo'
    elif row['ingresos'] >= row['gastos'] and row['balance'] > row['gastos'] * 0.5:
        return 'medio'
    else:
        return 'alto'

df['riesgo'] = df.apply(riesgo, axis=1)

# Verificar el DataFrame después de agregar la columna de riesgo
print(df.head())
print(df['riesgo'].value_counts())

# Preprocesamiento
X = df[['ingresos', 'gastos', 'balance']]
y = df['riesgo']

# Verificar la forma de y antes de la conversión
print("Forma de y antes de la conversión:", y.shape)

# Conversión de etiquetas a números
y = y.map({'bajo': 0, 'medio': 1, 'alto': 2})

# Verificar la forma de y después de la conversión
print("Forma de y después de la conversión:", y.shape)

# Asegurarse de que y sea una serie de pandas
if not isinstance(y, pd.Series):
    y = pd.Series(y)

# Verificar la forma de y después de asegurar una dimensión
print("Forma de y después de asegurar una dimensión:", y.shape)

# Verificar los primeros elementos de y para asegurarse de que los valores son correctos
print(y.head())

# Convertir y a un array unidimensional explícitamente
y = np.asarray(y).ravel()
print("Forma de y después de convertir a array:", y.shape)

# Dividir en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)


# Verificar la forma de los conjuntos de entrenamiento y prueba
print(X_train.shape)
print(X_test.shape)
print(y_train.shape)
print(y_test.shape)

# Escalado de datos
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Modelo de clasificación
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Guardar el modelo entrenado
joblib.dump(clf, 'modelo_entrenado.joblib')

# Cargar el modelo entrenado
clf_cargado = joblib.load('modelo_entrenado.joblib')

# Predicciones con el modelo cargado
y_pred = clf_cargado.predict(X_test)
y_proba = clf_cargado.predict_proba(X_test)

# Evaluación
print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))
print('AUC-ROC:', roc_auc_score(y_test, y_proba, multi_class='ovr'))