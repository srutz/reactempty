import { ModalBackdrop } from "./ModalDialog"


export function LoadingIndicator() {
    return (
        <ModalBackdrop opening >
            <div className="w-full h-full flex flex-col gap-4 bg-black">
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white bg-opacity-90 flex flex-col gap-2 justify-center items-center z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    <div className="">Loading data</div>
                </div>
            </div>
        </ModalBackdrop>
    )
}

