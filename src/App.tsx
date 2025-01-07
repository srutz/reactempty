import { useEffect, useState } from "react"

type Quote = { id: number, quote: string, author: string }

export function App() {
    const { quote, error, reload, loading } = useQuote(20)
    if (error) {
        return <div>Hat nicht geklappt {error}</div>
    }
    if (loading) {
        return <div>Ich lade noch...</div>
    }
    return (
        <div className="shadow-lg rounded-lg border border-gray-300 
                bg-white p-4 m-4">
            {quote?.quote}
            <div className="text-right text-gray-700 text-sm">
                {quote?.author}</div>
            <button onClick={(reload)}>Next</button>
        </div>
    )
}

export function useQuote(id: number) {
    const [quote, setQuote] = useState<Quote>()
    const [error, setError] = useState("")
    const [trigger, setTrigger] = useState(1)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                await delay(1_000)
                const r = await fetch("https://dummyjson.com/quotes/" + id)
                if (Math.floor(r.status / 100) != 2) {
                    setError("error in request " + r.status)
                    return
                }
                const data = await r.json() as Quote
                setQuote(data)
            } finally {
                setLoading(false)
            }
        })()
    }, [ trigger ])
    const reload = () => {
        setTrigger(trigger + 1)
    }
    return { 
        quote: quote,
        error: error,
        reload: reload,
        loading: loading 
    }
}

async function delay(delay: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

function rand(limit: number) {
    return Math.floor(Math.random() * limit)
}
