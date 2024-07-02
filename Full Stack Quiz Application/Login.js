import React, { useState } from 'react';
import './App.css';

export default function Login({ onLogin }) {
  const [message, setMessage] = useState("");
  
  const sendPOSTmethod = (userType) => {
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5007/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: userName, password, op: userType }),
    })
      .then(res => res.json())
      .then(data => {
        window.alert(data.message);
        setMessage(data.message);
        if (data.message !== 'Logged In Successfully') {
          console.log(userName, password, userType);
        } else {
          console.log(userName, password, userType);
          onLogin(userName, userType);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const callSignUp = () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    const postData = {
      username: user,
      password: pass,
      op: 'Stu', // Sign up is only for students
    };

    fetch('http://localhost:5007/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Signup successful:', data);
        window.alert('Signup successful');
      })
      .catch(error => {
        console.error('Error:', error);
        window.alert('Error signing up: ' + error.message);
      });
  };

  return (
    <div className="App" style={{ padding: "100px", textAlign: "center", justifyContent: "center" }}>
      <h1>Welcome to the Quiz</h1>
      <label>
        Username
        <input type="text" id="username" style={{ maxWidth: "150px", margin: "5px" }} />
      </label>
      <br />
      <label>
        Password
        <input type="password" id="password" style={{ maxWidth: "150px", margin: "5px" }} />
      </label>
      <br />
      <br />
      <br />
      <button onClick={() => sendPOSTmethod('Stu')}>Student Login</button>&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => sendPOSTmethod('adm')}>Admin Login</button>&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={callSignUp}>Signup as Student</button>
    </div>
  );
}
