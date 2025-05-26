from turtle import * 
from random import randint

# Draw the racing track
speed(0)
penup()
goto(-140, 140)

for step in range(15):
    write(step, align='center')
    right(90)
    for dash in range(8):
        penup()
        forward(10)
        pendown()
        forward(10)
    penup()
    backward(160)
    left(90)
    forward(20)

# Create turtle racers
colors = ['red', 'blue', 'green', 'orange']
y_positions = [100, 70, 40, 10]
players = []

