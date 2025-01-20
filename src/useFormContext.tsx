import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"

// type of our form
export type SignupFormType = {
    firstname: string
    lastname: string
    specialNeeds: boolean
    city: string
    comment: string
}

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


