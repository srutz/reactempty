import { FC, ReactNode, useEffect, useState } from "react"

export function App() {
    const [ key, setKey ] = useState(100)
    const handleRestart = () => {
        setKey(key + 1)
    }
    return (
        <div className="flex flex-col gap-1 items-center">
            <Box key={key} >
                <Logo word="Frankfurt"></Logo>
            </Box>
            <button onClick={handleRestart}>Restart Animation</button>
        </div>
    )
}

const Box: FC<{ children: ReactNode }> = (props) => {
    return (
        <div className="bg-gray-200 m-4 px-4 py-2 
            rounded-xl
            border border-gray-300 shadow-xl
            flex justify-center">
            {props.children}</div>)
}

const Logo: FC<{ word: string }> = (props) => {
    return (<div className="flex">
        {props.word.split("").map((c, index) => (
            <Letter letter={c} index={index} key={index}></Letter>
        ))}
    </div>)
}

const Letter: FC<{ letter: string, index: number }> = (props) => {
    const [ motion, setMotion ] = useState("motion-paused")
    console.log("render", props.letter)
    useEffect(() => {
        setTimeout(() => {
            setMotion("motion-running")
        }, 250 + (props.index * 150))
    }, [])
    return (<div 
        className={`${motion} motion-preset-shrink text-2xl uppercase`}>
            {props.letter}</div>)
}

