import boto3
import logging

from boto3.dynamodb.conditions import Key
from src.exceptions.exceptions import DatabaseError

TABLE_NAME = "alerts"

dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
table = dynamodb.Table(TABLE_NAME)


def save_alert(alert):
    print(f"Saving alerts - movie_id {alert.movie_id}")
    try:
        response = table.put_item(
            Item=alert.dict()
        )
        logging.info(f'Database response: {response}')
        return response['ResponseMetadata']['HTTPStatusCode']
    except Exception as e:
        logging.error(e)
        raise DatabaseError


def retrieve_alert_by_movie_id(movie_id):
    print(f"Retrieving alert - movie_id {movie_id}")
    try:
        response = table.get_item(
            Key={
                'movie_id': movie_id
            }
        )
        logging.info(f'Database response: {response}')
        return response['Item']
    except Exception as e:
        logging.error(e)
        raise DatabaseError


def retrieve_alert_by_date(alert_date):
    print(f"Retrieving alerts - date {alert_date}")
    try:
        response = table.query(
            IndexName='notification_date-index',
            KeyConditionExpression=Key('notification_date').eq(alert_date)
        )
        logging.info(f'Database response: {response}')
        return response['Items']
    except Exception as e:
        logging.error(e)
        raise DatabaseError


def delete_alert(movie_id):
    print(f"Deleting alert - id {movie_id}")
    try:
        response = table.delete_item(
            Key={
                'movie_id': movie_id
            }
        )
        logging.info(f'Database response: {response}')
        return True
    except Exception as e:
        logging.error(e)
        raise DatabaseError

