import { FormEvent, useEffect } from "react";
import { CheckboxInput } from "./CheckboxInput";
import { useFormContext } from "./SignupForm";

export function SignupForm2() {
    const { form, setForm } = useFormContext()
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("send form", form)
    }

    return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>Bitte überprüfen</div>        
        <div>Vorname {form.firstname}</div>
        <div>Nachnach {form.lastname}</div>

        <CheckboxInput id="x1" label="Ich habe die AGBs verstanden"
            value={form.specialNeeds} 
            onChange={(e) => setForm({...form, specialNeeds: e.target.checked})} />
        <button disabled={!form.specialNeeds} 
            type="submit">Submit</button>

    </form>)
}