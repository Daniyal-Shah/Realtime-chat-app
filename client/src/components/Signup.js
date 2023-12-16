import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../api/axios';
import axios from 'axios';
import { axiosInstance } from '../api/api';
import { store } from '../redux/store/store';
import { showLoading } from '../redux/slices/userSlice';

const Signup = ({}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [bio, setBio] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    store.dispatch(showLoading(true));

    try {
      const data = await axiosInstance.post('user', {
        email,
        password,
        name,
        age,
        bio,
      });

      alert('Account Created');
      store.dispatch(showLoading(false));
      navigate('/');
    } catch (error) {
      alert('error');
      store.dispatch(showLoading(false));
    }
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign Up for Open Chat</h2>
      <label htmlFor="email">Name</label>
      <input
        type="text"
        required
        name="name"
        id="name"
        className="username__input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        required
        name="email"
        id="email"
        className="username__input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="text"
        minLength={6}
        required
        name="password"
        id="password"
        className="username__input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="bio">Bio</label>
      <input
        type="text"
        required
        name="bio"
        id="bio"
        className="username__input"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <label htmlFor="age">Age</label>
      <input
        type="text"
        required
        name="age"
        id="age"
        className="username__input"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
      />

      <button type="submit" className="home__cta">
        SIGN UP
      </button>
    </form>
  );
};

export default Signup;
