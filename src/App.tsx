import { ReactNode, useEffect, useState } from "react"
import { MdStar, MdTableBar } from "react-icons/md"

export function App() {
    return (
        <div className="motion-preset-slide-left">
            <Box heading="News of the week" ><Greetings /></Box>
        </div>
    )
}

function Greetings() {
    useEffect(() => {
        // code that runs "on-mounted"
        const l = () => {
            console.log(window.innerWidth, window.innerHeight)
        }
        window.addEventListener("resize", l)
        console.log("add listener")
        return () => {
            // cleanup code that "on-unmounted"
            window.removeEventListener("resize", l)
            console.log("remove listener")
        }
    }, [])
    return <div>Hallo zusammen</div>
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

