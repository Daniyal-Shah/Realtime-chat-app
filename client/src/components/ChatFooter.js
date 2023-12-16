import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { store } from '../redux/store/store';
import { showLoading } from '../redux/slices/userSlice';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('');

  const loggedInUser = useSelector((state) => state?.loggedInUser);
  const chattingUser = useSelector((state) => state?.chattingUser);

  const handleTyping = () => {
    socket.emit('typing', {
      isTyping: true,
      from: loggedInUser?.name,
      to: chattingUser?.name,
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    // store.dispatch(showLoading(true));

    socket.emit('createMessage', {
      //Payload for message
      sender: loggedInUser._id,
      reciever: chattingUser?._id,
      message,
      createdAt: Date.now(),
    });
    setMessage('');

    // store.dispatch(showLoading(false));
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => {
            if (chattingUser?._id) {
              setMessage(e.target.value);
            } else {
              alert('Select A User To Chat With');
            }
          }}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
