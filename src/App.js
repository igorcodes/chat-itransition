import React from 'react';
import axios from 'axios';
import socket from './socket';

import reducer from './reducer';
import Auth from './components/Auth';


function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  }); 

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',  
      payload: obj,
    }); 
    socket.emit('ROOM:JOIN', obj);  
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };
    
     const setUsers = (users) => {
      dispatch({
        type: 'SET_USERS',
        payload: users,
      });
    };

    const addMessage = (message) => {
      dispatch({
        type: 'NEW_MESSAGE',
        payload: message,
      });
    };

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

    window.socket = socket;


    const onSuccess = response => console.log(response);
    const onFailure = response => console.error(response);
 

  return (
    <div className="wrapper"> 
     <Auth/>,
    </div>
  );
}
    
export default App;

