import { ReactNode, useEffect, useState } from "react"

export function App() {
    const [key, setKey] = useState(1)

    return (
        <div className="bg-gray-200 w-full h-full flex flex-col gap-4 items-center">
            <Box key={key}>
                <Logo title="Willkommen"></Logo>
            </Box>
            <button onClick={() => setKey(key + 1)}>Restart Animation</button>
        </div>
    )
}


function Box(props: { children: ReactNode }) {
    const cn = "motion-preset-pop bg-white border border-gray-300 shadow-xl rounded-xl m-2 p-4"
        + " flex flex-col"
    return (
        <div className={cn} >{props.children}
        </div>
    )
}


function Logo({ title }: { title: string }) {
    const chars = title.split("")
    return (
        <div className="flex flex-row gap-[-3px]">
            {chars.map((c, i) => (
                <Char key={i} delay={1_000 + i * 200} char={c} />
            ))}
        </div>
    )
}

function Char({ char, delay }: { delay: number, char: string }) {
    const [ classes, setClasses ] = useState("motion-paused")
    useEffect(() => {
        setTimeout(() => setClasses("motion-running"), delay)
    })
    return (
        <div className={"text-[140px] uppercase font-bold motion-preset-shrink " + classes}>{char}</div>
    )
}