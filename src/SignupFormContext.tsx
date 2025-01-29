import { createContext, ReactNode, useContext, useState } from "react"

/* infrastructure for a signup form */

export type SignupForm = {
    firstname: string
    lastname: string
    street: string
    city: string
    email: string
}

export type SignupFormContextType = { 
    form: SignupForm,
    setForm: (form: SignupForm) => void
}
export const SignupFormContext = createContext<SignupFormContextType|null >(null)

export function SignupFormContextProvider({ children }: { children: ReactNode}) {
    const [form, setForm ] = useState<SignupForm>({
        firstname: "",
        lastname: "",
        email: "",
        street: "",
        city: "",
    })
    return (
        <SignupFormContext.Provider value={{ form, setForm }}>
            {children}
        </SignupFormContext.Provider>
    )
}

/* hook to include to use the signup form */
export function useSignupForm() {
    const c = useContext(SignupFormContext)
    if (!c) throw "context not defined"
    return c
}

