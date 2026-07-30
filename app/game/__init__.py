from app.game.player_entity import Player


class GameManager:

    def __init__(self):
        self.players = {}

    def create_player(self, player_name: str, level: int) -> Player:

        player = Player(
            player_name=player_name,
            level=level
        )

        self.players[player_name] = player

        return player

    def get_player(self, player_name: str) -> Player:
        return self.players[player_name]