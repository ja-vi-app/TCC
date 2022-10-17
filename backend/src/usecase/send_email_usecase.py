from datetime import date
from src.dataprovider.database_repository import retrieve_alert_by_date, delete_alert
from src.dataprovider.email_repository import send_html_email


def send_alert_emails() -> None:
    today = date.today().strftime("%Y-%m-%d")
    alerts = retrieve_alert_by_date(today)

    for alert in alerts:
        # response = send_html_email(alert['title'], alert['email'], alert['image_url'])
        result = delete_alert(alert['id'])

    print(alerts)


