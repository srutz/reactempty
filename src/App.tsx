import { ReactNode, useEffect, useState } from "react"
import { MdStar, MdTableBar } from "react-icons/md"

export function App() {
    return (
        <div className="motion-preset-slide-left">
            <Box heading="News of the week" ><Greetings /></Box>
        </div>
    )
}

function useWindowSize() {
    const [ size, setSize ] = useState({ 
        width: window.innerWidth, height: window.innerHeight
    })
    useEffect(() => {
        // code that runs "on-mounted"
        const l = () => {
            setSize({ 
                width: window.innerWidth, height: window.innerHeight
            })
        }
        window.addEventListener("resize", l)
        return () => {
            // cleanup code that "on-unmounted"
            window.removeEventListener("resize", l)
        }
    }, [])
    return size
}

function useInterval(intervalTime: number, intervalFunc: () => void) {
    useEffect(() => {
        const id = setInterval(intervalFunc, intervalTime)
        return () => { clearInterval(id) }
    }, [])
}


function Greetings() {
    const [ date, setDate ] = useState(new Date())
    console.log("render greetings ....")
    useWindowSize()
    useInterval(1_000, () => {
        console.log("timer tick")
        setDate(new Date())
    })
    return (
        <div>Hallo zusammen {date.toLocaleString()}</div>
    )
}

type BoxProps = { heading: string, star?: boolean, children: ReactNode }

function Box({ heading, star, children }: BoxProps) {
    const [ open, setOpen ] = useState(false)
    function handleClick() {
        setOpen(!open)
    }
    return (
        <div className="bg-gray-300 shadow-xl rounded-lg p-4 m-4 flex flex-col gap-2">
            <div className="text-sm text-gray-600 flex justify-between items-center pb-2">
                <button onClick={handleClick}>
                    {open ? "▾" : "▸"}
                </button>
                <div className="flex items-center gap-2">
                    <span>{heading}</span>
                    {star && <MdStar />}
                </div>
            </div>
            {open && (
                <div className="mt-2">
                    {children}
                </div>
            )}
        </div>
    )
}

