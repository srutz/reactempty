import { ReactNode, useEffect, useState } from "react"

export function App() {
    const [count, setCount] = useState(1)
    //console.log("rendering app " + count)
    useEffect(() => {
        console.log("component mounted")
        const i = setInterval(() => {
            setCount((count) => count + 1)
        }, 250)
        return () => {
            console.log("component unmounted")
            clearInterval(i) 
        }
    }, [])


    // useEffect(callback, deps)
    // useEffect(callback, cleanup, deps)

    return (
        <div className="bg-gray-200 w-full h-full flex flex-col gap-4 items-center">
            <Box>
                <BigText text={count.toString()}></BigText>
            </Box>
        </div>
    )
}

function BigText(props: { text: string }) {
    //console.log("rendering bigtext: text=" + props.text)
    return (
        <div className="text-4xl">{props.text}</div>
    )
}

function Box(props: { children: ReactNode }) {
    const [ open, setOpen ] = useState(true)
    //console.log("rendering box: open=" + open)
    const handleClick = () => {
        setOpen(!open)
    }
    const cn = "motion-preset-pop bg-white border border-gray-300 shadow-xl rounded-lg m-2 p-4"
        + " flex flex-col w-[300px]"
    return (
        <div className={cn} >
            <div onClick={handleClick} className="select-none cursor-pointer self-end">X</div>
            {open && props.children}
        </div>
    )
}