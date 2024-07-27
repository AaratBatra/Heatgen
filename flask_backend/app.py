from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from datetime import datetime, timedelta, timezone

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5000")

# Global values
values = []
values_li = []
x_values = []
x_values_li = []
y_values = []
y_values_li = []
total_with_time = {}
TolVal_for_each_arr = 0
indexes_at_x = []
values_around_max = []
total_int_in_hotzone = 0
time_stamp = datetime.now(timezone.utc)
add_time = timedelta(seconds=10)
time = time_stamp
total_interaction = 0

@app.route('/')
def index():
    return "<h1>Working</h1>"

@app.route('/heatgen', methods=['POST'])
def postmethod():
    global TolVal_for_each_arr, total_with_time, values_li
    global x_values_li, y_values_li, x_values, y_values
    global time, indexes_at_x, values_around_max, total_int_in_hotzone

    data = request.json
    if not data:
        return "No data received", 400
    
    time += add_time
    for item in data:
        values.append(item["value"])
        if item["value"] > 1:
            TolVal_for_each_arr += item["value"]
        x_values.append(item["x"])
        y_values.append(item["y"])
        total_with_time[f"{time.strftime('%H:%M:%S')}"] = TolVal_for_each_arr

    values_li.append(values[:])
    x_values_li.append(x_values[:])
    y_values_li.append(y_values[:])

    max_val = max(values_li[-1])
    index = values_li[-1].index(max_val)
    x_val_max = x_values_li[-1][index]

    indexes_at_x = [i for i in range(x_val_max - 20, x_val_max + 20) if i in x_values_li[0]]
    values_around_max = [values_li[0][i] for i in indexes_at_x if values_li[0][i] > 0]

    total_int_in_hotzone = len(values_around_max)
    return "Data received and processed."
