import { useEffect, useState } from "react"

export function App() {
    const [time, setTime] = useState(new Date().toLocaleTimeString())
    useEffect(
        () => {
            /* begin effect code */
            const interval = setInterval(() => {
                setTime(new Date().toLocaleTimeString())
            }, 1_000)
            return () => {
                clearInterval(interval)                
            }
            /* end effect code */
        },
        [ time ])
    return (
        <div className="text-3xl">{time}</div>
    )
}

