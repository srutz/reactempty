import { useQuery } from "@tanstack/react-query"
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
function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function App() {
    const id = 18
    const result = useQuery({
        queryKey: [ "product", id ],
        queryFn: async () => {
            await delay(2_000)
            const response = await axios.get("https://dummyjson.com/products/18")
            return response.data as Product
        },
        staleTime: 150_000
    })
    const { data, isPending, refetch } = result
    console.log(result)
    if (isPending) {
        return <div>still loading</div>
    }
    return (
        <div className="">
            <ProductPanel product={data}/>
            <button onClick={() => refetch()}>Reload</button>
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

