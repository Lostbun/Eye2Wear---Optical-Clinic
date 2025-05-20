import turtle

pen = turtle.Turtle()

# Defining a method to draw curve
def curve():
    for i in range(200):

        pen.right(1)
        pen.forward(1)

# Defining method to draw a full heart
def heart():

    pen.fillcolor('red')
    pen.begin_fill()
    pen.left(140)
    pen.forward(113)
    curve()
    pen.left(120)
    curve()
    pen.forward(112)
    pen.end_fill()

# Defining method to write text
def txt():
    
    pen.up()
    pen.setpos(-68, 95)
    pen.down()
    pen.color('lightgreen')

    pen.write("GeeksForGeeks", font=("Verdana", 12, "bold"))

heart()
txt()
pen.ht()