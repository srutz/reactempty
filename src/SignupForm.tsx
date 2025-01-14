import { ComponentProps, FormEvent, ReactNode, useState } from "react"

export type SignupFormType = {
    firstname: string,
    lastname: string,
}
export function SignupForm() {
    console.log("render form")
    const [ form, setForm ] = useState({
        firstname: "", lastname: "",
    } as SignupFormType)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("send form", form)
    }
    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <Label htmlFor="firstname">Firstname</Label>
            <input id="firstname" placeholder="Firstname" 
                value={form.firstname}
                onChange={(e) => { 
                    setForm({ ...form, firstname: e.target.value })
                 }}
                ></input>
            {form.firstname.length > 20 
                ? ( <div className="text-red-600 text-xs">Echt langer Name</div>)
                : ( <div className="text-gray-400 text-xs">Noch {20 - form.firstname.length} Zeichen</div>)
            }
            <Label htmlFor="lastname">Lastname</Label>
            <input id="lastname" placeholder="Lastname" 
                value={form.lastname}
                onChange={(e) => { 
                    setForm({ ...form, lastname: e.target.value })
                 }}
                ></input>
            <button type="submit">Submit</button>
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
