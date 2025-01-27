import { ReactNode } from "react"
import { MdStar } from "react-icons/md"

export function App() {
    return (
        <div className="motion-preset-slide-left">
            <Box heading="News of the day" star>
                <Greetings />
                <Greetings />
            </Box>
            <Box heading="News of the week" ><Greetings /></Box>
        </div>
    )
}

function Greetings() { return <div>Hallo zusammen</div> }

type BoxProps = { heading: string, star?: boolean, children: ReactNode }


function Box({ heading, star, children }: BoxProps) {
    return (
        <div className="bg-gray-300 shadow-xl rounded-lg p-4 m-4 flex flex-col gap-2">
            <div className="text-sm text-gray-600 flex justify-between items-center border-b border-gray-400 pb-2">
                <span>{heading}</span>
                {star && <MdStar />}
            </div>
            <div className="mt-2">
                {children}
            </div>
        </div>
    )
}

