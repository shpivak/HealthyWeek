import React from 'react';

const WeeklyMealPlanTable = ({ userData }) => {
  const { weekly_plan, meals } = userData;

  const getMealInfo = (mealId) => {
    const meal = meals.find(m => m.id === mealId);
    return meal ? `${meal.name} (${meal.calories} cal)` : 'No meal';
  };

  const calculateDailyCalories = (day) => {
    return [...day.meals, ...day.snacks, ...day.drinks].reduce((sum, mealId) => {
      const meal = meals.find(m => m.id === mealId);
      return sum + (meal ? meal.calories : 0);
    }, 0);
  };

  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Meals</th>
            <th>Snacks</th>
            <th>Drinks</th>
            <th>Total Calories</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(weekly_plan || {}).map(([day, daysMeals], index) => (
          <tr key={index}>
            <td>{day}</td> {/* The key (day of the week) */}
            <td>
              <ul>
                {daysMeals.meals?.map((mealId, mealIndex) => (
                  <li key={mealIndex}>{getMealInfo(mealId)}</li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {daysMeals.snacks?.map((snackId, snackIndex) => (
                  <li key={snackIndex}>{getMealInfo(snackId)}</li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {daysMeals.drinks?.map((drinkId, drinkIndex) => (
                  <li key={drinkIndex}>{getMealInfo(drinkId)}</li>
                ))}
              </ul>
            </td>
            <td>{calculateDailyCalories(daysMeals)}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

const UserPlan = ({ userData }) => {
  const calculateTotalCalories = () => {
    return Object.values(userData?.weekly_plan || {}).reduce((total, day) => {
      const dayCalories = [...day.meals, ...day.snacks, ...day.drinks].reduce((dayTotal, mealId) => {
        const meal = userData.meals.find(m => m.id === mealId);
        return dayTotal + (meal ? meal.calories : 0);
      }, 0);
      return total + dayCalories;
    }, 0);
  };

  const weeklyCalories = calculateTotalCalories();
  const dailyCalories = Math.round(weeklyCalories / 7);

  return (
    <div className="user-plan p-4">
      <h2>Your Plan</h2>
      <div className="calories-info mb-4">
        <p>Weekly Calories: {weeklyCalories}</p>
        <p>Daily Calories (avg): {dailyCalories}</p>
      </div>
      <WeeklyMealPlanTable userData={userData} />
    </div>
  );
};

export default UserPlan;