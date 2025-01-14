import { ChangeEvent } from "react"
import { Label } from "./SignupForm"

export type TextInputProps = {
    id: string
    label: string
    value: string
    placeholder: string
    infoMessage?: string | boolean
    errorMessage?: string | boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function TextInput({ 
        id, value, onChange, 
        label, placeholder, 
        infoMessage, errorMessage }: TextInputProps) {
    return (<div className="flex flex-col mb-2">
        <Label htmlFor={id}>{label}</Label>
        <input id={id} placeholder={placeholder} value={value} onChange={onChange}></input>
        {infoMessage && (<div className="text-gray-600 text-sm">{infoMessage}</div>)}
        {errorMessage && (<div className="text-red-300 text-sm">{errorMessage}</div>)}
    </div>)
}