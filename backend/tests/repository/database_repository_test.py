import unittest

from uuid import uuid4
from src.dataprovider.database_repository import save_movie, get_movie, delete_movie

movie_id = "uuid_123_test"


class Database(unittest.TestCase):
    def test_save_movie(self):
        movie = {
            "id":  movie_id,
            "name":  "Movie master",
            "description": "Some description for tests",
            "synopsis": "Some huge synopsis",
            "cover_id": str(uuid4())
        }
        self.assertEqual(True, save_movie(movie))

    def test_get_movie(self):
        self.assertEqual(True, get_movie(movie_id))


if __name__ == '__main__':
    unittest.main()
    delete_movie(movie_id)

