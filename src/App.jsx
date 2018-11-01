import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

// import { url } from 'inspector';

class App extends Component {
  constructor(props) { // use constructor for initializing state and binding methods
    super(props); // mandatory for constructors, must be called before any other state otherwise this.props will be undefined
    this.state = { // initializing state, we have to use 'state' for data that is going to change
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.onNewMessage = this.onNewMessage.bind(this); // binds 'this' (App) to onNewMessage
    this.socket = new WebSocket('ws://localhost:3001/')

  }

  componentDidMount() { // invoked once new message is mounted. The following lines of code are not needed. It's for illustration purposes.
    // console.log("componentDidMount <App />");
    // setTimeout(() => { // used to reset state with new message???
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})  // displays all messages
    // }, 1000);
    this.socket.onopen = function(event) {
      console.log('Connected to server')
    }
  }

  onNewMessage(content) { 
    const newMessage = { username: this.state.currentUser.name, content: content } // assigns id to new message
    const messagesWithNewMessage = this.state.messages.concat(newMessage); // adds new message to message list
    this.setState({ messages: messagesWithNewMessage }) // displays all messages
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


