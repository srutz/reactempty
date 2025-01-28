import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"


export type Product = {
    id: number
    title: string
    description: string
    price: number
    thumbnail: string
    rating: number
    stock: number
    images: string[]
}

const baseUrl = "https://dummyjson.com/products/"

export function usePrefetch() {
    const queryClient = useQueryClient()
    useEffect(() => {
        const id = 1
        for (let i = 0; i < 50; i++) {
            const pid = id + 1 + i
            queryClient.prefetchQuery({
                queryKey: ["product", pid],
                queryFn: async () => {
                    const response = await axios.get(
                        baseUrl + encodeURIComponent(pid))
                    return response.data
                }
            })
        }
    }, [])
}

export function App() {
    const [id, setId] = useState(10)
    usePrefetch()
    const result = useQuery({
        queryKey: [ "product", id ],
        queryFn: async () => {
            const response = await axios.get(baseUrl + encodeURIComponent(id))
            return response.data as Product
        },
        placeholderData: (prev) => { return prev },
        staleTime: 3_600_000
    })
    const { data, isPending } = result
    if (isPending) {
        return <div>still loading</div>
    }
    return (
        <div className="">
            <ProductPanel product={data}/>
            <div className="flex gap-2 mx-4">
                <button onClick={() => setId(id - 1)}>Prev</button>
                <button onClick={() => setId(id + 1)}>Next</button>
            </div>
        </div>
    )
}
function formatGerman(n: number) { return new Intl.NumberFormat("de", {
    currency: "EUR"
}).format (n)}

export function ProductPanel({ product } : { product?: Product}) {
    if (!product)
        return undefined
    return (
        <div className="bg-white p-4 m-4 shadow-xl h-48
                relative rounded-lg flex flex-col">
            { /* oberer bereich */ }
            <div className="grow flex gap-8 items-stretch">
                {/* linke seite */}
                <div className="flex flex-col justify-between gap-2">
                    <div className="w-32">
                        <img src={product.thumbnail} ></img>
                    </div>
                    <div className="font-bold text-center">
                        {formatGerman(product.price)}€
                    </div>
                </div>
                {/* rechte seite */}
                <div className="flex flex-col gap-2">
                    <div>{product.title}</div>
                    <div className="text-gray-600">{product.description}</div>
                </div>
            </div>
        </div>
    )
}

