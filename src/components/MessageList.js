import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.messageRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this);
  }

  componentDidMount(){
    this.messageRef.on("child_added", snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message ) })
    })
  }

  createMessage(e) {
    e.preventDefault();
    var currentUsername = "Guest User";
    var messageContent = this.refs.messageContent.value;
    var activeRoomId = this.props.activeRoom;
    this.messageRef.push({
      username: currentUsername,
      content: messageContent,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: activeRoomId
    });
    document.getElementById("message-field").value = "";
  }

  render() {
    var currentMessages = this.state.messages.filter( message => message.roomId === this.props.activeRoom);
    return (
      <section id="messages">
        <section id="messageList">{currentMessages.map((data, index) =>
          <div key={index}>
            <p>{data.username}:</p>
            <p>"{data.content}"</p>
            <p>at {data.sentAt}</p>
          </div>)}
        </section>
        <section>
        {this.props.activeRoom !== "" &&
          <form
            id="messageForm"
            onSubmit={this.createMessage}
          >
            <p>Send a message:</p>
            <input
              type="text"
              placeholder="Enter your message here."
              ref="messageContent"
              id="message-field"
            />
            <br />
            <input
              type="submit"
              value="Submit"
            />
          </form>}
        </section>
      </section>
    )
  }
}

export default MessageList;
