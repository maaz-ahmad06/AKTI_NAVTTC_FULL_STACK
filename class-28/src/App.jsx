import React, { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0);
  function changeName (){
    setCount(count + 1)
  }
  return (
    <div>
      <h1>Count {count}</h1>
      <button onClick={changeName}>Counter</button>
    </div>
  )
}

export default App
