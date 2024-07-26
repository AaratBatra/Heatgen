import json
import flask
from datetime import datetime, timedelta, timezone

#Global values

#values of all the "values" inside the array data.
values = []
values_li = []

#values of all the "x_values" inside the array data.
x_values = []
x_values_li = []

#values of all the "y_values" inside the array data.
y_values = []
y_values_li = []

#"timestamp:values" only need to return total_with_time gives us timestamps with values.
total_with_time={}
TolVal_for_each_arr = 0

#hottest region variables
indexes_at_x =[]
values_around_max = []
total_int_in_hotzone = 0

#getting utc timestamp.
time_stamp = datetime.now(timezone.utc)
add_time = timedelta(seconds=10)
time = time_stamp

total_interaction = 0


app = Flask(__name__)

@app.route('/')
def index():
    return  "<h1>Working</h1>"


@app.route('/heatgen', methods=['POST']) #getting all the data from the node js
def postmethod():
    return "heelo "
