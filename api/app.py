from flask import Flask, request, json
import time
from chatbot import Chatbot

app = Flask(__name__)
chatbot = Chatbot(languages=('en', 'ar'), train=False)
chatbot.setup()


@app.route("/get", methods=["POST"])
def get_current_time():
    request_data = json.loads(request.data)
    # print(request_data)
    msg = request_data['msg']
    language = request_data['language']
    state = request_data['state']
    answer = chatbot.predict(msg, state, language)
    return {"msg": answer["answer"], "data": answer}


if __name__ == "__main__":
    app.run(debug=False, port="6000")
