import React from "react";
import { useState } from "react";

function Sender({ setMessage }) {
  return (
    <>
      <input
        type="text"
        placeholder="Type a message"
        onChange={(e) => setMessage(e.target.value)}
      />
    </>
  );
}

function Receiver({ message }) {
  return <div>You Sent: {message}</div>;
}

function App() {
  const [message, setMessage] = useState("");

  return (
    <div>
      <Sender setMessage={setMessage} />
      <Receiver message={message} />
    </div>
  );
}

export default App;
