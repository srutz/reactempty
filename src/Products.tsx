import { useQuery } from "@tanstack/react-query"
import { Outlet, useNavigate } from "react-router-dom"

export type ProductType = {
    id: number,
    title: string,
    description: string,
    price: number,
    category: string,
    stock: number,
    thumbnail: string,
    rating: number,
}
export type ProductResponse = { products: ProductType[] }


export function useProducts() {
    return useQuery({
        queryKey: [ "abc" ],
        staleTime: 10_000,
        queryFn: async () => {
            const r = await fetch("https://dummyjson.com/products")
            const data = await r.json()
            return data as ProductResponse
        }
    })
}

export function Products() {
    const { data } = useProducts()
    return (<div className="h-1 grow flex gap-4">
        <div className="overflow-auto">
            {data?.products.map((p) => (
                <ProductDetails product={p}></ProductDetails>
            ))}
        </div>
        <Outlet></Outlet>
    </div>
    )
}


export function formatMoney(n: number) { 
    const format = new Intl.NumberFormat('de-DE', {
        style: "currency", currency: "EUR"
    })
    return format.format(n)
}

export type ProductDetailsProps = { product: ProductType, details?: boolean }

export function ProductDetails({ product, details } : ProductDetailsProps) {
    const navigate = useNavigate()
    const handleClick= () => {
        navigate("/products/" + encodeURIComponent(product.id))
    }
    return (
        <div className="flex gap-8 mb-8 pr-4 cursor-pointer" onClick={handleClick}>
            <div className="max-w-32 flex flex-col">
                <img src={product.thumbnail} 
                    className="self-center motion-preset-fade w-20 max-w-20"></img>
                <div className="self-end">{formatMoney(product.price)}</div>
            </div>
            <div className="grow flex flex-col">
                <div className={"font-semibold " + (details ? "text-4xl" : "")}>{product.title}</div>
                <div className="grow text-gray-500 text-sm">{product.description}</div>
                <div className="flex justify-between">
                    <Rating rating={product.rating}></Rating>
                    <div className="self-end capitalize mt-2 text-sm">{product.category}</div>
                </div>
            </div>
        </div>
    )
}

export type RatingProps = { rating: number}

export function Rating({ rating} : RatingProps) {
    return (
        <div className="flex gap-1">
            {[1,2,3,4,5].map((i) => (
                <div className={
                    "font-bold text-xl " +
                    (i <= rating ? "text-yellow-600" : "text-gray-300")}
                >*</div>
            ))}
        </div>
    )
}
