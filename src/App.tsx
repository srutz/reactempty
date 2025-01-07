import autoAnimate from "@formkit/auto-animate"
import { ReactNode, useState, FC, useRef, useEffect } from "react"
import { MdArrowRight, MdCheck, MdDelete, MdOutlineSquare, MdSquare } from "react-icons/md"


type Task = {
    id: number, title: string, status: "NEW" | "DONE"
}

export function App() {
    const parent = useRef<HTMLDivElement>(null)
    const [tasks, setTasks] = useState(() => {
        const initialTasks: Task[] = [
            { id: 1, title: "Einkaufen", status: "NEW" },
            { id: 2, title: "Staubsaugen", status: "NEW" },
            { id: 3, title: "Rasenmähen", status: "NEW" },
            { id: 4, title: "Schneeschaufeln", status: "NEW" },
        ]
        return initialTasks
    })
    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    const handleToggle = (task: Task) => {
        // set task to done
        task.status = task.status == "NEW" ? "DONE" : "NEW"
        const newTasks = [...tasks] // flat copy of tasks[]
        setTasks(newTasks)
    }
    const handleChange = (task: Task) => {
        const newTasks = [...tasks] // flat copy of tasks[]
        setTasks(newTasks)
    }
    const handleDelete = (task: Task) => {
        setTasks(tasks.filter(t => task.id != t.id ))
    }
    return (
        <FoldPanel message="Tasks ..." >
            <div className="flex flex-col gap-1 pt-4" ref={parent}>
                {tasks.map((task) => (
                    <TaskDisplay key={task.id} task={task} 
                        handleDelete={handleDelete} 
                        handleChange={handleChange} 
                        handleToggle={handleToggle} />
                ))}
            </div>
        </FoldPanel>
    )
}

type TaskFunc = (t: Task) => void

type TaskDisplayProps = { 
    task: Task, 
    handleToggle: TaskFunc,
    handleChange: TaskFunc,
    handleDelete: TaskFunc,
}

export const TaskDisplay: FC<TaskDisplayProps> = (props) => {
    const { task, handleToggle, handleDelete, handleChange } = props
    return (<div className="m-2 flex items-center gap-4 justify-between overflow-auto">
        <div className="flex gap-2 items-center">
            <button onClick={() => handleToggle(task)}>{task.status == "NEW" ? <MdOutlineSquare/> : <MdCheck />}</button>
            <input value={task.title} onChange={(e) => {
                task.title = e.target.value
                handleChange(task)
            }} className="p-1"></input>
        </div>

        <div className="flex gap-2">
            <button onClick={() => handleToggle(task)} 
                className="py-1 px-2 min-w-[120px] rounded text-white bg-blue-500 hover:bg-blue-600">
                    {task.status == "NEW" ? "Set done" : "Set New"}</button>
            <button onClick={() => handleDelete(task)} 
                className="py-1 px-2 rounded text-white bg-red-500 hover:bg-red-600">
            <MdDelete></MdDelete></button>
        </div>
    </div>)
}




type Props = { message: string, children: ReactNode }

export function FoldPanel(props: Props) {
    const [ open, setOpen ] = useState(true)
    const handleClick = () => setOpen(!open)
    return (
    <div className="bg-white rounded-lg 
        border border-gray-300 shadow-xl p-4 m-8">
        <div className="flex">
            <MdArrowRight className={`text-xl ${open ? "rotate-90" : ""}`}/>
            <button onClick={handleClick}>{props.message}</button>
        </div>
        {open && props.children}
    </div>)
}



