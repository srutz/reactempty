import { ReactNode, useState } from "react"
import { MdArrowRight } from "react-icons/md"

export function App() {
    return (
        <FoldPanel message="Message of the day">
            <div className="text-3xl">Hello</div>
            <Counter></Counter>
        </FoldPanel>
    )
}

export function Counter() {
    const [count, setCount ] = useState({ val: 1, age: 10, smart: false})
    return (
        <button onClick={() => {
            // variante 1
            //const newCount = { val: count.val + 1 }

            // variante 2
            //const newCount = { ...count }
            //newCount.val++

            // variante 3
            const newCount = { ...count, val: count.val + 1}

            setCount(newCount)
         }}>Change me {count.val} </button>
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

