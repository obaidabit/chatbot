import pandas
import joblib
from nltk_utils import tokenize, lemmatize, bag_of_words
from nltk.corpus import stopwords
from sklearn.neural_network import MLPClassifier

# stop_words = set(stopwords.words("english"))
ignore_words = ["?", ".", "!"]
intents = pandas.read_json("intents.json")

all_words = []
tags = []
xy = []

for intent in intents["intents"]:
    tag = intent["tag"]
    tags.append(tag)
    for pattern in intent["patterns"]:
        words = tokenize(pattern)
        all_words.extend(words)
        xy.append((words, tag))

all_words = [lemmatize(word) for word in all_words if word not in ignore_words]
all_words = sorted(set(all_words))
tags = sorted(set(tags))

X_train = []
y_train = []
for (pattern_sentence, tag) in xy:
    # X: bag of words for each pattern_sentence
    bag = bag_of_words(pattern_sentence, all_words)
    X_train.append(bag)
    # y: PyTorch CrossEntropyLoss needs only class labels, not one-hot
    label = tags.index(tag)
    y_train.append(label)

model = MLPClassifier(hidden_layer_sizes=(8,), batch_size=8)
model.fit(X_train, y_train)

joblib.dump(model, "data.joblib")
joblib.dump(all_words, "all_words.joblib")
joblib.dump(tags, "tags.joblib")
