import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }


  componentDidMount(){
    this.roomsRef.on("child_added", snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
    })
  }

  handleChange(e) {
    this.setState({name: e.target.value})
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.name()
    });
    this.setState({newRoom: ""});
  }

  render() {
    return (
      <section className="rooms">
        <div className="list">
          {
            this.state.rooms.map((data, index) =>
              <p
                onClick={this.props.setActiveRoom(data.key)}
                key={index}
              >
                {data.name}
              </p>
            )
          }
        </div>
        <form
          className="newRoomForm"
          onSubmit={this.createRoom}
        >
          <p>Create a New Room:</p>
          <input
            type="text"
            className="room-name"
            ref="createRoom"
            placeholder="Enter New Room Name."
            onChange={this.handleChange}
            value={this.state.NewRoom}
          / >
          <br />
          <input
            type="submit"
            value="Submit"
          / >
        </form>
      </section>
    )
  }
}

export default RoomList;
