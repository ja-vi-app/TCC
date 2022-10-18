import unittest

from src.usecase.send_email_usecase import send_alert_emails


class SendEmail(unittest.TestCase):

    def test_send_email(self):
        send_alert_emails("Mulan", "")
        assert None
