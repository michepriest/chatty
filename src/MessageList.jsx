import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const allTheMessages = this.props.messages.map((message) => {
    return <Message key={message.id} message={ message } />
  });

    return (
      <main className="messages">
        { allTheMessages }
      </main>
    );
  }
}
export default MessageList;
