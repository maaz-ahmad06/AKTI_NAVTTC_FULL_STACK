import { useMemo, useState } from "react"

const App = () => {
  let [count, setCount] = useState(0);

  function expensiveTask(num){
    console.log("Expensive task Running...");
    for(let i=0; i<=10000; i++){}
    return num * 2;
  }

  const doubleValue = useMemo(()=>{
    return expensiveTask(4);
  },[])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <h1>Count: {count}</h1>
      <h2>Double: {doubleValue}</h2>
    </div>
  )
}

export default App
