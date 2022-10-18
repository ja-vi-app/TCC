from src.domain.alert import AlertRequest, AlertBase, AlertResponse


def alert_request_to_base(request: AlertRequest):
    return AlertBase(movie_id=request.movie_id, email=request.email, notification_date=request.notification_date,
                     title=request.title, category=request.category, image_url=request.image_url)


def alert_base_to_response(base: AlertBase):
    res = AlertResponse(movieId=base.movie_id, email=base.email, notification_date=base.notification_date,
                        title=base.title, category=base.category, imageUrl=base.image_url)
    return res


def db_alert_object_to_base(db_alert: dict):
    return AlertBase.parse_obj(db_alert)
