import { CSSProperties } from "react"

export function Instructions({ width }: { width: string }) {
    const style = {
        width: width
    } satisfies CSSProperties
    return (
        <div className="transition-all border-l border-gray-300 bg-indigo-100 flex flex-col items-center justify-start overflow-hidden"
            style={style}>
            <div className="py-8 w-[300px] flex-1 flex flex-col items-center">
                <h1 className="text-2xl font-bold">Instructions</h1>
                <ul className="list-disc pl-8">
                    <li>Drag the shapes around</li>
                    <li>Rotate the shapes by holding Ctrl while dragging</li>
                    <li>Arrange items to look like this:</li>
                </ul>
                <div className="text-[160px] font-bold">T</div>
            </div>

        </div>
    )
}