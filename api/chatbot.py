import os.path
import pandas
import joblib
import random

from sklearn.model_selection import GridSearchCV
from src.booker import Booker
from nltk_utils import tokenize, lemmatize, bag_of_words
from sklearn.neural_network import MLPClassifier


class TrainModel:
    def __init__(self, intents_name: str):
        self.IGNORE_WORDS = ["?", ".", "!"]
        print("Reading intents file")

        self.intents = pandas.read_json(intents_name)
        self.all_words = []
        self.tags = []
        self.word_tag = []
        self.model = None
        self.X_train = None
        self.y_train = None

        self._setup()
        print("Model setup complate")

    def findBestParams(self):
        layers = [(i,) for i in range(1, 100)]
        # layers = [(33,), (55,), (75,), (92,)]
        activation = ['identity', 'logistic', 'tanh', 'relu']
        solver = ['lbfgs', 'sgd', 'adam']
        batch_size = [8, 'auto']
        param_grid = dict(hidden_layer_sizes=layers,
                          activation=activation, solver=solver, batch_size=batch_size)
        grid = GridSearchCV(estimator=self.model, param_grid=param_grid)
        grid.fit(self.X_train, self.y_train)
        print("------------------------------------------------------")
        print([grid.best_estimator_, grid.best_params_, grid.best_score_])

    def _setup(self):
        for intent in self.intents["intents"]:
            tag = intent["tag"]
            self.tags.append(tag)
            for pattern in intent["patterns"]:
                words = tokenize(pattern)
                self.all_words.extend(words)
                self.word_tag.append((words, tag))

        self.all_words = [
            lemmatize(word) for word in self.all_words if word not in self.IGNORE_WORDS]
        self.all_words = sorted(set(self.all_words))
        self.tags = sorted(set(self.tags))

    def train(self, model_file: str = None) -> MLPClassifier:
        if(model_file and os.path.isfile(model_file)):
            self.model = joblib.load(model_file)
            return self.model

        print("Setting up trainning data")
        X_train = []
        y_train = []
        for (pattern_sentence, tag) in self.word_tag:
            bag = bag_of_words(pattern_sentence, self.all_words)
            X_train.append(bag)
            label = self.tags.index(tag)
            y_train.append(label)

        print("Trainning Model ...")
        self.model = MLPClassifier(
            hidden_layer_sizes=(33,), batch_size=8, max_iter=500)
        self.model.fit(X_train, y_train)
        print("Model trainning done.")

        self.X_train = X_train
        self.y_train = y_train

        if(model_file != None):
            self.save_to_file()

        return self.model

    def save_to_file(self):
        joblib.dump(self.model, "model.joblib")
        print("File saved. file: model.joblib")


class Chatbot:
    def __init__(self, intents_file, train: bool = False, model_file: str = "model.joblib"):
        self.model = None
        self.intents = None
        self.all_words = []
        self.tags = []
        self.train = train
        self.intents = intents_file
        self.model_file = model_file

    def setup(self):
        tm = TrainModel(self.intents)

        if not self.train:
            self.model = tm.train(self.model_file)
        else:
            self.model = tm.train()

        self.all_words = tm.all_words
        self.tags = tm.tags
        self.intents = tm.intents

    def predict(self, sentence: str) -> any:
        tokens = tokenize(sentence)
        X = bag_of_words(tokens, self.all_words)
        X = X.reshape(1, X.shape[0])
        prediction = self.model.predict(X)

        tag = self.tags[prediction[0]]

        answer = {"answer": "Sorry I did't get that."}

        for intent in self.intents["intents"]:
            if tag == intent["tag"] and len(intent['responses']) > 0:
                answer["answer"] = random.choice(intent['responses'])
        if tag == 'appoitment':
            book = Booker(":memory:")
            answer["answer"] = "Here is the available Dates"
            apps = []
            for i in book.get_appointments():
                apps.append(i.toDict())
            answer["appointments"] = apps

        print("THE tag is  ------------------------------- " + tag)
        print("DEBUG -------------------------------------- ")
        print(answer)
        return answer
