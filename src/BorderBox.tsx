import { ReactNode } from "react";

export function BorderBox({ children } : { children: ReactNode }) {
    return (
        <div className="w-[400px] border border-gray-300 p-4 m-4 shadow-lg ">
            {children}
        </div>
    )
}