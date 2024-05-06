from flask import Flask, render_template
import subprocess

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tryRpi")
def tryRpi():
    try:
        subprocess.Popen([f"x-terminal-emulator -e 'python3 Raspberry_PI.py'"], shell=True)
        return render_template("end.html")
    except Exception as e:
        return f'Error: {str(e)}'


if __name__ == '__main__':
    app.run(debug=True, port=8000)