import { useState } from "react"

export function App() {
    const leute = [ "Frank", "Hans", "Rudi", "Jens", "karl" ]
    return (
        <div className="text-3xl">
            {leute.map((l,i) => (<Greeting key={i} message={l} />))}
        </div>
    )
}

function Greeting(props : { message: string}) {
    const [count, setCount] = useState(1)
    console.log("rendering greeting", count, props.message)
    const inc = () => { 
        setCount(oldCount => oldCount + 1)
    }
    return <div onClick={inc} 
                className="cursor-pointer p-2 hover:underline">
                    Ich grüße dich {count} mal {props.message}
        </div>
}

