import { ComponentProps, ReactNode } from "react"
import { TextInput } from "./TextInput"
import { useFormContext } from "./useFormContext"



export function SignupForm() {
    console.log("render form")
    const { form, setForm } = useFormContext()

    return (
        <div className="flex flex-col">
            <TextInput label="Firstname" id="x"
                required
                placeholder="Firstname" value={form.firstname}
                onChange={(e) => { setForm({ ...form, firstname: e.target.value }) }}
                errorMessage={form.firstname.length > 20 && `Echt langer Name`}>
            </TextInput>
            <TextInput label="lastname" id="y"
                required
                placeholder="Lastname" value={form.lastname}
                onChange={(e) => { setForm({ ...form, lastname: e.target.value }) }}>
            </TextInput>
            <TextInput label="Stadt" id="city"
                required
                placeholder="Stadt" value={form.city}
                onChange={(e) => { setForm({ ...form, city: e.target.value }) }}>
            </TextInput>
        </div>
    )
}

export type LabelProps = {
    children: ReactNode,
} & ComponentProps<"label">

export function Label({ children, ...rest }: LabelProps) {
    return (
        <label {...rest}>{children}</label>
    )
}
