import { ComponentProps, FormEvent, ReactNode } from "react"

export function SignupForm() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("submitting form")
    }
    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <Label htmlFor="firstname">Firstname</Label>
            <input id="firstname"></input>
            <Label htmlFor="lastname">Lastname</Label>
            <input id="lastname"></input>
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
