from flask import Flask, request, json, make_response
import time
import os
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from middleware.auth import authorize
from src.database import Database
from src.register import Register
from chatbot import Chatbot
from src.appointment import Appointment
from src.booker import Booker
from src.customer import Customer

app = Flask(__name__)
chatbot = Chatbot(languages=('en', 'ar'), train=False)
chatbot.setup()
load_dotenv(".env")


@app.route("/api/get", methods=["POST"])
def get_current_time():
    request_data = json.loads(request.data)
    print(request_data)
    msg = request_data['msg']
    language = request_data['language']
    state = request_data['state']
    answer = chatbot.predict(msg, state, language)

    if not authorize(request) and (answer['tag'] == 'appoitment' or state == "appoitment"):
        if language == 'en':
            return {"msg": "Please Login <a href='/login'>Login </a>", "status": False}
        else:
            return {"msg": "الرجاء تسجيل الدخول <a href='/login'>تسجيل الدخول</a>", "status": False}

    if answer['tag'] == 'appoitment' and state == 'None':
        book = Booker(os.getenv('DATABASE'))
        if language == 'en':
            answer["answer"] = "Here is the available Dates"
        else:
            answer["answer"] = "هذه هي المواعيد المتاحة"

        answer["tag"] = 'appoitments'
        apps = []
        for i in book.get_appointments():
            apps.append(i.toDict())
        answer["appointments"] = apps

    if state == "appo":
        appo = Appointment(8, msg, "11:00", 1, 2, 0)
        booker = Booker(os.getenv('DATABASE'))
        result = booker.book(appo)
        if result['status']:
            answer['appoitment'] = appo.toDict()
            answer["tag"] = 'appo'
            answer['answer'] = result['msg']
        else:
            if language == 'en':
                answer['answer'] = 'Unable to book an appointement try again.'
            else:
                answer['answer'] = 'لم نتمكن من حجز موعد حاول مجددا.'
    return {"msg": answer["answer"], "data": answer}


@app.route("/api/register", methods=["POST"])
def register():
    request_data = json.loads(request.data)
    register = Register(Database.instance(os.getenv('DATABASE')))
    customer = register.get_customer(request_data['email'])
    if customer:
        return json.jsonify({
            'status': False,
            'msg': 'User allready exist'
        })
    password = generate_password_hash(request_data['password'])
    customer = Customer(
        1, request_data['name'], request_data['email'], password)
    register.save_customer(customer)
    customer.password = password
    return customer.toDict()


@app.route('/api/login', methods=["POST"])
def login():
    request_data = json.loads(request.data)
    register = Register(Database.instance(os.getenv('DATABASE')))
    customer = register.get_customer(request_data['email'])
    if not customer:
        return json.jsonify({
            'status': False,
            'msg': 'user does not exist'
        })
    status = check_password_hash(
        customer['password'], request_data['password'])
    if not status:
        return json.jsonify({
            'status': False,
            'msg': 'Email or Password is wrong'
        })
    res = make_response()
    res = json.jsonify(customer)
    if status:
        token = jwt.encode(
            {'name': customer['name'], 'email': customer['email']}, os.getenv('SECRET_KEY'))
        res.set_cookie('x-access-tokens', token)
    return res


@app.route('/api/logout', methods=["DELETE"])
def logout():
    res = make_response()

    res.set_cookie('x-access-tokens', '')

    return res


@app.route('/api/get_info', methods=["GET"])
def get_info():
    token = request.cookies.get('x-access-tokens')

    if not token:
        return json.jsonify({
            'msg': 'missing token'
        })
    data = jwt.decode(token, os.getenv('SECRET_KEY'), algorithms=['HS256'])
    if data:
        return json.jsonify(data)
    else:
        return json.jsonify({
            'msg': 'invalid token'
        })


if __name__ == "__main__":
    app.run(debug=False, port="6000")
