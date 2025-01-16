import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export type Product = {
    id: number,
    title: string,
    description: string,
    rating: number,
    price: number,
    thumbnail: string
}

function formatMoney(n: number) {
    const nf = new Intl.NumberFormat("de-DE", {
        currency: "EUR", 
        style: "currency" })
    return nf.format(n)
}

export function ProductImage({ src} : { src: string}) {
    const [loaded,setLoaded] = useState(false)
    return (
        <div className={"w-32 " + (loaded ? "motion-preset-pop" : "invisible")}>
            <img src={src} onLoad={() => setLoaded(true)}></img>
        </div>                
    )
}

export type ProductPanelProps = { product?: Product }
export function ProductPanel(props: ProductPanelProps) {
    const { product } = props
    if (!product) {
        return <div></div>
    }
    return (
        <div className="w-[400px] bg-white shadow-xl p-4 m-4 rounded-lg flex gap-8">
            <div className="flex flex-col gap-2"> { /* image + price */ }
                <ProductImage src={product.thumbnail}></ProductImage>
                <div className="grow"></div>
                <div className="font-bold">{formatMoney(product.price)}</div>
            </div>
            <div className="flex flex-col gap-2"> { /* title + description */}
                <div className="font-bold motion-preset-slide-right"
                    >{product.title}</div>
                <div className="text-gray-600 motion-preset-slide-right motion-delay-500">{product.description}</div>
                <div className="grow"></div>
                <Rating rating={product.rating}></Rating>
            </div>
        </div>)
}

export type RatingProps = { rating: number }
export function Rating(props: RatingProps) {
    return (
        <div className="self-end flex">
            {[1,2,3,4,5].map((i) => (
                <div key={i} className={(i < props.rating ? "text-yellow-500" : "" 
                    ) + " text-2xl"}>★</div>
            ))}
        </div>
    )
}

export function useProduct_(id: number) {
    const [ product, setProduct] = useState<Product>()
    useEffect(() => {
        (async () => {
            const result = await fetch("https://dummyjson.com/product/" + id)
            const data = await result.json()
            setProduct(data)
        })()
    }, [])
    return product
}

export function useProduct(id: number) {
    const { data, refetch } = useQuery({
        queryKey: [ "product", id ],
        queryFn: async() => {
            const result = await fetch("https://dummyjson.com/product/" + id)
            const d = await result.json()
            return d as Product
        }
    })
    return {
        data: data,
        refetch
    }
}

export function useProducts(limit: number, skip?: number) {
    const { data, refetch } = useQuery({
        queryKey: [ "products", limit, skip ],
        placeholderData: (prev) => prev,
        queryFn: async() => {
            const params = new URLSearchParams()
            if (skip) params.set("skip", skip.toString())
            params.set("limit", limit.toString())
            const result = await fetch("https://dummyjson.com/products"
                + "?" + params.toString())
            const d = await result.json()
            return d as { products: Product[] }
        }
    })
    return { data: data, refetch }
}

export function App() {
    const [limit, setLimit ] = useState(2)
    const { data } = useProducts(limit)
    console.log("render app", data)
    return (
        <div className="flex flex-col gap-4 overflow-y-auto p-4">
            <button onClick={() => setLimit(limit +2)} >Load more</button>
            <div className="justify-center flex flex-wrap justify-items-center overflow-y-auto">
                {data?.products.map((p) => <ProductPanel key={p.id} product={p} />)}
            </div>
        </div>
    )
}


