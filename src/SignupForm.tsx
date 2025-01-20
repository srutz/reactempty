import { ComponentProps, createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { TextInput } from "./TextInput"

// Typ des Contexts
export type FormContextType = {
    form: SignupFormType,
    setForm: Dispatch<SetStateAction<SignupFormType>>
}

// Der Context selbst
export const FormContext = createContext<FormContextType | null>(null)

// Typ des Providers
export type FormContextProviderProps = { children: ReactNode }

// React Component welche den Zustand bereitstellt. Weit oben in der Hierachie
export function FormContextProvider({ children }: FormContextProviderProps) {
    const [form, setForm] = useState(() => {
        const raw = localStorage.getItem("fs")
        const defaultValue = {
            firstname: "",
            lastname: "",
            specialNeeds: false, 
            city: "Gelsenkirchen",
            comment: ""
        } satisfies SignupFormType
        if (raw) {
            const v = JSON.parse(raw) as SignupFormType
            return { ...defaultValue, ...v }  ///kombiniere defaultValue und v
        }
        return defaultValue
    })

    useEffect(() => {
        // on mount und wenn sich form geändert hat
        localStorage.setItem("fs", JSON.stringify(form))
    }, [form])
    return (
        <FormContext.Provider value={{ form, setForm }}>
            {children}
        </FormContext.Provider>
    )
}

export function useFormContext() {
    const value = useContext(FormContext)
    if (!value) {
        throw "formcontext not defined"
    }
    return value
}


export type SignupFormType = {
    firstname: string
    lastname: string
    specialNeeds: boolean
    city: string
    comment: string
}

export function SignupForm() {
    console.log("render form")
    const { form, setForm } = useFormContext()

    return (
        <div className="flex flex-col">
            <TextInput label="Firstname" id="x"
                placeholder="Firstname" value={form.firstname}
                onChange={(e) => { setForm({ ...form, firstname: e.target.value }) }}
                errorMessage={form.firstname.length > 20 && `Echt langer Name`}>
            </TextInput>
            <TextInput label="lastname" id="y"
                placeholder="Lastname" value={form.lastname}
                onChange={(e) => { setForm({ ...form, lastname: e.target.value }) }}>
            </TextInput>
            <TextInput label="Stadt" id="city"
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
