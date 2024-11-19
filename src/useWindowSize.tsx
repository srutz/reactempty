import { useEffect, useState } from "react"

export type Size = { width: number, height: number }

export function useWindowSize() {
    // pattern... effect der Dinge mitbekommt und state-setzt
    const [size, setSize] = useState<Size>({ width: window.innerWidth, height: innerHeight })
    // pattern: Listener an- und abmelden
    useEffect(() => {
        const l = () => {
            // größe hat sich geändert
            setSize({ width: innerWidth, height: innerHeight })
        }
        window.addEventListener("resize", l)
        return () => {
            window.removeEventListener("resize", l)
        }
    }, [  ])
    // ende des größen-überwachung
    return size
}

export function useInterval(callback: () => void, intervalMs: number) {
    useEffect(() => {
        const i = setInterval(callback, intervalMs)
        return () => clearInterval(i)
    }, [])
}