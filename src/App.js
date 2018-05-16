import React, { Component } from 'react';
import './App.css';
import RoomList from "./components/RoomList.js";
import * as firebase from 'firebase';

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
  render() {
    return (
      <section>
        <RoomList
         firebase={firebase}
        />
      </section>
    )
  }
}

export default App;
