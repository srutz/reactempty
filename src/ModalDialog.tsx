import { useState } from "react";

export type WidthStyle = "wide" | "normal" | "fit"

/*
 * ModalDialog component, which renders a title and children as content
 * the parent component has to control the visibility of the modal
 * a callback function onClose is called when the close button is clicked
 */
export function ModalDialog({ show, title, onClose, children, width = "normal" }: {
    show: boolean
    title: string
    width?: WidthStyle
    onClose: () => void
    children: React.ReactNode
}) {
    const [closing, setClosing] = useState(false)
    const handleClosing = () => {
        setClosing(true)
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 250)
    }
    if (!show) {
        return null
    }

    return (
        <ModalBackdrop opening={!closing}>
            <DialogWindow width={width}>
                <ModalTitle title={title} onClose={handleClosing} />
                <div className="p-4 ">
                    {children}
                </div>
                <DialogButtonBar>
                    <button onClick={handleClosing} className="button">
                        Schließen
                    </button>
                </DialogButtonBar>
            </DialogWindow>
        </ModalBackdrop>
    )
}

export function ModalBackdrop({ opening, children }: { opening?: boolean; children?: React.ReactNode }) {
    return <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  `}>{children}</div>
}


export function ModalTitle({ title, onClose }: { title: string, onClose: () => void }) {
    return (
        <div className="flex justify-between items-center p-4 border-b" >
            <h2 className="text-xl text-black font-semibold">{title}</h2>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800">
                &times;
            </button>
        </div>)
}


export function DialogWindow({ width, children }: { width?: WidthStyle, children?: React.ReactNode }) {
    const style = width == "wide" 
        ? { width: "calc(min(1400px,90vw))" } 
        : width == "normal" ? { width: "calc(min(800px,60vw))" } : { width: "auto" }
    return <div className="bg-white max-h-[90%] rounded-lg shadow-lg m-8 flex flex-col" style={style}>{children}</div>
}


export function DialogButtonBar({ children }: { children?: React.ReactNode }) {
    return <div className="flex justify-end p-4 border-t gap-4">{children}</div>
}
