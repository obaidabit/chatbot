import numpy
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()


def tokenize(sentence):
    return word_tokenize(sentence)


def lemmatize(word):
    return lemmatizer.lemmatize(word.lower())


def bag_of_words(tokenized_sentence, all_words):
    sentence = [lemmatize(word) for word in tokenized_sentence]
    bag = numpy.zeros(len(all_words), dtype=numpy.float32)
    for i, word in enumerate(all_words):
        if word in sentence:
            bag[i] = 1.0
    return bag
