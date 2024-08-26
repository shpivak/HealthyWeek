from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from dao.menu_dao import MenuDAO
from dao.user_dao import UserDAO
from bl.menu_service import MenuService
from bl.user_service import UserService
import os

app = Flask(__name__, static_folder='healthyweek-frontend/build/static', template_folder='healthyweek-frontend/build')
CORS(app)

# Initialize DAOs and Services
menu_dao = MenuDAO()
user_dao = UserDAO()
menu_service = MenuService(menu_dao)
user_service = UserService(user_dao)

@app.route('/api/menu', methods=['GET'])
def get_menu():
    return jsonify(menu_service.get_menu())

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(user_service.get_users())

@app.route('/api/users/<int:user_id>/plan', methods=['GET'])
def get_user_plan(user_id):
    return jsonify(user_service.get_user_plan(user_id))

@app.route('/api/users/<int:user_id>/possibilities', methods=['GET'])
def get_user_possibilities(user_id):
    return jsonify(user_service.get_user_possibilities(user_id))

@app.route('/api/users/<int:user_id>/plan', methods=['POST'])
def add_meal_to_user_plan(user_id):
    data = request.get_json()
    user_service.add_meal_to_user_plan(user_id, data)
    return jsonify({'message': 'Meal added to user plan successfully'}), 200

@app.route('/api/users/<int:user_id>/plan', methods=['POST'])
def update_user_plan(user_id):
    data = request.get_json()
    user_service.update_user_plan(user_id, data)
    return jsonify({'message': 'User plan updated successfully'}), 200

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path != "" and os.path.exists(app.root_path + '/healthyweek-frontend/build/' + path):
            return send_from_directory('healthyweek-frontend/build/', path)
    else:
        return send_from_directory('healthyweek-frontend/build', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='127.0.0.1', port=5000, debug=True)  # Default localhost