import { ReactNode, useEffect, useState } from "react"

export function App() {
    return (
        <div className="text-3xl">
            <Alerter></Alerter>
            <Box title="Settings">weoweofijeoifj
                <div className="w-32 h-32 bg-orange-400"></div>
            </Box>
        </div>
    )
}

function Alerter() {
    const size = useWindowSize()
    return size.height < 400 && <div className="text-red-600">
            Your browser width is to low</div> 
}

function Box(props: { title: string, children?: ReactNode }) {
    const size = useWindowSize()
    const [open, setOpen] = useState(false)
    const handleClick = () => setOpen(!open)
    return (
        <div className="m-4 py-2 px-4 rounded-lg shadow-xl
            border border-gray-300 cursor-pointer select-none bg-white flex flex-col">
            <div className="justify-between flex border-b border-gray-500 pb-2 mb-4">
                <div>{props.title} {size.width} x {size.height}</div>
                <button onClick={handleClick}
                  className="text-sm ">{open ? "▼" : "◄"}</button>
            </div>
            {open && <div className="motion-preset-pop">{props.children}</div>}
        </div>
    )
}

function useWindowSize() {
    const [size, setSize] = useState({ 
        width: window.innerWidth,
        height: window.innerHeight})
    useEffect(() => {
        const l = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener("resize", l)
        return () => { 
            window.removeEventListener("resize", l) 
        }
    }, [])
    return size
}

function useSmallWindow() {
    const [small, setSmall] = useState(window.innerHeight < 400)
    useEffect(() => {
        const l = () => {
            setSmall(window.innerHeight < 400)
        }
        window.addEventListener("resize", l)
        return () => {
            window.removeEventListener("resize", l) 
        }
    }, [])
    return small
}

function useSmallWindow2() {
    const size = useWindowSize()
    return size.height < 400
}