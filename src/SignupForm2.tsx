import { FormEvent } from "react";
import { CheckboxInput } from "./CheckboxInput";
import { TextInput } from "./TextInput";
import { useFormContext } from "./useFormContext";

export function SignupForm2() {
    const { form, setForm } = useFormContext()
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("send form", form)
    }

    return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>Bitte überprüfen</div>
        <div className="grid grid-cols-[auto,1fr] gap-x-4">
            <div className="text-gray-500">Vorname</div><div>{form.firstname}</div>
            <div className="text-gray-500">Nachname</div><div>{form.lastname}</div>
        </div>
        <TextInput id="comment" placeholder="Kommentar"
                value={form.comment} label="Kommentar"
                errorMessage={form.comment.length > 10 && "Bitte fass dich kurz!"}
                onChange={(e) => setForm({...form, comment: e.target.value})}
            ></TextInput>
        <CheckboxInput id="x1" label="Ich habe die AGBs verstanden"
            value={form.specialNeeds} 
            onChange={(e) => setForm({...form, specialNeeds: e.target.checked})} />
        <button disabled={!form.specialNeeds} 
            type="submit">Submit</button>

    </form>)
}