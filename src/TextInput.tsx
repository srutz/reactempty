import { ChangeEvent, ComponentProps } from "react"
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

export const TextInput: React.FC<TextInputProps> = (props) => {
    const { 
        id, value, onChange, 
        label, placeholder,
        required,
        infoMessage, errorMessage } = props
    return (<div className="flex flex-col mb-2">
        <Label htmlFor={id}>{label}{required && (
            <RequiredIndicator xxl
                onClick={() => alert("hi")}
                aria-description="required field"
                title="This field is required"/>
        )}</Label>
        <input id={id} placeholder={placeholder} value={value} onChange={onChange}></input>
        {infoMessage && (<div className="text-gray-600 text-sm">{infoMessage}</div>)}
        {errorMessage && (<div className="text-red-700 text-sm">{errorMessage}</div>)}
    </div>)
}

export type RequiredIndicatorProps = {
    xxl?: boolean
} & ComponentProps<"span">

export const RequiredIndicator: React.FC<RequiredIndicatorProps> = (props) => {
    const { xxl, ...rest } = props
    return (
        <span {...rest} className={`ml-1 text-sm 
            font-bold text-red-700 ` + (xxl ? "text-2xl":"")} >
            *
        </span>
    )
}