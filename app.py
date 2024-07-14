from flask import Flask, request




app = Flask(__name__)

@app.route('/')
def index():
    return  "<h1>Working</h1>"
@app.route('/index2')
def index2():
    return "heelo "

if __name__ == '__main__':
    app.run(debug=True)
