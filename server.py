from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/run-script1', methods=['POST'])
def run_script1():
    # Run your Python script 1 here
    result = "Script 1 executed successfully"
    return jsonify(result=result)

@app.route('/run-script2', methods=['POST'])
def run_script2():
    # Run your Python script 2 here
    result = "Script 2 executed successfully"
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)
