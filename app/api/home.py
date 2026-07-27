from fastapi import APIRouter

from app.schemas.player import (
    PlayerCreate,
    PlayerResponse
)

router = APIRouter()


@router.post(
    "/play",
    response_model=PlayerResponse
)
def play_game(player: PlayerCreate):

    return PlayerResponse(
        player_name=player.player_name,
        level=player.level,
        message="Welcome to ArenaForge!"
    )