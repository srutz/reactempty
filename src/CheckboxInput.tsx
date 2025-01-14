import { ChangeEvent } from "react"


export type CheckboxInputProps = {
    id: string
    label: string
    value?: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function CheckboxInput({ id, value , onChange, label }: CheckboxInputProps) {
    return (
        <div className="flex gap-4">
            <label htmlFor={id}>{label}</label>
            <input id={id} type="checkbox" checked={value} onChange={onChange}></input>
        </div>
    )
}