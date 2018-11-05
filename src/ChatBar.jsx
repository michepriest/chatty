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
    }
  }
  handleUsernameKeypress(event) {
    if(event.key === 'Enter' ) {
      this.props.onNewUsername(event.target.value);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress={ this.handleUsernameKeypress } placeholder={ this.props.currentUser.name } />
        <input className="chatbar-message" onKeyPress={ this.handleMessageKeypress } placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;