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
  }

  componentDidMount() { // invoked once new message is mounted. The following lines of code are not needed. It's for illustration purposes.
    // all listeners go here
    this.socket.onopen = function(event) {
      console.log('Connected to server')
    }
    this.socket.onmessage = (event) => {
      const newMsg = JSON.parse(event.data);
      const newMessage = {
        id: newMsg.id,
        username: newMsg.currentUser,
        content: newMsg.content
      }
      console.log("NEW_MESSAGE", newMessage)
      const messagesWithNewMessage = this.state.messages.concat(newMessage); 
      this.setState({ messages: messagesWithNewMessage })
    }
  }

  onNewMessage(content) { 
    const newMessage = { username: this.state.currentUser.name, content: content }; // assigns id to new message
    // const messagesWithNewMessage = this.state.messages.concat(newMessage); // adds new message to message list
    // this.setState({ messages: messagesWithNewMessage }) // displays all messages
    this.socket.send(JSON.stringify(newMessage))
  }

  render() { // renders App
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={ this.state.messages }/> 
        <ChatBar currentUser={ this.state.currentUser } onNewMessage = { this.onNewMessage }/>
      </div>
    );
  }
}
export default App;


