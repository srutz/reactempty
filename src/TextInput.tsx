import { ChangeEvent } from "react"
import { Label } from "./SignupForm"

export type TextInputProps = {
    id: string
    label: string
    value: string
    required?: boolean
    placeholder: string
    infoMessage?: string | boolean
    errorMessage?: string | boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function TextInput(props: TextInputProps) {
    const { 
        id, value, onChange, 
        label, placeholder,
        required,
        infoMessage, errorMessage } = props
    return (<div className="flex flex-col mb-2">
        <Label htmlFor={id}>{label}{required && <RequiredIndicator/>}</Label>
        <input id={id} placeholder={placeholder} value={value} onChange={onChange}></input>
        {infoMessage && (<div className="text-gray-600 text-sm">{infoMessage}</div>)}
        {errorMessage && (<div className="text-red-700 text-sm">{errorMessage}</div>)}
    </div>)
}

export const RequiredIndicator: React.FC = () => {
    return (
        <span className="ml-1 text-sm font-bold text-red-700">*</span>
    )
}