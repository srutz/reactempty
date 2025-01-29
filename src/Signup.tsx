import { FormEvent, HTMLInputTypeAttribute, ReactNode, useState } from "react"
import { SignupForm, SignupFormContext, useSignupForm } from "./SignupFormContext"


export function Box({children }: { children: ReactNode}) {
    return (<div className="p-4 m-4 shadow-xl bg-white">{children}</div>)
}

export function ErrorText({children}: { children: ReactNode}) {
    return (<div className="text-sm text-red-600">{children}</div>)
}




export function Signup() {
    const { form, setForm } = useSignupForm()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(form)
    }
    return (
    <Box>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
            <TextInput label="Vorname"
                value={form.firstname} 
                errorMsg={
                    form.firstname.length > 0 && form.firstname.length < 5 && (
                        <ErrorText>Vorname zu kurz</ErrorText>
                    )
                }
                onChange={(v) => setForm({...form, firstname: v})}></TextInput>
            <TextInput label="Nachname"
                value={form.lastname} 
                onChange={(v) => setForm({...form, lastname: v})}></TextInput>
            <TextInput label="Straße"
                value={form.street} 
                onChange={(v) => setForm({...form, street: v})}></TextInput>
            <TextInput label="Stadt"
                value={form.city} 
                onChange={(v) => setForm({...form, city: v})}></TextInput>
            <TextInput label="Email"
                value={form.email} 
                type="email"
                onChange={(v) => setForm({...form, email: v})}></TextInput>
            <button className="self-center" type="submit">Submit</button>
        </form>
    </Box>
    )
}

type TextInputProps = {
    label: string, value: string, type?: HTMLInputTypeAttribute,
    errorMsg?: ReactNode,
    onChange: (value: string) => void
}

export function TextInput({ label, value, type, onChange, errorMsg }: TextInputProps) {
    return (
        <div className="grid grid-cols-[auto,1fr] gap-x-2 items-baseline mb-2">
            <label className="w-32" htmlFor={label}>{label}</label>
            <input type={type}
                id={label} value={value} onChange={(e) => onChange(e.target.value)}/>
            <div></div>
            {errorMsg}
        </div>
    )
}