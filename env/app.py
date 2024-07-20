from flask import Flask, request
import json
import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return  "<h1>Working</h1>"
@app.route('/index2')
def index2():
    return "heelo "

@app.route('/index3')
def index3():
    with open("E:\/fossproject\data.json") as file:
        data = json.load(file)
    time_stamp = datetime.datetime.now()
    
    return str(time_stamp)

if __name__ == '__main__':
    app.run(debug=True)


