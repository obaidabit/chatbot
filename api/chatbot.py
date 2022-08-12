import random
from nltk_utils import tokenize, bag_of_words
from model import Model


class Chatbot:
    def __init__(self, train: bool = False, languages=("en",)):
        self.models = []
        self.train = train
        self.languages: tuple = languages

    def setup(self):
        for lan in self.languages:
            trainModel = Model(f"intents_{lan}.json", language=lan)
            if self.train:
                model = trainModel.train(saveToFile=True)
            else:
                model = trainModel.train(
                    f"model_{lan}.joblib", saveToFile=True)
            self.models.append({
                "language": lan,
                "model": model,
                "all_words": trainModel.all_words,
                "tags": trainModel.tags,
                "intents": trainModel.intents
            })

    def predict(self, sentence: str, state: str, language: str = "en",) -> any:

        for m in self.models:
            if m['language'] == language:
                all_words = m['all_words']
                tags = m['tags']
                intents = m['intents']
                model = m['model']

        tokens = tokenize(sentence)
        X = bag_of_words(tokens, all_words, language)
        X = X.reshape(1, X.shape[0])
        prediction = model.predict(X)

        tag = tags[prediction[0]]

        if language == 'en':
            answer = {"answer": "Sorry I did't get that."}
        else:
            answer = {"answer": "أنا أسف لم افهم ذلك."}
        answer["tag"] = tag

        for intent in intents["intents"]:
            if tag == intent["tag"] and len(intent['responses']) > 0 and state == "None":
                answer["answer"] = random.choice(intent['responses'])
                answer["tag"] = tag

        print("THE tag is  ------------------------------- " + tag)
        print("DEBUG -------------------------------------- ")
        print(answer)
        return answer
