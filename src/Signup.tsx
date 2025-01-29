import { Fragment, ReactNode, useState } from "react"

type SignupForm = {
    firstname: string
    lastname: string
    email: string
}

export function Box({children }: { children: ReactNode}) {
    return (<div className="p-4 m-4 shadow-xl bg-white">{children}</div>)
}

export function Signup() {
    const [form, setForm ] = useState<SignupForm>({
        firstname: "",
        lastname: "",
        email: "",
    })
    return (
    <Box>
        <form className="flex flex-col gap-2">
            <TextInput label="Vorname"
                value={form.firstname} 
                onChange={(v) => setForm({...form, firstname: v})}></TextInput>
            <TextInput label="Nachname"
                value={form.lastname} 
                onChange={(v) => setForm({...form, lastname: v})}></TextInput>
        </form>
    </Box>
    )
}

type TextInputProps = {
    label: string
    value: string
    onChange: (value: string) => void
}

export function TextInput({ label, value, onChange }: TextInputProps) {
    return (
        <div className="flex gap-2 items-baseline">
            <label className="w-32" htmlFor={label}>{label}</label>
            <input id={label} value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}