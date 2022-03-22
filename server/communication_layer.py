import flask
import random
import flask_cors
import threading
import hashlib
import string
import os
import json
from threading import Timer


currid = 0
def next_id():
    global currid
    currid += 1
    return str(currid)

words = [{
            'id': next_id(),
            'word': line.split(":")[1],
            'severity': int(line.split(":")[0])
        } for line in open("../words.txt").read().split("\n")
]
notifications = json.load(open("../notifications.json"))
# [
#         {
#           'severity': 2,
#           'words': ["2"],
#           'freq': 52.5,
#           'time': "15:32",
#           'date': '28.1.2020',
#           'location': "חטמ\"ר שומרון",
#           'id': "11",
#           'audio': 'http://www.hochmuth.com/mp3/Tchaikovsky_Nocturne__orch.mp3',
#           'text': 'placeholder'
#         },
#         {
#           'severity': 1,
#           'words': ["35", "4"],
#           'freq': 52.5,
#           'time': "13:51",
#           'date': '1.2.2020',
#           'location': "מרחב דרום",
#           'id': "22",
#           'audio': 'http://www.hochmuth.com/mp3/Tchaikovsky_Nocturne__orch.mp3',
#           'text': 'placeholder'
#         }
#       ]


def connection_id_generator():
    next_connection_id = -1
    while True:
        next_connection_id += 1
        yield next_connection_id


def _get_connection_id(token):
    return token in _connection_ids


def _generate_word_id():
    return str(next(connection_id_generator)).encode('utf-8')


app = flask.Flask('BLUE-EYES', static_folder='static', static_url_path='')
flask_cors.CORS(app)
connection_id_generator = connection_id_generator()
connections = dict()
_connection_ids = []
first_request = 0
threadLock = threading.Lock()


# @app.route('/', methods=['GET'])
# def _add_connection():
#     return flask.make_response("connected")

@app.route('/new-word', methods=['POST'])
def _add_word():
    global words
    response = {
        'id': _generate_word_id(),
        'word': '',
        'severity': 3
    }
    words = [response] + words
    return flask.jsonify(words)


@app.route('/update-words', methods=['POST'])
def _edit_word():
    global words
    words = flask.request.get_json()
    # TODO: delete this test
    # Timer(4.0, lambda _: , (12,)).start()
    return flask.jsonify(words)


@app.route('/dismiss-notification', methods=['POST'])
def _dismiss_notification():
    global notifications
    id = flask.request.get_json()['id']
    notifications = [n for n in notifications if n['id'] != id]
    return flask.jsonify(notifications)


@app.route('/state', methods=['GET'])
def _get_state():
    response = {'words': words, 'notifications': notifications}
    return flask.jsonify(response)

@app.route('/', defaults=dict(filename=None))
@app.route('/<path:filename>', methods=['GET', 'POST'])
def index(filename):
    filename = filename if filename else 'index.html'
    full_path = os.path.join("./static", filename)
    print("path", full_path)
    if os.path.isfile(full_path):
        return open(full_path).read()
    else:
        return 'not found'


@app.route('/show-notif', methods=['GET'])
def handle():
    global notifications
    notifications.append(    {
        "id": "c",
        "severity":1,
        "words": ["39", "35", "43"],
        "audio": "/rec.wav",
        "date": "8.4.2021",
        "freq": 74.300,
        "time": "18:47:37",
        "location": "אוגדת עזה"	,
        "text": "דובר א' – מקווה שאתה מוכן לשבוע הבא.\n    דובר ב' – מה קורה שבוע הבא, תזכיר לי?\n    דובר א' – מתחילים את ה מבצע הונאה בגדר.\n    דובר ב' – וואלה נכון, מתחילים בצפון עזה ?\n    דובר א' – חיובי",
    })

def main():
    # self.initialize() - init db and all the infrastructure
    app.run(host="0.0.0.0", debug=True, port=5000)


def safe_main():
    try:
        main()
    except Exception as e:
        print(e)


if __name__ == '__main__':
    safe_main()