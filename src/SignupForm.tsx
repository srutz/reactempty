import { ComponentProps, FormEvent, ReactNode, useState } from "react"
import { TextInput } from "./TextInput"

export type SignupFormType = {
    firstname: string,
    lastname: string,
    specialNeeds: boolean
}
export function SignupForm() {
    console.log("render form")
    const [ form, setForm ] = useState({
        firstname: "", lastname: "", specialNeeds: false
    } as SignupFormType)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("send form", form)
    }
    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>

            <TextInput label="Firstname" id="x"
                placeholder="Firstname" value={form.firstname}
                onChange={(e) => { setForm({ ...form, firstname: e.target.value })}}
                errorMessage={form.lastname.length > 20 && `Echt langer Name`}>
            </TextInput>
            <TextInput label="lastname" id="y"
                placeholder="Lastname" value={form.lastname}
                onChange={(e) => { setForm({ ...form, lastname: e.target.value })}}>
            </TextInput>
            <div className="flex gap-4">
                <label id="z">Ich habe die AGB gelesen</label>
                <input type="checkbox" checked={form.specialNeeds} onChange={(e) => {
                    console.log(e.target.value)
                    setForm({ ...form, specialNeeds: e.target.checked})
                }}></input>
            </div>
            <button disabled={!form.specialNeeds} 
    className="self-center disabled:text-gray-300 disabled:bg-gray-400 
            bg-blue-500 hover:bg-blue-600 
            rounded px-4 py-1 text-white"
                type="submit">Submit</button>
        </form>
    )
}

export type LabelProps = {
    children: ReactNode,
} & ComponentProps<"label">

export function Label({ children, ...rest } : LabelProps) {
    return (
        <label {...rest}>{children}</label>
    )
}
