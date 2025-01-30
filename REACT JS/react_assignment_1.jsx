import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>You Clicked {count} Times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  );
}

export default App;
