from cgitb import reset
import json
from dao.menu_dao import MenuDAO

class UserDAO:
    def __init__(self):
        self.user_data = self.load_user_data()
        self.menu_dao = MenuDAO()

    def load_user_data(self):
        with open('data/users.json', 'r') as file:
            return json.load(file)

    def get_users(self):
        return self.user_data

    def get_user_plan(self, user_id):
        for user in self.user_data:
            if user['id'] == user_id:
                return user['weekly_plan']
        return None

    def get_full_user_plan_meals(self, user_id):
        response = {}
        for user in self.user_data:
            if user['id'] == user_id:
                response = user
        response['meals']=self.menu_dao.menu_data
        return response

    def get_user_possibilities(self, user_id):
        for user in self.user_data:
            if user['id'] == user_id:
                menu_items = self.menu_dao.get_menu()
                possibilities = [next((item for item in menu_items if item['id'] == possibility_id), None) for possibility_id in user['possibilities']]
                return possibilities
        return None

    def update_user_plan(self, user_id, plan_data):
        for user in self.user_data:
            if user['id'] == user_id:
                self.user_data['weekly_plan'] = plan_data['weekly_plan']
                self.save_user_data()
                return

    def save_user_data(self):
        with open('data/users.json', 'w') as file:
            json.dump(self.user_data, file, indent=2)