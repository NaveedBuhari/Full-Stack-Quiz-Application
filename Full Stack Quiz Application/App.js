// App.js

import React, { useState } from 'react';
import Quiz from './Quiz';
import Login from './Login';
import Admin from './Admin'; // Import the Admin component
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (userLog, userType) => {
    setIsLoggedIn(true);
    setUsername(userLog);
    console.log(userLog,username);
    setIsAdmin(userType === "adm");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setIsAdmin(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {isAdmin ? (
            <Admin onLogout={handleLogout} /> // Render Admin component if the user is admin
          ) : (
            <Quiz userName={username} onLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  );
}
