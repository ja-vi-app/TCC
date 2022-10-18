import unittest

from uuid import uuid4
from src.dataprovider.bucket_repository import save_image


class Bucket(unittest.TestCase):
    def test_upload(self):
        r = save_image('/home/dliberato/Imagens/dummy_image.png', str(uuid4()))
        self.assertEqual(True, r.__contains__("https://"))  # add assertion here
        self.assertEqual(True, r.__contains__("amazonaws.com"))  # add assertion here
        self.assertEqual(True, r.__contains__("png"))  # add assertion here


if __name__ == '__main__':
    unittest.main()
