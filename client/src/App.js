import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8089/api/v1/user/signup', { username, password });
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
    }
  };

  

  return (
    <div>
      <h1>React MongoDB App</h1>

      <div>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default App;
