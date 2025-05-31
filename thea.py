from turtle import * 
from random import randint

# Draw the racing track
speed(0)
penup()
goto(-140, 140)

for step in range(15):
    write(step, align='center')
    right(90)
