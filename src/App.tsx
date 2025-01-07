import { useEffect, useState } from "react"

type Quote = { id: number, quote: string, author: string }

export function App() {
    const quote = useQuote(rand(20))
    return (
        <div className="shadow-lg rounded-lg border border-gray-300 
                bg-white p-4 m-4">
            {quote?.quote}
            <div className="text-right text-gray-700 text-sm">
                {quote?.author}</div>
        </div>
    )
}

export function useQuote(id: number) {
    const [quote, setQuote] = useState<Quote>()
    useEffect(() => {
        (async () => {
            const r = await fetch("https://dummyjson.com/quotes/" + id)
            const data = await r.json() as Quote
            setQuote(data)
        })()
    }, [])
    return quote
}

function rand(limit: number) {
    return Math.floor(Math.random() * limit)
}

