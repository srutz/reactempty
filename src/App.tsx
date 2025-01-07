import { ReactNode, useState } from "react"
import { MdArrowRight } from "react-icons/md"


type Task = {
    id: number, title: string, status: "NEW" | "DONE"
}

export function App() {
    const initialTasks: Task[] = [
        { id: 1, title: "Einkaufen", status: "NEW" },
        { id: 2, title: "Staubsaugen", status: "NEW" },
        { id: 3, title: "Rasenmähen", status: "NEW" },
        { id: 4, title: "Schneeschaufeln", status: "NEW" },
    ]
    const [tasks, setTasks] = useState(initialTasks)
    return (
        <FoldPanel message="Message of the day">
            {tasks.map((task) => <TaskDisplay key={task.id} task={task} />)}
        </FoldPanel>
    )
}

export function TaskDisplay(props: { task: Task}) {
    const { task } = props
    return (<div>{task.title} : {task.status}</div>)
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

