import os.path
import pandas
import joblib

from sklearn.model_selection import GridSearchCV
from sklearn.neural_network import MLPClassifier
from nltk_utils import tokenize, lemmatize, bag_of_words


class Model:
    def __init__(self, intents_name: str, language: str = "en"):
        self.IGNORE_WORDS = ["?", ".", "!"]
        print("Reading intents file for language = "+language)

        self.intents = pandas.read_json(f"languages/{intents_name}")
        self.all_words = []
        self.tags = []
        self.word_tag = []
        self.model = None
        self.X_train = None
        self.y_train = None
        self.language = language

        self._setup()
        print("Model setup complate")

    def _findBestParams(self):
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
            lemmatize(word, self.language) for word in self.all_words if word not in self.IGNORE_WORDS]
        self.all_words = sorted(set(self.all_words))
        self.tags = sorted(set(self.tags))

    def train(self, model_file: str = None, saveToFile: bool = False) -> MLPClassifier:
        if(model_file and os.path.isfile(model_file)):
            self.model = joblib.load(model_file)
            print("Loading Model from file complete\n\n")
            return self.model

        print("Setting up trainning data")
        X_train = []
        y_train = []
        for (pattern_sentence, tag) in self.word_tag:
            bag = bag_of_words(pattern_sentence, self.all_words, self.language)
            X_train.append(bag)
            label = self.tags.index(tag)
            y_train.append(label)

        print("Trainning Model ...")
        self.model = MLPClassifier(
            hidden_layer_sizes=(33,), batch_size=8, max_iter=500)
        self.model.fit(X_train, y_train)

        self.X_train = X_train
        self.y_train = y_train

        if(saveToFile):
            self.save_to_file()

        print("Model trainning done.\n\n")

        return self.model

    def save_to_file(self):
        joblib.dump(self.model, f"model_{self.language}.joblib")
        print(f"File saved. file: model_{self.language}.joblib")
