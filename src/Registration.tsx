import { HTMLInputTypeAttribute, ReactNode, useState } from "react"

type MyHTMLInputTypeAttribute = HTMLInputTypeAttribute


export function Registration() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    console.log("rerender form", lastname, firstname)
    return (
        <form className="m-4 p-4 grid grid-cols-[auto_1fr] gap-2 items-baseline">
            <InputField id="i1" label="Firstname" value={firstname} onChange={(v) => setFirstname(v)} />
            <InputField id="i2" label="Lastname" value={lastname} onChange={(v) => setLastname(v)} />
            <InputField type="email" id="i3" label="E-Mail" value={email} onChange={(v) => setEmail(v)} 
                errorMessage={!email.endsWith(".de") && "Only german emails allowed."} />
        </form>
    )
}
export function ErrorMessage(props: { children: ReactNode}) {
    return (<div className="text-sm text-red-600">{props.children}</div>)
}

export type InputFieldProps = {
    id: string
    label: string
    errorMessage?: string | false
    value: string
    type?: MyHTMLInputTypeAttribute
    onChange: (v: string) => void
}
export function InputField(props: InputFieldProps) {
    const { id, label, errorMessage, value, type, onChange } = props
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <div className="flex flex-col">
                <input id={id} value={value} type={type} onChange={(event) => {
                    onChange(event.target.value)
                }}/>
                {errorMessage && (<ErrorMessage>{errorMessage}</ErrorMessage>)}
            </div>
        </>
    )
}
