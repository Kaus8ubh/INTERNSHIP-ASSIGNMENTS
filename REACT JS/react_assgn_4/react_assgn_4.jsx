import React, { useRef } from "react";
import { Button } from "react-bootstrap";

function App() {
  const inputRef = useRef();

  function click() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <Button onClick={click}> click to focus </Button>
    </>
  );
}

export default App;
