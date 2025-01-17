import { ReactNode, useState } from "react"

export function Registration() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    console.log("rerender form", lastname, firstname)
    return (
        <form className="m-4 p-4 grid grid-cols-[auto_1fr] gap-2 items-baseline">
            <label htmlFor="i1">Firstname</label>
            <div className="flex flex-col">
                <input id="i1" value={firstname} onChange={(event) => { 
                    setFirstname(event.target.value)
                }}/>
                {firstname.length >= 1 && firstname.length < 3 && (
                    <ErrorMessage>Firstname should be longer</ErrorMessage>
                )}
            </div>
            <label htmlFor="i2">Lastname</label>
            <div className="flex flex-col">
                <input id="i2" value={lastname} onChange={(event) => { 
                    setLastname(event.target.value)
                }}/>
                {lastname.length >= 1 && lastname.length < 6 && (
                    <ErrorMessage>Last should be longer, yours is 
                        only {lastname.length} characters long.</ErrorMessage>
                )}
            </div>
        </form>
    )
}
export function ErrorMessage(props: { children: ReactNode}) {
    return (<div className="text-sm text-red-600">{props.children}</div>)
}