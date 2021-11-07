import React from 'react';
import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: "Hello Bro",
      messageValue: "Hello Bro",
    });
    onAddMessage({ userName, text: "Hello Bro" });
    setMessageValue('');
  };

  const onSendMessage2 = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: "Hello Sis",
      messageValue: "Hello Sis",
    });
    onAddMessage({ userName, text: "Hello Sis" });
    setMessageValue('');
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        Room: <b>{roomId}</b>
        <hr />
        <b>Online ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message) => (
            <div className="message">
              <p>{message.text}</p>
              <div>
                <span>{'Sent by ' + message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form>
          
          <button onClick={onSendMessage} type="button" className="btn btn-primary">
            Hello Bro
          </button>

          <button onClick={onSendMessage2} type="button" className="btn btn-primary">
          Hello Sis
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;