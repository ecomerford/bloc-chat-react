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
    var time = "Unknown";
    var activeRoomId = this.props.activeRoom.name;
    this.messageRef.push({
      username: currentUsername,
      content: messageContent,
      sentAt: time,
      roomId: activeRoomId
    });
    this.setState({newMessage: ""})
  }

  render() {
    return (
      <section id="messages">
        <section id="messageList">{this.state.messages.map((data, index) =>
          <div>
            <div key={index}>{data.username}</div>
            <div key={index}>{data.content}</div>
            <div key={index}>(data.sentAt)</div>
          </div>)}
        </section>
        <section id="newMessage">
          <form
            id="messageForm"
            onSubmit={this.createMessage}
          >
            <p>Send a message:</p>
            <input
              type="text"
              placeholder="Enter your message here."
              ref="messageContent"
            />
            <br />
            <input
              type="submit"
              value="Submit"
            />
          </form>
        </section>
      </section>
    )
  }
}

export default MessageList;
