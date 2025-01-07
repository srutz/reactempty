import { useEffect, useState } from "react"

export function App() {
    return (
        <div className="text-3xl">
            <Greeting></Greeting>
            <WindowSize></WindowSize>
        </div>
    )
}

export function Greeting() {
    const size = useWindowSize()
    console.log("render greeting", size)
    if (size.width < 500) {
        return <div>Schmal heute</div>
    }
    return <div>Wir haben Platz</div>
}

export function WindowSize() {
    const size = useWindowSize()
    return (<div>{size.width} x {size.height}</div>)
}

export function useWindowSize() {
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
    return size
}
