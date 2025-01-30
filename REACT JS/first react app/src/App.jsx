import React, {useState} from 'react'
 



// const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <p>you clicked {count} times</p>
  //     <button onClick={() => setCount(count + 1)}>Click me</button>
  //   </>
  // )



//example of props
function Car(prop){
  return <h2> i own a {prop.name}! </h2>
  }

function App() {
  return (
    <>
      <Car name="ford"/>
    </>
 );
}

export default App
