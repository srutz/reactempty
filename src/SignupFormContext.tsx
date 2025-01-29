import { createContext, ReactNode, useContext, useEffect, useState } from "react"

/* infrastructure for a signup form
 * eg: Model for the signup form
 *
 * in your view use useSignupForm()
 */

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

export const EMPTY_FORM = {
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
}

export function SignupFormContextProvider({ children }: { children: ReactNode}) {
    const [form, setForm ] = useState<SignupForm>(() => {
        const storedFormRaw = localStorage.getItem("signupform")
        const storeForm: SignupForm = storedFormRaw ? JSON.parse(storedFormRaw) : undefined
        const initialValue: SignupForm = {
            ...EMPTY_FORM,
            ...storeForm as any
        }

        return initialValue
    })
    useEffect(() => {
        console.log("form", form)
        localStorage.setItem("signupform", JSON.stringify(form, null, 4))
    }, [ form ])
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

