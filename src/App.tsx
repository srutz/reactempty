import { ReactNode, useEffect, useState } from "react"
import { MdArrowDownward, MdArrowRight } from "react-icons/md"

export function App() {
    return (
        <FoldPanel message="Message of the day">
            <div className="text-3xl">Hello</div>
            <Clock></Clock>
            <WindowSize></WindowSize>
            <Clock></Clock>
            <WindowSize></WindowSize>
        </FoldPanel>
    )
}

export function WindowSize() {
    console.log("render windowsize")
    const [ size, setSize ] = useState({ 
        width: window.innerWidth, height: window.innerHeight })
    useEffect(() => {
        const l = () => {
            console.log("window resized")
            setSize({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener("resize", l)
        return () => {
            window.removeEventListener("resize", l)
        }
    }, [])
    return (
        <div>{size.width} x {size.height}</div>
    )
}

export function Clock() {
    const [ time, setTime] = useState<Date>()
    useEffect(() => {
        // run when mounted
        const i = setInterval(() => {
            //console.log("setting date")
            setTime(new Date())
        }, 1_000) // every 1000 millis
        // end of run when mounted
        return () => {
            // run when unmounted
            clearInterval(i)
        }
    }, [])
    return (<div>{time?.toLocaleTimeString()}</div>)
}

type Props = { message: string, children: ReactNode }

export function FoldPanel(props: Props) {
    const [ open, setOpen ] = useState(true)
    console.log("render fp " + open)
    const handleClick = () => setOpen(!open)
    return (
    <div className="bg-gray-200 rounded-lg 
        border border-gray-500 shadow-xl p-4 m-8">
        <div className="flex">
            <MdArrowRight className={`text-xl ${open ? "rotate-90" : ""}`}/>
            <button onClick={handleClick}>{props.message}</button>
        </div>
        {open && props.children}
    </div>)
}

