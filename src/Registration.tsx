import { useState } from "react"

export function Registration() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    return (
        <form className="m-4 p-4 grid grid-cols-[auto_1fr] gap-2 items-baseline">
            <label htmlFor="i1">Firstname</label>
            <input id="i1" value={firstname} onChange={(event) => { 
                setFirstname(event.target.value)
            }}/>
            <label htmlFor="i2">Lastname</label>
            <input id="i2" value={lastname} onChange={(event) => { 
                setLastname(event.target.value)
            }}/>
        </form>
    )
}