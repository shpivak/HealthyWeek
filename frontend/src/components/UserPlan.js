import React from 'react';
import WeeklyMealPlanTable from './fullTable';

const UserPlan = ({ userData }) => {
  const calculateTotalCalories = () => {
    return Object.values(userData?.weekly_plan || {}).reduce((total, day) => {
      const dayCalories = [...day.meals, ...day.snacks, ...day.drinks].reduce((dayTotal, mealId) => {
        const meal = userData?.meals.find(m => m.id === mealId);
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
        <span>Weekly Calories: {weeklyCalories} </span>
        <span>Daily Calories (avg): {dailyCalories}</span>
      </div>
      <WeeklyMealPlanTable userData={userData} />
    </div>
  );
};

export default UserPlan;