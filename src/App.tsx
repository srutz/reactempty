import { useEffect, useState } from "react"

function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, ms)
    })
}

export function useQuotes(offset?: number) {
    console.log("loading offset " + offset)
    const[data, setData] = useState("")
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState("")
    useEffect(() => {
        (async() => {
            setLoading(true)
            try {
                let url = "https://dummyjson.com/quotes";
                const sp = new URLSearchParams()
                if (offset) {
                    sp.set("skip", offset.toString())
                }
                sp.set("limit", "2")
                url += "?" + sp.toString()
                const response = await fetch(url)
                if (Math.floor(response.status / 100) != 2) {
                    throw "response status = " + response.status
                }
                const json = await response.json()
                setData(JSON.stringify(json, null, 4))
            } catch (e) {
                setError((e as any).toString() || "unknown error")
            } finally { setLoading(false) }
        })()
    }, [ offset ])
    return { loading, error, data }
}

export function App111() {
    const [offset, setOffset] = useState(0)
    const { loading, error, data } = useQuotes(offset)
    return (<div className="flex flex-col gap-2">
        <button onClick={() => setOffset(offset + 2)}>Load next</button>
        {error ? <div>Alas, an error {error}</div>
            :
            (loading ? <div>Lade noch....</div> : <pre>{data}</pre>)}
    </div>)
}

type QuoteType = { id: number, quote: string, author: string }

function Quote(props: { quote?: QuoteType }) {
    return (
        <div>
            {props.quote?.quote}
        </div>
    )
}

export function App() {
    const [data,setData] = useState<QuoteType>()
    useEffect(() => {
        (async () => {
            const response = await fetch("https://dummyjson.com/quotes/13")
            const raw = await response.json() as QuoteType
            setData(raw)
        })() // IIFE
    }, [])
    return (
        <Quote quote={data} />
    )
}