import { useEffect, useState } from "react"

export function App() {
    return (
        <div className="text-3xl">
            <WindowSize></WindowSize>
        </div>
    )
}

export function WindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    useEffect(() => {
        const l = () => {
            setSize({ 
                width: window.innerWidth,
                height: window.innerHeight })
        }
        window.addEventListener("resize", l)
        return () => {
            window.removeEventListener("resize", l)
        }
    }, [])

    return (<div>{size.width} x {size.height}</div>)
}

