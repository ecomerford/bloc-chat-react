import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }


  componentDidMount(){
      this.roomsRef.on("child_added", snapshot => {
          const room = snapshot.val();
          room.key = snapshot.key;
          this.setState({ rooms: this.state.rooms.concat( room ) })
          console.log(this.state.rooms)
      })
  }

  render() {
    return (
      <div className="rooms">
        {
          this.state.rooms.map((data, index) =>
            <p key={index}>{data.name}</p>
          )
        }
      </div>
    )
  }
}

export default RoomList;
