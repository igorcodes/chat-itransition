import React, { Component } from 'react'
import { User } from './User'
import App2 from '../App2';

class Auth extends Component {
  state = {
    name: null,
    imgUrl: null,
  }
  componentDidMount() {
    const _onInit = auth2 => {
      console.log('init OK', auth2)
    }
    const _onError = err => {
      console.log('error', err)
    }
    window.gapi.load('auth2', function() {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        })
        .then(_onInit, _onError)
    })
  }

  
  signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signIn().then(googleUser => {
      const profile = googleUser.getBasicProfile()
      this.setState({
        name: profile.getName(),
        imgUrl: profile.getImageUrl(),
      })
    })
  }
  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      this.setState({
        name: null,
        imgUrl: null,
      })
    })
  }

  

  render() {
    
    const { name, imgUrl } = this.state
    return (
      <div className="App">
        <header className="App-header">


          {!name && <button class="btn btn-primary" onClick={this.signIn}>  Google Sign In  </button>}
          
          {!name && <p class="font-weight-bold">  10000 Bro!  20000 Sis!</p>}
          {!!name && <App2 />}
          {!!name && <User name={name} imgUrl={imgUrl} />}
        </header>
      </div>
    )
  }
}

export default Auth;






