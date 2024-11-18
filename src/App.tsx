import { ReactNode } from "react"

export function App() {
    return (
        <div className="bg-gray-200 w-full h-full flex flex-col gap-4 items-center">
            <Box>
                <BigText text="hello"></BigText>
                <BigText text="again"></BigText>
                <div>Die Woche schneit es wahrscheinlich</div>
            </Box>
            <Box>
                <BigText text="bonjour"></BigText>
            </Box>
        </div>
    )
}

function BigText(props: { text: string }) {
    return (
        <div className="text-4xl">{props.text}</div>
    )
}

function Box(props: { children: ReactNode }) {
    return (
        <div className="motion-preset-pop bg-white border border-gray-300 shadow-xl rounded-lg m-2 p-4">
            {props.children}
        </div>
    )
}