import { useEffect, useState } from "react"

let global = 1

export function App() {

    const [ counter, setCounter ] = useState(1)
    console.log("rerender", global++)

    useEffect(() => {
        setInterval(() => { 
            setCounter(counter + 1)
            console.log("interval called")
        }, 1_000)
    }, [])

    const handleClick = () => {
        console.log("clicked me")
        setCounter(counter + 1)
    }

    return (
        <button onClick={handleClick}>Button {counter}</button>
    )
}

