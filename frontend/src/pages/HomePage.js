import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import UserPlan from '../components/UserPlan';
import WeeklyOptions from '../components/WeeklyOptions';
import { getUserPlan, getUserPossibilities, addMealToUserPlan } from '../utils/api';
import '../styles/styles.css';

const HomePage = () => {
  const [userId, setUserId] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [weeklyCalories, setWeeklyCalories] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [weeklyOptions, setWeeklyOptions] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = async (id) => {
    try {
      const plan = await getUserPlan(id);
      const possibilities = await getUserPossibilities(id);
      setWeeklyPlan(plan);
      setWeeklyOptions(possibilities);
      calculateCalories(plan);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const calculateCalories = (plan) => {
    let weeklyCalories = 0;
    let dailyCalories = 0;
    plan?.forEach((day) => {
      const dayCalories = day.meals.reduce((total, meal) => total + meal.calories, 0);
      dailyCalories += dayCalories;
      weeklyCalories += dayCalories;
    });
    setWeeklyCalories(weeklyCalories);
    setDailyCalories(dailyCalories);
  };

  const handleAddToUserPlan = async (option) => {
    try {
      await addMealToUserPlan(userId, option);
      fetchUserData(userId);
    } catch (error) {
      console.error('Error adding meal to user plan:', error);
    }
  };

  const handleUserIdChange = (id) => {
    setUserId(id);
  };
  const handleMealAdded = () => {
    fetchUserData(userId);
  };

  return (
    <div className="container">
      <Header onUserIdChange={handleUserIdChange} />
      <UserPlan userData={weeklyPlan} />
      <WeeklyOptions 
        options={weeklyOptions} 
        userId={userId} 
        onMealAdded={handleMealAdded}
      />
    </div>
  );
};

export default HomePage;