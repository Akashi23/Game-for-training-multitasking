"""
Routes and views for the flask application.
"""

from flask import render_template
from runserver import app
from flask import request, redirect
from flask import Response
from flask import send_from_directory
import os

@app.route('/')
def home():
    return render_template(
        'index.html',
         title='Home Page',
        )
