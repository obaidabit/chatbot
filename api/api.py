from flask import Flask, request, json
import time
from chatbot import Chatbot

app = Flask(__name__)
chatbot = Chatbot()
chatbot.setup()

@app.route("/get", methods=["POST"])
def get_current_time():
    request_data = json.loads(request.data)
    # print(request_data)
    msg = request_data['msg']
    answer = chatbot.predict(msg)
    return {"msg": answer}


if __name__ == "__main__":
    app.run(debug=True, port="6000")
