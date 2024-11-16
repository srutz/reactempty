import { CSSProperties, ReactNode, useEffect, useRef } from "react";

export function Svg({ children, title }: { title: string, children: ReactNode }) {
    const svgRef = useRef<SVGSVGElement>(null)
    useEffect(() => {
        if (svgRef.current) {
            computeViewBox(svgRef.current, title)
        }
    }, [svgRef])

    const style = {
        width: "100%",
        height: "100%",
    } satisfies CSSProperties
    return (
        <div className="relative events-none">
            {false && <div className="absolute top-0 left-0 bg-white text-black p-2">{title}</div>}
            <svg ref={svgRef} style={style} className="relative">
                {children}
            </svg>
        </div>
    )
}

function computeViewBox(svg: SVGSVGElement, title: string) {
    const bbox = svg.getBBox()
    const viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(" ")
    svg.setAttribute("viewBox", viewBox)
    const scaleX = bbox.width / 300
    const scaleY = bbox.height / 150
    svg.setAttribute("width", (300 * scaleX) + "px")
    svg.setAttribute("height", (150 * scaleY) + "px")
}

/*
function extractScalingFactorsFromSvgTransform(matrix: number[]) {
    const a = matrix[0]
    const b = matrix[1]
    const c = matrix[2]
    const d = matrix[3]
    const scaleX = Math.sqrt(a * a + b * b)
    const scaleY = Math.sqrt(c * c + d * d)
    return { scaleX, scaleY }
}
*/
