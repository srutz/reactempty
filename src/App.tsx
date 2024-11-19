
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
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(name, email)
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 m-4 w-64 flex flex-col gap-2 bg-white rounded-lg shadow-xl">
            <label>Name:
                <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>Email:
                <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}