import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    var provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider)
  }

  signOut() {
    this.props.firebase.auth().signOut()
  }

  render() {
    return (
      <div>
        <p>Hello, {this.props.userName}!</p>
        <button onClick={this.signIn}>
          Sign In
        </button>
        <button onClick={this.signOut}>
          Sign Out
        </button>
      </div>
    )
  }
}

export default User;
