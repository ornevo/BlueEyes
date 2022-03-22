class Notification:
    def __init__(self, id_, severity, words, freq, time, date, audio, text):
        self._id = id_
        self._severity = severity
        self._words = words
        self._freq = freq
        self._time = time
        self._date = date
        self._audio = audio
        self._text = text
