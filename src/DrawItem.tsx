import { CSSProperties, ReactNode, useRef, useState } from "react";

export type Point = {
    x: number
    y: number
}

export type DrawItemProps = { 
    position: Point, angle: number, children: ReactNode
}

export function DrawItem({ children, position: initialPosition, angle: initialAngle} : DrawItemProps) {
    const [position, setPosition] = useState<Point>(initialPosition)
    const [angle, setAngle] = useState(initialAngle)
    const draggingRef = useRef(false)
    const rotatingRef = useRef(false)
    const divRef = useRef<HTMLDivElement>(null)
    const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

    const style = {
        left: position.x + "px",
        top: position.y + "px",
        transform: "rotate(" + angle + "deg)",
    } satisfies CSSProperties

    const getAngle = (x: number, y: number) => {
        const center = centerRef.current
        return Math.atan2(y - center.y, x - center.x) * (180 / Math.PI)
    }

    const updateCenter = () => {
        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect()
            centerRef.current = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            }
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.ctrlKey) {
            rotatingRef.current = true
            draggingRef.current = false
            updateCenter()
            const startAngle = getAngle(e.clientX, e.clientY)
            const startRotation = angle

            const handleMouseMove = (e: MouseEvent) => {
                if (rotatingRef.current) {
                    const currentAngle = getAngle(e.clientX, e.clientY)
                    const newAngle = startRotation + (currentAngle - startAngle)
                    setAngle(newAngle)
                }
            }

            const handleMouseUp = () => {
                rotatingRef.current = false
                draggingRef.current = false
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
            }

            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        } else {
            rotatingRef.current = false
            draggingRef.current = true
            const startPosition = { x: e.clientX - position.x, y: e.clientY - position.y }

            const handleMouseMove = (e: MouseEvent) => {
                if (draggingRef.current) {
                    const newPosition = { x: e.clientX - startPosition.x, y: e.clientY - startPosition.y }
                    setPosition(newPosition)
                }
            }
            const handleMouseUp = () => {
                rotatingRef.current = false
                draggingRef.current = false
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
            }
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }
    }
    return (
        <div ref={divRef} style={style} className={"absolute flex flex-col gap-2"} onMouseDown={handleMouseDown}>
            {children}
        </div>
    )
}


