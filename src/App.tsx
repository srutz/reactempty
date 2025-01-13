import { useEffect, useState } from "react"

export function App() {
    const [ counter, setCounter ] = useState(1)
    console.log("rerender", counter)
    useEffect(() => {
        console.log("run effect ", counter)
        // on Mount install timer
        const i = setInterval(() => { 
            setCounter(counter + 1)
            console.log("interval called")
        }, 1_000)
        return () => {
            clearInterval(i)  // cleanup
        }
    }, [ counter ])
    const handleClick = () => {
        console.log("clicked me")
        setCounter(counter + 1)
    }
    return (
        <button onClick={handleClick}>Button {counter}</button>
    )
}

