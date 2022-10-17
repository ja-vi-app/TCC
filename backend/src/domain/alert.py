from pydantic import BaseModel, Field


class AlertBase(BaseModel):
    movie_id: str
    email: str
    notification_date: str
    title: str
    category: str
    image_url: str


class AlertRequest(AlertBase):
    movie_id: str = Field(alias="movieId")
    image_url: str = Field(alias="imageUrl")

    def __int__(self):
        AlertBase.__init__(movie_id=self.movie_id, email=self.email, notification_date=self.notification_date,
                           title=self.title, category=self.category, image_url=self.image_url)

    class Config:
        schema_extra = {
            "example": {
                "movieId": "27290215-d6ca-4085-b201-43f855566220",
                "email": "some-email@gmail.com",
                "notification_date": "2022-09-30",
                "title": "Star Wars",
                "category": "Sci-Fi",
                "imageUrl": "https://tcc-unip-images.s3.sa-east-1.amazonaws.com/8d118250-08a9-4639-be4b-5a833bfd75f9.png"
            }
        }


class AlertResponse(AlertBase):
    movie_id: str = Field(alias="movieId")
    image_url: str = Field(alias="imageUrl")

    class Config:
        schema_extra = {
            "example": {
                "movieId": "27290215-d6ca-4085-b201-43f855566220",
                "email": "some@email.com",
                "notification_date": "2022-09-30",
                "title": "Star Wars",
                "category": "Sci-Fi",
                "imageUrl": "https://tcc-unip-images.s3.sa-east-1.amazonaws.com/8d118250-08a9-4639-be4b-5a833bfd75f9.png"
            }
        }


class DeleteAlertResponse(BaseModel):
    movie_id: str = Field(alias="movieId")
    message: str
