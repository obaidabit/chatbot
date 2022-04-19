import joblib
import pandas
import random
from sklearn.metrics import accuracy_score
from nltk_utils import tokenize, lemmatize, bag_of_words
from src.database import Database
from src.booker import Booker

db: Database = Database.instance("company.db")
booker = Booker(db)

intents = pandas.read_json("intents.json")
model = joblib.load("data.joblib")
all_words = joblib.load("all_words.joblib")
tags = joblib.load("tags.joblib")

while True:
    sentence = input    ("Write to chatbot :")
    tokens = tokenize(sentence)
    X = bag_of_words(tokens, all_words)
    X = X.reshape(1, X.shape[0])
    prediction = model.predict(X)
    
    tag = tags[prediction[0]]

    for intent in intents["intents"]:
        if tag == intent["tag"]:
            print(f"Chatbot: {random.choice(intent['responses'])}")
    if tag == "goodbye":
        break