import { useState } from "react";
import { DrawArea } from "./DrawArea";
import { DrawItem } from "./DrawItem";
import { MenuBar } from "./MenuBar";
import { Instructions } from "./Instructions";
import { Blue, Green, Pink, Yellow } from "./Shapes";
import { useWindowSize } from "./WIndowSize";

export function App() {
    const size = useWindowSize()
    const [version, setVersion] = useState(1)
    const [showInstructions, setShowInstructions] = useState(false)
    const [angles, setAngles] = useState([17, 56, -76, 83])
    const [positions, setPositions] = useState(randomPositions(size, 4))
    const handleAction = (id: string) => {
        if (id === "instruction") {
            setShowInstructions(!showInstructions)
        } else if (id === "randomize") {
            setAngles([
                Math.random() * 360,
                Math.random() * 360,
                Math.random() * 360,
                Math.random() * 360,
            ])
            setPositions(randomPositions(size, 4))
            setVersion(version + 1)
        } else if (id === "solve") {
            setAngles([ 0 , 0, 0, 0])
            setPositions([ 
                { x: 3.465, y: 4.273 }, { x: 53.278, y: 4.273 }, { x: 173.544, y: 4.273 }, { x: 88.803, y: 89.309 }
            ].map(p => ({ x: p.x + 100, y: p.y + 100 })))
            setVersion(version + 1)
        }
    }
    return (
        <div className="flex flex-col h-full">
            <MenuBar onAction={handleAction}></MenuBar>
            <div className="flex-1 flex flex-row">
                <DrawArea>
                    <DrawItem key={100 * version} position={positions[0]} angle={angles[0]}>
                        <Green></Green>
                    </DrawItem>
                    <DrawItem key={100 * version + 1} position={positions[1]} angle={angles[1]}>
                        <Yellow></Yellow>
                    </DrawItem>
                    <DrawItem key={100 * version + 2} position={positions[2]} angle={angles[2]}>
                        <Pink></Pink>
                    </DrawItem>
                    <DrawItem key={100 * version + 3} position={positions[3]} angle={angles[3]}>
                        <Blue></Blue>
                    </DrawItem>
                </DrawArea>
                <Instructions width={showInstructions ? "300px" : "0px"}></Instructions>
            </div>
        </div>
    )
}


function randomPositions(size: { width: number, height: number }, count: number) {
    const x0 = size.width / 2
    const y0 = (size.height - 160) / 2
    const xrange = size.width / 4
    const yrange = size.height/ 4
    return Array.from({ length: count }, () => ({
        x: x0 - xrange/2 + Math.random() * xrange,
        y: y0 - yrange/2 + Math.random() * yrange,
    }))
}
