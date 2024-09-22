from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/', methods=['POST'])
def hello():
  data = request.get_json()
  # print(type(data))
  print(data['query'])
  return jsonify(message="hello")


if __name__ == '__main__':
  app.run(debug=True)
