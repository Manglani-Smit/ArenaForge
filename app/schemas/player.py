from pydantic import BaseModel, Field


class PlayerCreate(BaseModel):
    player_name: str = Field(
        min_length=3,
        max_length=20
    )

    level: int = Field(
        ge=1,
        le=100
    )


class PlayerResponse(BaseModel):
    player_name: str
    level: int
    message: str