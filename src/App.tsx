import { ReactNode, useState } from "react"
import { MdStar, MdTableBar } from "react-icons/md"

export function App() {
    return (
        <div className="motion-preset-slide-left">
            <Box heading="News of the day" star>
                <Greetings />
                <Greetings />
            </Box>
            <Box heading="News of the week" ><Greetings /></Box>
        </div>
    )
}

function Greetings() { return <div>Hallo zusammen</div> }

type BoxProps = { heading: string, star?: boolean, children: ReactNode }

function Box({ heading, star, children }: BoxProps) {
    const [ open, setOpen ] = useState<boolean>(false)
    console.log("render Box", heading)
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

