import logging
import boto3

ses = boto3.client("ses", region_name="sa-east-1")


def send_html_email(title, email_address, image_url):
    CHARSET = "UTF-8"
    HTML_EMAIL_CONTENT = f"""
        <html>
            <head></head>
            <h1 style='text-align:center'>Você nos pediu para avisar</h1>
            <p>Este é seu lembrete do file {title}</p>
            <img src="{image_url}">
            </body>
        </html>
    """
    try:

        # response = ses.verify_email_identity(
        #     EmailAddress='dlj.daniel+javi@gmail.com'
        # )

        response = ses.send_email(
            Destination={
                "ToAddresses": [
                    # 'dlj.daniel+javi@gmail.com',
                    f"{email_address}",
                    # "success@simulator.amazonses.com",
                ],
            },
            Message={
                "Body": {
                    "Html": {
                        "Charset": CHARSET,
                        "Data": HTML_EMAIL_CONTENT,
                    }
                },
                "Subject": {
                    "Charset": CHARSET,
                    "Data": "Ja Ví App ",
                },
            },
            Source="dlj.daniel@gmail.com",
        )
        return response
    except Exception as e:
        logging.error(e)
