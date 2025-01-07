import { ReactNode, useState } from "react"
import { MdAddBox, MdArrowRight, MdCheck, MdOutlineSquare, MdSquare } from "react-icons/md"


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
            {tasks.map((task) => (
                <div key={task.id} className="flex gap-2 m-2 items-center justify-between">
                    <TaskDisplay task={task} />
                    <button onClick={() => {
                        // set task to done
                        task.status = task.status == "NEW" ? "DONE" : "NEW"
                        const newTasks = [...tasks] // flat copy of tasks[]
                        setTasks(newTasks)
                    }} className=" p-2 min-w-[120px] rounded text-white bg-blue-500 hover:bg-blue-600">
                        {task.status == "NEW" ? "Set done" : "Set New"}</button>
                </div>
            ))}
        </FoldPanel>
    )
}

export function TaskDisplay(props: { task: Task}) {
    const { task } = props
    return (<div className="flex items-center gap-2">
        {task.status == "NEW" ? <MdOutlineSquare/> : <MdCheck />} {task.title}
    </div>)
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

