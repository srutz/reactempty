import { FC } from "react"

export function App() {
    const toggle = () => {
    }
    return (
        <div className="p-4">
            <button onClick={toggle} 
                className="bg-blue-500 text-white py-2 px-4">Toggle</button>
            <Lorem></Lorem>
        </div>
    )
}

//export function Lorem() {
const Lorem: FC = () => {
    return (<div>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
    </div>)
}

