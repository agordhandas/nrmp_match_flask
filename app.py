from flask import Flask, render_template, request
import form_generation as fg
import json
from flask_sqlalchemy import SQLAlchemy
import pickle
from match_algo import run_match

app = Flask(__name__)


@app.route('/')
def hello_world():
  return render_template('index.html', user='sss')

@app.route('/get_value')
def get_value():
	return "myAnkit"

@app.route('/post_basic_info', methods=['POST'])
def post_basic_info():
	r = request.get_json()
	basic_info = json.loads(request.data)
	pickle.dump (basic_info, open ('match_data/basic_info.p', 'wb'))
	return "Success!"


@app.route('/post_rol', methods=['POST'])
def post_rol():
	rol = request.get_json()
	pickle.dump(eval(request.data), open ('match_data/rank_order_list.p', 'wb'))
	return str(rol)

@app.route('/post_program_rankings', methods=['POST'])
def post_program_rankings():
	r = request.get_json()
	program_rankings = json.loads(request.data)
	pickle.dump (program_rankings, open ('match_data/program_rankings.p', 'wb'))
	return "Success!"

@app.route('/get_program_schema', methods=['POST'])
def get_program_schema():
	r = request.get_json()
	programs = json.loads(request.data)['rol']
	#print (programs)
	return json.dumps(fg.generate_program_form(programs))


@app.route('/get_rol_schema')
def get_rol_schema():
	return json.dumps(fg.generate_rol_form())

@app.route ('/get_match_results')
def get_match_results():
	basic_info = pickle.load (open ('match_data/basic_info.p', 'rb'))
	alias = basic_info['alias']
	a = run_match.run_match()
	matched_program = [program for program in a.keys() if alias in a[program]][0]
	return matched_program

if __name__ == '__main__':
  app.run(debug=True)

