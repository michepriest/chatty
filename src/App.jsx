import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

// import { url } from 'inspector';

class App extends Component {
  constructor(props) { // use constructor for initializing state and binding methods
    super(props); // mandatory for constructors, must be called before any other state otherwise this.props will be undefined
    this.state = { // initializing state, we have to use 'state' for data that is going to change
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
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
          this.setState({ messages: messagesWithNewMessage }) ;
          break;
        case "changeMessage":
        console.log("message after message change", newMsg)
          let messagesWithNewMessages = this.state.messages.concat(newMessage); 
          this.setState({ messages: messagesWithNewMessages }) ;
      }
      
      
    }
      // const updateUsername = this.state.username.concat(newUsername)
      // this.setState({ username: updateUsername })
  }

  onNewMessage(content) { // sends message to the server
    const newMessage = { type: "changeMessage", currentUser: this.state.currentUser.name, content }; // assigns id to new message
    // const messagesWithNewMessage = this.state.messages.concat(newMessage); // adds new message to message list
    // this.setState({ messages: messagesWithNewMessage }) // displays all messages
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

  render() { // renders App
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={ this.state.messages } /> 
        <ChatBar currentUser={ this.state.currentUser } onNewMessage = { this.onNewMessage } onNewUsername = { this.onNewUsername } />
      </div>
    );
  }
}
export default App;


