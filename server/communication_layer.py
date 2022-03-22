import flask
import flask_cors
import flask_socketio
import threading
import hashlib


def connection_id_generator():
    next_connection_id = -1
    while True:
        next_connection_id += 1
        yield next_connection_id


def _get_connection_id(token):
    return token in _connection_ids


def _generate_connection_id():
    return str(next(connection_id_generator)).encode('utf-8')


app = flask.Flask('BLUE-EYES')
serverSocket = flask_socketio.SocketIO(app, cors_allowed_origins="*")
flask_cors.CORS(app)
connection_id_generator = connection_id_generator()
connections = dict()
_connection_ids = []
first_request = 0
threadLock = threading.Lock()


@app.route('/', methods=['GET'])
def _add_connection(token):
    global first_request
    connected = _get_connection_id(token)
    if not connected:
        connection_id = hashlib.sha1(_generate_connection_id()).hexdigest()
        _connection_ids.append(connection_id)
        response = flask.make_response("creating connection id")
        return response, connection_id
    return '', token


@serverSocket.on('join')
def on_join(data):
    flask_socketio.join_room(data)


def send(self, connection_id, message):
    self.socket.emit('notification', f'Notification: {message}', room=connection_id)


# def update_statistics(self, connection_id, stat_string):
#     self.socket.emit('update_statistics', stat_string, room=connection_id)


def main():
    # self.initialize() - init db and all the infrastructure
    serverSocket.run(app, port=5000)


def safe_main():
    try:
        main()
    except:
        logger.logger.error(
            f'Oops... Something went wrong. The following error was encountered: {traceback.format_exc()}')


if __name__ == '__main__':
    safe_main()



