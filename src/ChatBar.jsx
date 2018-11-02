import React, {Component} from 'react';

class ChatBar extends Component { // username and new message component
  constructor(props) {
    super(props);

    this.handleMessageKeypress = this.handleMessageKeypress.bind(this)
    this.handleUsernameKeypress = this.handleUsernameKeypress.bind(this)
  }

  handleMessageKeypress(event) {
    if(event.key === 'Enter') {
      this.props.onNewMessage(event.target.value);
      // console.log("EVENT TARGET CLASSNAME", event.target.className)
      // console.log("EVENT TARGET VALUE", event.target.value)
    }
  }
  handleUsernameKeypress(event) {
    if(event.key === 'Enter' ) {
      this.props.onNewUsername(event.target.value);
      // console.log("THIS IS MY NEW USERNAME!!!", event.target.value)
    }
  }





  render() {
    console.log("THIS HANDLE MESSAGE KEYPRESS", this.handleMessageKeypress)
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress={ this.handleUsernameKeypress } placeholder={ this.props.currentUser.name } />
        <input className="chatbar-message" onKeyPress={ this.handleMessageKeypress } placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;