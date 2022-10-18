class UnableToSaveAlertError(Exception):
    message = "Error while saving alert in database."


class UnableToRetrieveAlertError(Exception):
    message = "Error while retrieving alert in database."


class UnableToDeleteAlertError(Exception):
    message = "Error while deleting alert in database."


class DatabaseError(Exception):
    pass
