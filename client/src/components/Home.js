import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { store } from '../redux/store/store';
import { signinUserAction } from '../redux/slices/userSlice';

const Home = ({}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('daniyal.shah.cs@gmail.com');
  const [password, setPassword] = useState('12345678');

  const handleSubmit = (e) => {
    e.preventDefault();

    store
      .dispatch(
        signinUserAction({
          email,
          password,
        }),
      )
      .then(() => navigate('/chat'));
  };
  return (
    <div>
      <form className="home__container" onSubmit={handleSubmit}>
        <h2 className="home__header">Sign in to Open Chat</h2>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          minLength={6}
          name="email"
          id="email"
          className="username__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          minLength={6}
          name="password"
          id="password"
          className="username__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="home__cta">
          SIGN IN
        </button>

        <div
          style={{
            marginTop: '1rem',
          }}
        >
          <span>Don't have a account?</span>
          <Link
            to="/signup"
            style={{
              margin: '0.2rem',
              textDecoration: 'none',
              color: 'blue',
            }}
          >
            Create new account{' '}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Home;
