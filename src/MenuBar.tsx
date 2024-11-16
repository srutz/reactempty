import { ComponentPropsWithoutRef, ReactNode } from "react"

export type Action = (id: string) => void

export function MenuBar({ onAction} : { onAction: Action }) {
    return (
        <div className="pl-4 pr-8 py-2 h-[52px] bg-white border-b border-gray-300 flex flex-row gap-2 items-center justify-between">
            <div className="text-black font-bold select-none">❱❱❱ T-Shape Puzzle</div>
            <div className="flex flex-row gap-2">
            <MenuLink onClick={() => onAction("randomize")}>Randomize</MenuLink>
            <MenuLink onClick={() => onAction("instruction")}>Toggle Instructions</MenuLink>
            </div>
        </div>
    )
}

function MenuLink({ children, ...props }: { children: ReactNode } & ComponentPropsWithoutRef<'div'>) {
    return (
        <div className="text-sm text-gray-700 hover:underline cursor-pointer select-none" {...props}>{children}</div>
    )
}