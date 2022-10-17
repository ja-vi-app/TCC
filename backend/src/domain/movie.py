from pydantic import BaseModel


class MovieBase(BaseModel):
    id: str
    movie_url: str


class MovieResponse(BaseModel):
    id: str
    movie_url: str

    def __int__(self):
        MovieBase.__int__(id=self.id, movie_url=self.movie_url)
