import { ReactNode } from "react";

export function DrawArea({ children } : { children: ReactNode }) {

    return (
        <div className="flex-1 grow w-full relative overflow-hidden bg-white">
            {children}
        </div>
    )
}

