import React from 'react';

const UserPlan = ({ weeklyCalories, dailyCalories }) => {
  return (
    <div className="user-plan">
      <h2>Your Plan</h2>
      <div className="calories-info">
        <p>Weekly Calories: {weeklyCalories}</p>
        <p>Daily Calories: {dailyCalories}</p>
      </div>
    </div>
  );
};

export default UserPlan;