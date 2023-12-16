import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { io } from 'socket.io-client';
import { store } from '../redux/store/store';
import { cleanStore } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatPage = ({}) => {
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:3001');
  const loggedInUser = useSelector((state) => state?.loggedInUser);
  const lastMessageRef = useRef(null);
  const [chattingWith, setChattingWith] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!loggedInUser?._id) {
      store.dispatch(cleanStore());
      navigate('/');
    }
  }, []);

  return (
    <div className="chat">
      <ChatBar
        chattingWith={chattingWith}
        setChattingWith={setChattingWith}
        setMessages={setMessages}
      />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          setMessages={setMessages}
          lastMessageRef={lastMessageRef}
          chattingWith={chattingWith}
          socket={socket}
        />
        <ChatFooter
          chattingWith={chattingWith}
          setChattingWith={setChattingWith}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default ChatPage;
