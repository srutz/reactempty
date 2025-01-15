import { ReactNode, useEffect, useState } from "react"

export function App() {
    return (
        <div className="text-3xl">
            <Box title="Settings">weoweofijeoifj
                <div className="w-32 h-32 bg-orange-400"></div>
            </Box>
        </div>
    )
}

function Box(props: { title: string, children?: ReactNode }) {
    const [open, setOpen] = useState(false)
    useEffect(() => {

    }, [])
    const handleClick = () => setOpen(!open)
    console.log("Box opened")
    return (
        <div className="m-4 py-2 px-4 rounded-lg shadow-xl
            border border-gray-300 cursor-pointer select-none
            bg-white flex flex-col">
            <div className="justify-between flex border-b border-gray-500 pb-2 mb-4">
                <div>{props.title}</div>
                <button onClick={handleClick}
                  className="text-sm">{open ? "▼" : "◄"}</button>
            </div>

            {open && <div className="motion-preset-pop">{props.children}</div>}
        </div>
    )
}
