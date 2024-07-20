import datetime
import json

values = []
values_li = []

x_values = []
x_values_li = []

y_values = []
y_values_li = []

## data

#1. clicks
valid_click = 0

#2. number of clicks per area
close_x_vals = []   #list of values which are close x values
close_y_vals = []   #list of values which are close y values


with open("E:\/fossproject\data.json") as file:
        data = json.load(file)

for i in range(len(data)):
    values.append(data[i]["value"])
    x_values.append(data[i]["x"])
    y_values.append(data[i]["y"])

# appending all the values of a user
values_li.append(values)
x_values_li.append(x_values)
y_values_li.append(y_values)

# to find total number of clicks
for i in range(len(values_li)):
      for elements in values_li[i]:
            if elements>100:
                  valid_click+=1

print(valid_click)
# need to make a counter so that we know how many dataset of 10sec has came inside the server
avg_click_per_10sec= valid_click/10
print(avg_click_per_10sec)



#print(values)
time_stamp = datetime.datetime.now()

