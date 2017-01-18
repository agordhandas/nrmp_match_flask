import json
import pickle

from flask import Flask, render_template, request
from helpers import form_generation as fg
from match_algo import run_match

application = Flask(__name__)


@application.route('/')
def hello_world():
    return render_template('index.html', user='sss')

@application.route('/get_value')
def get_value():
    return "myAnkit"

@application.route('/get_basic_info_schema')
def get_basic_info_schema():
    return json.dumps(fg.generate_specialty_form())

@application.route('/post_basic_info', methods=['POST'])
def post_basic_info():
    r = request.get_json()
    basic_info = json.loads(request.data)
    #pickle.dump (basic_info, open('match_data/basic_info.p', 'wb'))
    return "Success!"


@application.route('/post_rol', methods=['POST'])
def post_rol():
    rol = request.get_json()
    #pickle.dump(eval(request.data), open('match_data/rank_order_list.p', 'wb'))
    return str(rol)

@application.route('/post_program_rankings', methods=['POST'])
def post_program_rankings():
    r = request.get_json()
    program_rankings = json.loads(request.data)
    #pickle.dump (program_rankings, open('match_data/program_rankings.p', 'wb'))
    return "Success!"

@application.route('/get_program_schema', methods=['POST'])
def get_program_schema():
    r = request.get_json()
    programs = json.loads(request.data)
    #print (programs)
    schema = fg.generate_program_form(programs)
    return json.dumps(schema)


@application.route('/get_rol_schema', methods=['POST'])
def get_rol_schema():
    r = request.get_json()
    field = json.loads(request.data)['specialty']
    #print field
    return json.dumps(fg.generate_rol_form(field))

@application.route('/get_match_results', methods=['POST'])
def get_match_results():
    r = request.get_json()
    data = json.loads(request.data)
    print (data)
    rank_order_list = data['rol']
    estimated_program_rankings = data['program_rankings']
    user_info = data['basic_info']
    #yield 0
    a = run_match.run_match(user_info, rank_order_list, estimated_program_rankings)
    #request
    match_text = ""
    #matched_program_list = [program for program in a.keys() if data['basic_info']['alias'] in a[program]]
    #if matched_program_list:
    #    match = "Congrats %s! You matched at %s" % (user_info['alias'], matched_program_list[0])
    #else:
    #    match = "Aw shucks! You did not match to a program"
    return json.dumps([{'program': k, 'chances': float(v) / sum(a.values()) * 100} for k, v in a.iteritems()])

if __name__ == '__main__':
    application.run(debug=True)

