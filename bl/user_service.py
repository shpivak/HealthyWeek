class UserService:
    def __init__(self, user_dao,menu_dao):
        self.user_dao = user_dao
        self.menu_dao = menu_dao

    def get_users(self):
        return self.user_dao.get_users()

    def get_user_plan(self, user_id):
        return self.user_dao.get_full_user_plan_meals(user_id)

    def get_user_possibilities(self, user_id):
        return self.user_dao.get_user_possibilities(user_id)

    # def update_user_plan(self, user_id, plan_data):
    #     self.user_dao.update_user_plan(user_id, plan_data)

    def add_meal_to_user_plan(self, user_id, meal_data):
        plan = self.get_user_plan(user_id)
        print (meal_data["meal_id"])
        print(plan)
        plan[0]["meals"].append(meal_data["meal_id"])
        print(plan)
        self.user_dao.update_user_plan(user_id, plan)
