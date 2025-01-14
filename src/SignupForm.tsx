import { ComponentProps, FormEvent, ReactNode, useState } from "react"

export function SignupForm() {
    console.log("render form")

    const [ firstname, setFirstname ] = useState("")
    const [ lastname, setLastname ] = useState("")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("submitting form", firstname, lastname)
    }
    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <Label htmlFor="firstname">Firstname</Label>
            <input id="firstname" placeholder="Firstname" 
                value={firstname}
                onChange={(e) => { setFirstname(e.target.value) }}
                ></input>
            {firstname.length > 20 
                ? ( <div className="text-red-600 text-xs">Echt langer Name</div>)
                : ( <div className="text-gray-400 text-xs">
                    Noch {20 - firstname.length} Zeichen</div>)
            }
            <Label htmlFor="lastname">Lastname</Label>
            <input id="lastname" placeholder="Lastname" 
                value={lastname}
                onChange={(e) => { setLastname(e.target.value) }}
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
