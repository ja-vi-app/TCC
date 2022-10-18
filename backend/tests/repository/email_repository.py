import unittest
from src.dataprovider.email_repository import send_html_email


class Email(unittest.TestCase):

    def test_send_email(self):
        send_html_email("Mulan", "https://tcc-unip-images.s3.sa-east-1.amazonaws.com/381e1a30-15b1-4760-9a17-c55f014c1981.png")
        assert None


if __name__ == '__main__':
    unittest.main()