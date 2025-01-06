import { ReactNode, useState } from "react"
import { MdArrowDownward, MdArrowRight } from "react-icons/md"

export function App() {
    return (
        <FoldPanel message="Message of the day">
            <div className="text-3xl">Hello</div>
        </FoldPanel>
    )
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

