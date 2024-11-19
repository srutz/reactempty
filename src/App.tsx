import { ReactNode, useEffect, useState } from "react"
import { useInterval, useWindowSize } from "./useWindowSize"



export function App() {
    const size = useWindowSize()
    const [key, setKey] = useState(1)

    // restart animation periodically
    //useInterval(() => setKey((key) => key + 1), 10_000)


    if (size.height < 200) return <div>Nicht hoch genug</div>
    return (
        <div className="bg-gray-200 w-full h-full flex flex-col gap-4 items-center">
            <HeaderBar></HeaderBar>
            <Box key={key} >
                <Logo title="Willkommen"></Logo>
            </Box>
            <button onClick={() => setKey(key + 1)}>Restart Animation</button>
            <div>Fenster: {size.width} x {size.height}</div>
        </div>
    )
}

function HeaderBar() {
    const size = useWindowSize()
    return (
        <div className="w-full h-16 bg-gray-100 border-b border-gray-300 flex flex-row gap-2 p-8 items-center">
            HeaderBar: {size.width} x { size.height}
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
    }, [])
    return (
        <div className={"text-[80px] uppercase font-bold motion-preset-shrink " + classes}>{char}</div>
    )
}