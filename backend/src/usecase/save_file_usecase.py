from fastapi import File

from uuid import uuid4

from src.dataprovider import bucket_repository
from src.domain.movie import MovieResponse


def save_file_use_case(file: File):
    try:
        file_id = str(uuid4())
        movie_url = bucket_repository.save_image(file, file_id)

        return MovieResponse(id=file_id, movie_url=movie_url)

    except Exception as e:
        print(e)
        return None


