from flask import Flask,request,json
import time
app = Flask(__name__)

@app.route("/get",methods=["POST"])
def get_current_time():
    request_data = json.loads(request.data)
    #print(request_data)
    msg=request_data['msg']
    #print(msg)
    return {"msg":"Hello User"}

if  __name__=="__main__":
    app.run(debug=True,port="6000")