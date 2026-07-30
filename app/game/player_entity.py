class Player:

    def __init__(self, player_name: str, level: int):

        self.player_name = player_name
        self.level = level

        self.health = 100
        self.score = 0

        self.x = 0
        self.y = 0

        self.speed = 5

    def move_up(self):
        self.y -= self.speed

    def move_down(self):
        self.y += self.speed

    def move_left(self):
        self.x -= self.speed

    def move_right(self):
        self.x += self.speed