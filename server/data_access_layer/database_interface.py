import abc

class DatabaseInterface(abc.ABC):
    @abc.abstractmethod
    def init_db(self):
        pass

    @abc.abstractmethod
    def read_from_db(self):
        pass

    @abc.abstractmethod
    def write_to_db(self):
        pass

    @abc.abstractmethod
    def release_connection(self):
        pass