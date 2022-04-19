import pandas
import joblib
import random
from nltk_utils import tokenize, lemmatize, bag_of_words
from nltk.corpus import stopwords
from sklearn.neural_network import MLPClassifier
import os.path

class TrainModel:
	def __init__(self,intents_name:str):
		self.IGNORE_WORDS = ["?", ".", "!"]
		print("Reading intents file")

		self.intents = pandas.read_json(intents_name)
		self.all_words = []
		self.tags = []
		self.word_tag = []
		self.model = None

		self._setup()
		print("Model setup complate")

	def _setup(self):
		for intent in self.intents["intents"]:
		    tag = intent["tag"]
		    self.tags.append(tag)
		    for pattern in intent["patterns"]:
		        words = tokenize(pattern)
		        self.all_words.extend(words)
		        self.word_tag.append((words, tag))

		self.all_words = [lemmatize(word) for word in self.all_words if word not in self.IGNORE_WORDS]
		self.all_words = sorted(set(self.all_words))
		self.tags = sorted(set(self.tags))

	def train(self,model_file:str = None) -> MLPClassifier:
		if(model_file):
			self.model = joblib.load("data.joblib")
			return model

		print("Setting up trainning data")
		X_train = []
		y_train = []
		for (pattern_sentence, tag) in self.word_tag:
		    bag = bag_of_words(pattern_sentence, self.all_words)
		    X_train.append(bag)
		    label = self.tags.index(tag)
		    y_train.append(label)

		print("Trainning Model ...") 
		self.model = MLPClassifier(hidden_layer_sizes=(8,), batch_size=8)
		self.model.fit(X_train, y_train)
		print("Model trainning done.")

		return self.model

	def save_to_file(self):
		joblib.dump(self.model, "model.joblib")
		print("File saved. file: model.joblib")

class Chatbot:
	def __init__(self):
		self.model = None
		self.intents = None
		self.all_words = []
		self.tags = []

	def setup(self):
		tm = TrainModel("intents.json")
		self.model = tm.train()
		self.all_words = tm.all_words
		self.tags = tm.tags
		self.intents = tm.intents

	def predict(self,sentence:str) -> any:
		tokens = tokenize(sentence)
		X = bag_of_words(tokens,self.all_words)
		X = X.reshape(1, X.shape[0])
		prediction = self.model.predict(X)

		tag = self.tags[prediction[0]]

		answer = "Sorry I did't get that."
		for intent in self.intents["intents"]:
			if tag == intent["tag"]:
				answer =  f"Chatbot: {random.choice(intent['responses'])}"
		return answer

chat = Chatbot()
chat.setup()
print(chat.predict("Hi"))