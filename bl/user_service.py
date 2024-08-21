class UserService:
    def __init__(self, user_dao):
        self.user_dao = user_dao

    def get_users(self):
        return self.user_dao.get_users()

    def get_user_plan(self, user_id):
        return self.user_dao.get_user_plan(user_id)

    def update_user_plan(self, user_id, plan_data):
        self.user_dao.update_user_plan(user_id, plan_data)