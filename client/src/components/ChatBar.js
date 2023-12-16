import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../redux/store/store';
import {
  getAllUsersAction,
  setChattingUserAction,
} from '../redux/slices/userSlice';

const ChatBar = ({ setMessages }) => {
  const { allUsers, chattingUser } = useSelector((state) => state);

  useEffect(() => {
    store.dispatch(getAllUsersAction());
  }, []);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ALL USERS</h4>
        <div className="chat__users">
          {allUsers?.map((user) => (
            <div
              style={{
                border: '1px solid gray',
                borderRadius: 1,
                padding: 10,
                background: user._id == chattingUser?._id ? 'green' : 'white',
                color: user._id == chattingUser?._id ? 'white' : 'black',
              }}
              onClick={() => {
                setMessages([]);
                store.dispatch(setChattingUserAction(user));
              }}
            >
              <p
                key={user._id}
                style={{
                  textAlign: 'center',
                }}
              >
                {user.name}{' '}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
