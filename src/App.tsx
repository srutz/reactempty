import { useEffect, useState } from "react";


type QuoteType = { id: number; quote: string; author: string }

function Quotes() {
    const [quotes, setQuotes] = useState<QuoteType[]>([])
    useEffect(() => {
        (async () => {
            const response = await fetch('https://dummyjson.com/quotes')
            const data = await response.json()
            setQuotes(data.quotes as QuoteType[])
        })()
    }, [])
    return <ul>
        {quotes.map((q) => <li key={q.id}>{q.quote} - {q.author}</li>)}
    </ul>
}

export function App() {
    return (
        <div className="text-3xl">
            <Quotes></Quotes>
        </div>
    )
}

