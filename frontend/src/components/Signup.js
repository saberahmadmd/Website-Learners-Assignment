import { useState } from 'react';
import './Signup.css';
import { signup } from '../api/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ email, password });
      alert('Signup successful. Please login.');
      navigate('/login');
    } catch {
      alert('Signup failed.');
    }
  };

  return (
    <div className='container'>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Sign Up</h2>
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signup-button" type="submit">Sign Up</button>
      </form>
    </div>

  );
}

export default Signup;
