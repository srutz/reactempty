import { FC, CSSProperties, useState, ReactNode } from "react"

export function App() {
    const [visible,setVisible] = useState(true)
    const toggle = () => {
        setVisible(!visible)
    }
    return (
        <div className="p-4">
            <button onClick={toggle} 
                className="bg-blue-500 text-white py-2 px-4">Toggle</button>
            <OpacityPanel visible={visible} >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </OpacityPanel>
        </div>
    )
}

const OpacityPanel: FC<{ visible?: boolean, children?: ReactNode}> = (props) => {
    const { visible, children } = props
    const styles: CSSProperties = {
        opacity: visible ? 1 : 0,
        transition: "all 500ms",
        animationDelay: "1500ms",
    } 
    return (<div style={styles}>{children}</div>)
}

