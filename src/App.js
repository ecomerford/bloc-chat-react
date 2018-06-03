import React, { Component } from 'react';
import './App.css';
import RoomList from "./components/RoomList.js";
import * as firebase from 'firebase';
import MessageList from "./components/MessageList.js"
import User from "./components/User.js"

 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyBgfLlAUvJlJ3Y5oAh7PtTY8Sw3BwOlEsY",
   authDomain: "bloc-chat-react-16a3a.firebaseapp.com",
   databaseURL: "https://bloc-chat-react-16a3a.firebaseio.com",
   projectId: "bloc-chat-react-16a3a",
   storageBucket: "bloc-chat-react-16a3a.appspot.com",
   messagingSenderId: "1017711066519"
 };
 firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      userName: "Guest"
    }
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(e) {
    this.setState({activeRoom: e.target.id});
  }

  setUser(user) {
    if (user) {
    let authorizedUser = user.displayName;
    this.setState({userName: authorizedUser});
    } else {
    this.setState({userName: "Guest"});
    }
  }

  render() {
    return (
      <section className="App">
        <div className="container-fluid">
          <div className="row">
            <h1 className="col-6">
              Bloc Chat
            </h1>
            <div className="sign-in col-sm-6">
              <User
                firebase={firebase}
                userName={this.state.userName}
                setUser={this.setUser}
              />
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="body container-fluid">
          <div className="row">
            <div className="col-4 left-panel">
              <RoomList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
                userName={this.state.userName}
                setActiveRoom={this.setActiveRoom}
                setUser={this.setUser}
              />
            </div>
            <div className="col-8 right-panel">
              <h3>{this.state.activeRoom}</h3>
              <MessageList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
                userName={this.state.userName}
                setUser={this.setUser}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default App;
