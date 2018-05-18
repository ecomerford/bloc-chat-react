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

  handleChange(event) {
    this.setState({name: event.target.value})
  }

  createRoom=(e) => {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.name
    });
  }

  render() {
    return (
      <section className="rooms">
        <div className="list">
          {
            this.state.rooms.map((data, index) =>
              <p key={index}>{data.name}</p>
            )
          }
        </div>
        <form
          className="newRoomForm"
          onSubmit={this.createRoom}
        >
          <label>
            Create a New Room:
            <input
              type="text"
              className="room-name"
              name="create-room"
              placeholder="Enter New Room Name."
              value={this.state.rooms.name}
              onChange={this.handleChange}
            / >
          </label>
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
