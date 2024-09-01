import React, { useState, useEffect } from 'react';
import { addMealToUserPlan } from '../utils/api';

const WeeklyOptions = ({ options, userId, onMealAdded }) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mealsOfDay = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Drink'];

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');

  useEffect(() => {
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
    setSelectedDay(currentDay);

    const currentHour = now.getHours();
    let defaultMeal;
    if (currentHour < 11) defaultMeal = 'Breakfast';
    else if (currentHour < 15) defaultMeal = 'Lunch';
    else if (currentHour < 20) defaultMeal = 'Dinner';
    else defaultMeal = 'Snack';
    setSelectedMeal(defaultMeal);
  }, []);

  const handleAddToUserPlan = async (option) => {
    try {
      await addMealToUserPlan(userId, option, selectedDay, selectedMeal);
      onMealAdded();
    } catch (error) {
      console.error('Error adding meal to user plan:', error);
    }
  };

  return (
    <div className="weekly-options">
      <h2>Weekly Options</h2>
      <div className="dropdown-container">
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="day-dropdown"
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <select
          value={selectedMeal}
          onChange={(e) => setSelectedMeal(e.target.value)}
          className="meal-dropdown"
        >
          {mealsOfDay.map((meal) => (
            <option key={meal} value={meal}>{meal}</option>
          ))}
        </select>
      </div>
      <ul>
        {options?.map((option) => (
          <li key={option.id}>
            <span>{option.name} - {option.calories} calories</span>
            <button 
              className="add-meal-btn" 
              onClick={() => handleAddToUserPlan(option)}
            >
              Add to {selectedMeal} on {selectedDay}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyOptions;