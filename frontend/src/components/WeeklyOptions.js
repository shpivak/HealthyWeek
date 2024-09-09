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

  const getMealEmoji = (category,name="") =>{
    // if (name.includes("rice"))
    //   return "🍚"
    // if (name.toLowerCase().includes("wine"))
    //   return "🍷"
    // if (name.toLowerCase().includes("beer"))
    //   return "🍺"
    // if (name.toLowerCase().includes("coffee"))
    //   return "☕"
    //TODO: add more

    switch (category){
      case "Drink":
        return "🥤"
      case "Snack":
        return "🍫"
      case "Breakfast":
        return "🍳"
      case "Lunch":
        return "🍲"
      case "Dinner":
      return "🍽️"
      default:
        return ""
    }
  }

  return (
    <div className="weekly-options">
      <h2>Weekly Options</h2>
      <div className="dropdown-container">
        Add a 
        <select
          value={selectedMeal}
          onChange={(e) => setSelectedMeal(e.target.value)}
          className="meal-dropdown orange-dropdown"
        >
          {mealsOfDay.map((meal) => (
            <option key={meal} value={meal}>{meal}</option>
          ))}
        </select>
        On 
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="day-dropdown orange-dropdown"
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
      <ul>
        {options?.map((option) => (
          <li key={option.id} class="option-item">
            <button 
              className="add-meal-btn plus-btn"
              onClick={() => handleAddToUserPlan(option)}>
              +
            </button>
            <span>{getMealEmoji(option.category,option.name)} {option.name} - {option.calories} calories</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyOptions;