from app.game.player_entity import Player


class GameManager:

    def create_player(self, player_name: str, level: int) -> Player:

        player = Player(
            player_name=player_name,
            level=level
        )

        return player