from flask import Flask
from flask import render_template
from flask import request, redirect
from flask import Response
from flask import send_from_directory
import os


app = Flask(__name__)

@app.route('/')
def home():

    return render_template(
        'index.html',

    )

@app.route('/Game')
def Game():
    return render_template(
        'Game.html'
    )


@app.route('/ScoreBoard', methods=["GET", "POST"])
def ScoreBoard():

    if request.method == "POST":

        req = request.form
        data = req.to_dict()
        

        return redirect(request.url)


    return render_template(
        'ScoreBoard.html'
        )


if __name__ == "__main__":
    app.run(debug=True)