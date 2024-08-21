import json

class MenuDAO:
    def __init__(self):
        self.menu_data = self.load_menu_data()

    def load_menu_data(self):
        with open('data/menu.json', 'r') as file:
            return json.load(file)

    def get_menu(self):
        return self.menu_data

