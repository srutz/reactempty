import { useEffect, useState } from "react"

type Quote = { id: number, quote: string, author: string }

export function App() {
    const [quote, setQuote] = useState<Quote>()
    useEffect(() => {
        const dummy = async () => {
            const r = await fetch("https://dummyjson.com/quotes/" + rand(30))
            const data = await r.json() as Quote
            setQuote(data)
        }
        dummy()
    }, [])
    return (
        <div className="shadow-lg rounded-lg border border-gray-300 
                bg-white p-4 m-4">
            {quote?.quote}
            <div className="text-right text-gray-700 text-sm">
                {quote?.author}</div>
        </div>
    )
}

function rand(limit: number) {
    return Math.floor(Math.random() * limit)
}

