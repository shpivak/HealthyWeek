class MenuService:
    def __init__(self, menu_dao):
        self.menu_dao = menu_dao

    def get_menu(self):
        return self.menu_dao.get_menu()