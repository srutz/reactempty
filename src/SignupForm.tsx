import { ComponentProps, FormEvent, ReactNode, useState } from "react"
import { TextInput } from "./TextInput"
import { CheckboxInput } from "./CheckboxInput"

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
            <CheckboxInput id="x1" label="Ich habe die AGBs verstanden"
                value={form.specialNeeds} 
                onChange={(e) => setForm({...form, specialNeeds: e.target.checked})} />
            <button disabled={!form.specialNeeds} 
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
