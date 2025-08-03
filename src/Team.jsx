import React, { useState } from 'react';

function WebMessageSender() {
  const [input, setInput] = useState('');

  const sendMessage = () => {
    fetch('http://localhost:3000/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newMessage: input }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) alert('Message updated!');
        else alert('Failed to update.');
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Send a Message to the App</h2>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={sendMessage}>Send to Backend</button>
    </div>
  );
}

export default WebMessageSender;