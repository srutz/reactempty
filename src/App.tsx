import { ReactNode } from "react";

export function App() {
    return (
        <div className="text-3xl">
            <Box extra="abc"></Box>
            <Box extra="defg"></Box>
            <Box></Box>
        </div>
    )}


function Box(props : { extra?: string}) {
    return (
        <div className="m-4 p-4 rounded-lg shadow-xl
            border border-gray-300
            bg-white flex flex-col motion-preset-slide">
                {props.extra}
        </div>

    )
}
