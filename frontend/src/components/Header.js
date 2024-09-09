import React, { useState } from 'react';

const Header = ({ onUserIdChange }) => {
  const [userId, setUserId] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    onUserIdChange(e.target.value);
  };

  return (
    <header>
      <h1><span class="green-text">Healthy</span><span class="orange-text">Week</span></h1>
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