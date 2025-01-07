import { ReactNode, useState, FC } from "react"
import { MdAddBox, MdArrowRight, MdCheck, MdDelete, MdOutlineSquare, MdSquare } from "react-icons/md"


type Task = {
    id: number, title: string, status: "NEW" | "DONE"
}

export function App() {
    const [tasks, setTasks] = useState(() => {
        const initialTasks: Task[] = [
            { id: 1, title: "Einkaufen", status: "NEW" },
            { id: 2, title: "Staubsaugen", status: "NEW" },
            { id: 3, title: "Rasenmähen", status: "NEW" },
            { id: 4, title: "Schneeschaufeln", status: "NEW" },
        ]
        return initialTasks
    })
    const handleToggle = (task: Task) => {
        // set task to done
        task.status = task.status == "NEW" ? "DONE" : "NEW"
        const newTasks = [...tasks] // flat copy of tasks[]
        setTasks(newTasks)
    }
    const handleDelete = (task: Task) => {
        setTasks(tasks.filter(t => task.id != t.id ))
    }
    return (
        <FoldPanel message="Message of the day">
            {tasks.map((task, index) => (
                <TaskDisplay key={index} task={task} 
                    handleDelete={handleDelete} 
                    handleToggle={handleToggle} />
            ))}
        </FoldPanel>
    )
}

type TaskFunc = (t: Task) => void

type TaskDisplayProps = { 
    task: Task, 
    handleToggle: TaskFunc,
    handleDelete: TaskFunc,
}

export const TaskDisplay: FC<TaskDisplayProps> = (props) => {
    const { task, handleToggle, handleDelete } = props
    return (<div className="m-2 flex items-center gap-2 justify-between ">
        <div className="flex gap-2 items-center">
            {task.status == "NEW" ? <MdOutlineSquare/> : <MdCheck />} {task.title}
        </div>

        <div className="flex gap-2">
            <button onClick={() => handleToggle(task)} 
                className=" p-2 min-w-[120px] rounded text-white bg-blue-500 hover:bg-blue-600">
                    {task.status == "NEW" ? "Set done" : "Set New"}</button>
            <button onClick={() => handleDelete(task)} 
                className=" p-2 rounded text-white bg-red-500 hover:bg-red-600">
        <MdDelete></MdDelete></button>
        </div>
    </div>)
}




type Props = { message: string, children: ReactNode }

export function FoldPanel(props: Props) {
    const [ open, setOpen ] = useState(true)
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



