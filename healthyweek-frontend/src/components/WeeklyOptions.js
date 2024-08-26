import React from 'react';
import { addMealToUserPlan } from '../utils/api';

const WeeklyOptions = ({ options, userId, onMealAdded }) => {
  const handleAddToUserPlan = async (option) => {
    try {
      debugger;
      await addMealToUserPlan(userId, option);
      onMealAdded();
    } catch (error) {
      console.error('Error adding meal to user plan:', error);
    }
  };

  return (
    <div className="weekly-options">
      <h2>Weekly Options</h2>
      <ul>
        {options?.map((option) => (
          <li key={option.id}>
            <span>{option.name} - {option.calories} calories</span>
            <button 
              className="add-meal-btn" 
              onClick={() => handleAddToUserPlan(option)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyOptions;