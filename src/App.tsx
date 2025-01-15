import { useState } from "react"

export function App() {
    const names = [ "Schalke04", "BVB", "Werder", "1.FC Köln"]
    return ( 
        <div className="text-3xl">
            {names.map((n) => (<Box extra={n}></Box>))}
        </div>
    )}


function Box(props : { extra?: string}) {
    console.log("render box")
    const [ counter, setCounter] = useState(1)

    return (
        <div className="m-4 p-4 rounded-lg shadow-xl
            border border-gray-300 cursor-pointer select-none
            hover:underline
            bg-white flex flex-col motion-preset-slide"
            onClick={() => {
                setCounter(counter + 1)
                setCounter(counter + 1)
                setCounter(counter + 1)
            }}
            >
                {props.extra}{" "}
                Counter: {counter}
                {counter > 10 && 
                    <div className="text-red-700 text-sm">Zu hoch!!</div>
                }
        </div>
    )
}
