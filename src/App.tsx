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
        for (let i = 1; i <= 20; i++) {
            queryClient.prefetchQuery({
                queryKey: ["products", i],
                queryFn: async () => {
                    const response = await fetchPage(i)
                    return response.data
                }
            })
        }
    }, [])
}

const PAGESIZE = 20
function fetchPage(page: number) {
    return axios.get(baseUrl 
        + "?limit=" +PAGESIZE
        + "&skip=" + ((page - 1) * PAGESIZE))    
}

export function useProducts(page: number) {
    const result = useQuery({
        queryKey: ["products", page],
        queryFn: async () => {
            const response = await fetchPage(page)
            return response.data as { "products": Product[] }
        },
        placeholderData: (prev) => { return prev },
        staleTime: 3_600_000
    })
    return result
}

export function useProduct(id: number) {
    const result = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const response = await axios.get(baseUrl + id)
            return response.data as Product
        },
        staleTime: 3_600_000
    })
    return result
}


export function App() {
    const p = new URLSearchParams(location.search)
    const pageParam = Number.parseInt(p.get("page")||"-1") || 1
    const [page, setPage] = useState(pageParam)
    const { data, isPending } = useProducts(page)
    if (isPending) { return <div>still loading</div> }
    return (
        <div className="grow h-full flex flex-col gap-2">
            <div className="grow flex flex-wrap gap-2 p-2
                    justify-start overflow-y-auto">
                {data?.products.map((p) => (
                    <ProductPanel product={p} />
                ))}
            </div>
            <div className="p-4 flex gap-2 justify-center">
                <button onClick={() =>
                    setPage(Math.max(1, page-1))}>Prev</button>
                <button onClick={() => {
                    location.href = "/products?page=" + (page + 1)
                }}>Next</button>
            </div>
        </div>
    )
}
function formatGerman(n: number) {
    return new Intl.NumberFormat("de", {
        currency: "EUR"
    }).format(n)
}

export function ProductPanel({ product }: { product?: Product }) {
    if (!product)
        return undefined
    return (
        <div className="bg-white p-4 m-2 shadow-xl w-[440px] h-[188px]
                relative rounded-lg flex flex-col">
            { /* oberer bereich */}
            <div className="h-1 grow flex gap-8 items-stretch">
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
                    <div className="text-gray-600 overflow-hidden">{product.description}</div>
                </div>
            </div>
        </div>
    )
}

