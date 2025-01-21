import { FC, ReactNode, useEffect, useState } from "react"

export function App() {
    return (
        <Box><Logo word="hansjürgen"></Logo>
        </Box>
    )
}

const Box: FC<{ children: ReactNode }> = (props) => {
    return (
        <div className="bg-gray-200 m-4 p-4 
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
        }, 250 + (props.index * 200))
    }, [])
    return (<div 
        className={`${motion} motion-preset-shrink uppercase`}>
            {props.letter}</div>)
}

