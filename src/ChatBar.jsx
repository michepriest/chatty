import React, {Component} from 'react';

class ChatBar extends Component { // username and new message component
  constructor(props) {
    super(props);

    this.handleKeypress = this.handleKeypress.bind(this)
  }

  handleKeypress(event) {
    if(event.key === 'Enter') {
     this.props.onNewMessage(event.target.value);
    console.log(event.target.value)
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={ this.props.currentUser.name } />
        <input className="chatbar-message" onKeyPress={ this.handleKeypress } placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;