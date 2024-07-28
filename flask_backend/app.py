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

@app.route('/heatgen', methods=['GET'])
def getmethod():
    global total_interaction, total_with_time, total_int_in_hotzone

    total_interaction = sum(item > 1 for elements in values_li for item in elements)

    return jsonify({
        "total_interaction": total_interaction,
        "total_with_time": total_with_time,
        "total_int_in_hotzone": total_int_in_hotzone
    })

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('response', {'data': 'Connected to Flask server'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('heat')

@socketio.on('heat')
def handle_heat(data):
    if not data:
        return
    
    global TolVal_for_each_arr, total_with_time, values_li
    global x_values_li, y_values_li, time, total_int_in_hotzone, total_interaction

    time += add_time

    values = [item["value"] for item in data]
    x_values = [item["x"] for item in data]
    y_values = [item["y"] for item in data]

    TolVal_for_each_arr += sum(value for value in values if value > 1)
    total_with_time[f"{time.strftime('%H:%M:%S')}"] = TolVal_for_each_arr

    # Store the values before resetting
    previous_values_li = values_li[:]
    previous_x_values_li = x_values_li[:]
    previous_y_values_li = y_values_li[:]
    previous_total_interaction = dict(list(total_with_time.items())[-14:])
    previous_total_int_in_hotzone = total_int_in_hotzone

    values_li.append(values)
    x_values_li.append(x_values)
    y_values_li.append(y_values)

    if not values_li or not x_values_li:
        emit('analytics', {
            'total_interaction': previous_total_interaction,
            'total_with_time': total_with_time,
            'total_int_in_hotzone': previous_total_int_in_hotzone
        })
        reset_global_variables()
        return

    max_val = max(values)
    index = values.index(max_val)
    x_val_max = x_values[index]

    indexes_at_x = [i for i, x in enumerate(x_values) if x_val_max - 20 <= x <= x_val_max + 20]
    values_around_max = [values[i] for i in indexes_at_x if values[i] > 0]

    total_int_in_hotzone = len(values_around_max)
    total_interaction = sum(value > 1 for sublist in values_li for value in sublist)

    emit('analytics', {
        'total_interaction': total_interaction,
        'total_with_time': total_with_time,
        'total_int_in_hotzone': total_int_in_hotzone
    })
    
    # Reset global variables after sending the response
    reset_global_variables()

# def reset_global_variables():
#     global total_interaction, total_int_in_hotzone, values_around_max
#     total_interaction = 0
#     total_int_in_hotzone = 0
#     values_around_max = []
#     #print("values resetted")
def reset_global_variables():
    global total_interaction, total_int_in_hotzone, values_around_max
    global x_values_li, y_values_li, x_values, y_values
    x_values=[]
    y_values=[]
    x_values_li=[]
    y_values_li = []
    total_interaction = 0
    total_int_in_hotzone = 0
    values_around_max = []

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)
