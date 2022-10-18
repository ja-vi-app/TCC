from fastapi import APIRouter, Depends, HTTPException, Query,  File, Form, UploadFile

from src.domain.movie import MovieResponse
from src.usecase.save_file_usecase import save_file_use_case

router = APIRouter()


@router.post("/image", response_model=MovieResponse)
async def save_movie(file: UploadFile):
    print("Saving Movie")
    movie = save_file_use_case(file)
    if movie:
        return movie

    return {"id": None, "movie_url": None}
