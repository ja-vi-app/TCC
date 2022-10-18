import logging

from src.dataprovider import database_repository
from src.domain.alert import AlertBase
from src.helper.alert_mapper import db_alert_object_to_base
from src.exceptions.exceptions import UnableToSaveAlertError, UnableToRetrieveAlertError, DatabaseError


def create_alert_use_case(alert: AlertBase):
    try:
        db_status = database_repository.save_alert(alert)
        if db_status is None or db_status != 200:
            raise UnableToSaveAlertError

        return alert
    except DatabaseError:
        raise UnableToSaveAlertError


def get_alert_by_movie_use_case(movie_id):
    try:
        db_alert = database_repository.retrieve_alert_by_movie_id(movie_id)
        return db_alert_object_to_base(db_alert)
    except DatabaseError:
        raise UnableToRetrieveAlertError


def delete_alert_by_movie_use_case(movie_id):
    try:
        return database_repository.delete_alert(movie_id)
    except DatabaseError:
        raise UnableToRetrieveAlertError
