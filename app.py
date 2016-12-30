from flask import Flask, render_template, request
app = Flask(__name__)

user='sss'

@app.route('/')
def hello_world():
  return render_template('index.html', user='sss')

@app.route('/get_value')
def get_value():
	return "myAnkit"

@app.route('/get_rol', methods=['POST'])
def get_rol():
	rol = request.get_json()
	print (request.data)
	return str(rol)

if __name__ == '__main__':
  app.run(debug=True)

