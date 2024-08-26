import React, { useState } from 'react';

const Header = ({ onUserIdChange }) => {
  const [userId, setUserId] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    onUserIdChange(e.target.value);
  };

  return (
    <header>
      <h1>HealthyWeek</h1>
      <input
        type="number"
        placeholder="Enter User ID"
        value={userId}
        onChange={handleUserIdChange}
      />
    </header>
  );
};

export default Header;