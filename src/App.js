import React, { Component } from 'react';
import './App.css';
import RoomList from "./components/RoomList.js";
import * as firebase from 'firebase';
import MessageList from "./components/MessageList.js"

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
      activeRoom: ""
    }
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(e) {
    this.setState({activeRoom: e.target.id});
  }

  render() {
    return (
      <section className="App">
        <div className="container-fluid">
          <div className="row">
            <h1 className="col-12">
              Bloc Chat
            </h1>
          </div>
        </div>
        <div className="body container-fluid">
          <div className="row">
            <div className="col-4 left-panel">
              <RoomList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
                setActiveRoom={this.setActiveRoom}
              />
            </div>
            <div className="col-8 right-panel">
              <h3>{this.state.activeRoom}</h3>
              <MessageList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default App;
