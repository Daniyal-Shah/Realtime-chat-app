import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../blank.css';
import { useSelector } from 'react-redux';
import { store } from '../redux/store/store';
import { showLoading } from '../redux/slices/userSlice';
import { Comment } from 'react-loader-spinner';
const ChatBody = ({ messages, lastMessageRef, setMessages, socket }) => {
  const [typingStatus, setTypingStatus] = useState({});
  const loggedInUser = useSelector((state) => state?.loggedInUser);
  const chattingUser = useSelector((state) => state?.chattingUser);
  const navigate = useNavigate();

  const [showSpinner, setShowSpinner] = useState(false);

  const handleLeaveChat = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const fetchMessages = async () => {
    if (chattingUser?._id)
      await socket.emit(
        'findAllMessage',
        {
          sender: loggedInUser?._id,
          reciever: chattingUser?._id,
        },
        (data) => {
          setMessages(data);
        },
      );
  };

  function formatChatDate(date) {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      // Format the date in a way that suits your needs
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }
  }

  socket.on('message', () => {
    setShowSpinner(true);
    fetchMessages();
    setShowSpinner(false);
  });

  socket.on('typing', (response) => {
    setTypingStatus(response);
  });

  useEffect(() => {
    setShowSpinner(true);

    fetchMessages();

    setShowSpinner(false);
  }, [chattingUser]);

  return (
    <div>
      <header className="chat__mainHeader">
        <span>
          <span className="blink_me"></span>
          {loggedInUser?.name}{' '}
        </span>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>
      <div>
        <div
          className="message__container"
          style={
            showSpinner
              ? {
                  background: 'black',
                  opacity: 0.2,
                }
              : {}
          }
        >
          {messages.map((message) =>
            message.sender === loggedInUser?._id ? (
              <div className="message__chats" key={message._id}>
                {/* <p className="sender__name">You</p> */}
                <div className="message__sender">
                  <p>{message.message}</p>
                  <p className="message_date">
                    {formatChatDate(new Date(message.createdAt))}
                  </p>
                </div>
              </div>
            ) : (
              <div className="message__chats" key={message._id}>
                {/* <p>{message.reciever}</p> */}
                <div className="message__recipient">
                  <p>{message.message}</p>
                  <p className="message_date">
                    {formatChatDate(new Date(message.createdAt))}
                  </p>
                </div>
              </div>
            ),
          )}

          <div className="message__status">
            {typingStatus.isTyping &&
              typingStatus.from != loggedInUser?.name && (
                <p>{typingStatus.from + ' is typing...'}</p>
              )}
          </div>
          <div ref={lastMessageRef} />
        </div>

        {showSpinner && (
          <div
            style={{
              position: 'absolute',
              left: '55%',
              top: '40%',
            }}
          >
            <Comment
              visible={true}
              height="80"
              width="80"
              ariaLabel="comment-loading"
              wrapperStyle={{}}
              wrapperClass="comment-wrapper"
              color="#fff"
              backgroundColor="#4fa94d"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBody;
