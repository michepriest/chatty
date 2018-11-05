import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) { // use constructor for initializing state and binding methods
    super(props); // mandatory for constructors, must be called before any other state otherwise this.props will be undefined
    this.state = { // initializing state, we have to use 'state' for data that is going to change
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      onlineUsers: 0
    };
    this.socket = new WebSocket('ws://localhost:3001');
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUsername = this.onNewUsername.bind(this);
  }

  componentDidMount() { // invoked once new message is mounted. 
    // all listeners go here
    this.socket.onopen = function(event) {
      console.log('Connected to server')
    }
    this.socket.onmessage = (event) => {
      const newMsg = JSON.parse(event.data);
      const newMessage = {
        type: newMsg.type,
        id: newMsg.id,
        username: newMsg.currentUser,
        content: newMsg.content
      }
      switch(newMsg.type) {
        case "changeUser":
          let messagesWithNewMessage = this.state.messages.concat(newMessage); 
          this.setState({ messages: messagesWithNewMessage });
          break;
        case "changeMessage":
          let messagesWithNewMessages = this.state.messages.concat(newMessage); 
          this.setState({ messages: messagesWithNewMessages });
          break;
        case "connectedClients":
          let userCount = newMsg.count;
          this.setState({
            onlineUsers: userCount
          })
          break;
      } 
    }
  }

  onNewMessage(content) { // sends message to the server
    const newMessage = { type: "changeMessage", currentUser: this.state.currentUser.name, content }; // assigns id to new message
    this.socket.send(JSON.stringify(newMessage))
  }

  onNewUsername(newUsername) {// sends name change to the server
    if(newUsername === this.state.currentUser.name) {
      return
    } else {
      let newUser = {
        type: "changeUser",
        content: `${ this.state.currentUser.name } has changed their name to ${ newUsername }`
      }
      this.socket.send(JSON.stringify(newUser))
    }
    this.setState({ currentUser: {name: newUsername}});
  }

  render() { 
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className = "counter">{this.state.onlineUsers} users online</span>
        </nav>
        <MessageList messages={ this.state.messages } /> 
        <ChatBar currentUser={ this.state.currentUser } onNewMessage = { this.onNewMessage } onNewUsername = { this.onNewUsername } />
      </div>
    );
  }
}
export default App;


