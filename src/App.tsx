
export function App() {
    return (
        <div className="bg-gray-200 flex flex-col gap-2 w-full h-full">
            <MyForm></MyForm>
        </div>
    )
}

import { useState } from 'react'

export function MyForm() {
    const [name, setName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ name, email })
    }
    console.log("rendering: ", name, email)

    let error = ""
    if (name.length <= 4) {
        error = "Name zu kurz"
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 m-4 w-64 flex flex-col gap-2 bg-white rounded-lg shadow-xl">
            <label htmlFor="id1">Name:</label>
            <input id="id1" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="id2">Vorname:</label>
            <input id="id2" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <label htmlFor="id3">Email:</label>
            <input id="id3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Submit</button>
            <div className="text-red-700 font-bold">{error}</div>
        </form>
    )
}