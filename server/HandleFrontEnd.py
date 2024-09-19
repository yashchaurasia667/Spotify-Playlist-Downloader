from flask import Flask, request

app = Flask(__name__)


@app.route('/', methods=['POST'])
def handle_post():
  data = request.form
  return 'data received' + str(data)


if __name__ == '__main__':
  app.run(debug=True)
