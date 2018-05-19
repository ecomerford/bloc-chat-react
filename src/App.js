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

  setActiveRoom(selectedRoom) {
    var newActiveRoom = selectedRoom;
    this.setState({activeRoom: newActiveRoom});
    console.log(this.state.activeRoom);
  }

  render() {
    return (
      <section className="App">
        <RoomList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          setActiveRoom={this.setActiveRoom}
        />
        <MessageList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
        />
      </section>
    )
  }
}

export default App;
