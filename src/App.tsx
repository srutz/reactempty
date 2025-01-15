import { ReactNode, useState } from "react"

export function App() {
    return ( 
        <div className="text-3xl">
            <Box>weoweofijeoifj</Box>
        </div>
    )}


function Box(props : { children?: ReactNode}) {
    return (
        <div className="m-4 p-4 rounded-lg shadow-xl
            border border-gray-300 cursor-pointer select-none
            hover:underline
            bg-white flex flex-col">
            {props.children}
        </div>
    )
}
