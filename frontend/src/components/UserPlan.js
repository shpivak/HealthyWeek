import React from 'react';

const WeeklyMealPlanTable = ({ userData }) => {
  debugger;
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
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Day</th>
            <th className="py-2 px-4 border-b">Meals</th>
            <th className="py-2 px-4 border-b">Snacks</th>
            <th className="py-2 px-4 border-b">Drinks</th>
            <th className="py-2 px-4 border-b">Total Calories</th>
          </tr>
        </thead>
        <tbody>
          {weekly_plan?.map((day, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 border-b">{day.day}</td>
              <td className="py-2 px-4 border-b">
                <ul>
                  {day.meals?.map((mealId, mealIndex) => (
                    <li key={mealIndex}>{getMealInfo(mealId)}</li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 border-b">
                <ul>
                  {day.snacks?.map((snackId, snackIndex) => (
                    <li key={snackIndex}>{getMealInfo(snackId)}</li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 border-b">
                <ul>
                  {day.drinks?.map((drinkId, drinkIndex) => (
                    <li key={drinkIndex}>{getMealInfo(drinkId)}</li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 border-b">{calculateDailyCalories(day)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserPlan = ({ userData }) => {
  const calculateTotalCalories = () => {
    return userData?.weekly_plan?.reduce((total, day) => {
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
      <h2 className="text-2xl font-bold mb-4">Your Plan</h2>
      <div className="calories-info mb-4">
        <p className="text-lg">Weekly Calories: {weeklyCalories}</p>
        <p className="text-lg">Daily Calories (avg): {dailyCalories}</p>
      </div>
      <WeeklyMealPlanTable userData={userData} />
    </div>
  );
};

export default UserPlan;