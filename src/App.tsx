import { useState } from "react"


export function App() {
    const [count,setCount] = useState(10)
    console.log("Render App " + JSON.stringify(count))
    const clicked = () => { 
        setCount(count + 1)
    }
    return <button onClick={clicked}>Count is {count}</button>
}

