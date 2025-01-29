import { ReactNode, useState } from "react"

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
            <form>
                <label>Vorname</label>
                <input value={form.firstname} onChange={
                    (e) => setForm({ ... form, firstname: e.target.value })
                }></input>
                {form.firstname == "Fritz" && (
                    <div>Blöder Name</div>
                )}
            </form>
        </Box>
    )

}