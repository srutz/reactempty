import { ReactNode, useState } from "react"

export function Registration() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    console.log("rerender form", lastname, firstname)
    return (
        <form className="m-4 p-4 grid grid-cols-[auto_1fr] gap-2 items-baseline">
            <InputField id="i1" label="Firstname" value={firstname} onChange={
                (value) => setFirstname(value)
            } />
            <InputField id="i2" label="Lastname" value={lastname} onChange={
                (value) => setLastname(value)
            } />
        </form>
    )
}
export function ErrorMessage(props: { children: ReactNode}) {
    return (<div className="text-sm text-red-600">{props.children}</div>)
}

export type InputFieldProps = {
    id: string
    label: string
    errorMessage?: string
    value: string
    onChange: (v: string) => void
}
export function InputField(props: InputFieldProps) {
    const { id, label, errorMessage, value, onChange } = props
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <div className="flex flex-col">
                <input id={id} value={value} onChange={(event) => {
                    onChange(event.target.value)
                }}/>
                {errorMessage && (<ErrorMessage>{errorMessage}</ErrorMessage>)}
            </div>
        </>
    )
}
