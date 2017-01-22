import json
import pickle
from flask_socketio import SocketIO, emit, send
import eventlet
from flask import Flask, render_template, request
from helpers import form_generation as fg
from match_algo import run_match

application = Flask(__name__)
application.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(application, logger=True, ping_timeout=600, engineio_logger=True)
socketio.pingTimeOut = 120000

@socketio.on('connect')
def connect_message():
    print "Connected"


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

@socketio.on('get rol schema', namespace='/test')
def get_rol_schema(message):
    #r = request.get_json()
    #field = json.loads(request.data)['specialty']
    field = message['data']['specialty']
    #print field
    #print json.dumps(fg.generate_rol_form(field))
    emit('rol_schema', {'data': (fg.generate_rol_form(field))})


@socketio.on('my event', namespace='/test')
def test_message(message):
    print message
    emit('my_response', {'data': message['data']})


@socketio.on('test_stream', namespace='/test')
def test_stream():
    print "Initiating Stream"
    for i in range(5):
        emit('stream', i)


@socketio.on('get_match_results', namespace='/test')
def get_match_results(message):
    print("getting results")
    data = message['data']
    print (data)
    rank_order_list = data['rol']
    estimated_program_rankings = data['program_rankings']
    user_info = data['basic_info']
    match_gen = run_match.run_match(user_info, rank_order_list, estimated_program_rankings)
    simulation_results = []
    counter = 0
    for result in match_gen:
        simulation_results.append(result)
        counter = counter + 1
        if counter % 2 == 0:
            emit('counter', {'data': float(counter)})
            eventlet.sleep(0.1)
    unique_results = list(set(simulation_results))
    result_count = {program: 0 for program in unique_results}
    for program in simulation_results:
        result_count.update({program:result_count[program] + 1})


    #request
    match_text = ""
    #matched_program_list = [program for program in a.keys() if data['basic_info']['alias'] in a[program]]
    #if matched_program_list:
    #    match = "Congrats %s! You matched at %s" % (user_info['alias'], matched_program_list[0])
    #else:
    #    match = "Aw shucks! You did not match to a program"
    match_result = [{'program': k, 'chances': float(v) / sum(result_count.values()) * 100} for
                    k, v in result_count.iteritems()]
    print "emitting", {'data': match_result}
    emit('match_result', {'data': match_result})



@application.route('/')
def hello_world():
    return render_template('index.html', user='sss')

@application.route('/get_value')
def get_value():
    return "myAnkit"

@application.route('/print_this')
def print_this():
    r = request.get_json()
    print json.loads(request.data)

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
    print json.dumps(schema)
    return json.dumps(schema)

if __name__ == '__main__':
    socketio.run(application)

