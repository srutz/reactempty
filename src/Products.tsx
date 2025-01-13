import { useQuery } from "@tanstack/react-query"

export type ProductType = {
    id: number,
    title: string,
    description: string,
    price: number,
    category: string,
    stock: number,
    thumbnail: string,
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
    return (<div className="h-1 grow overflow-auto">
        {data?.products.map((p) => (
            <ProductDetails product={p}></ProductDetails>
        ))}
    </div>)
}

export type ProductDetailsProps = { product: ProductType }

export function formatMoney(n: number) { 
    const format = new Intl.NumberFormat('de-DE', {
        style: "currency", currency: "EUR"
    })
    return format.format(n)
}

export function ProductDetails({ product } : ProductDetailsProps) {
    return (
        <div className="flex gap-8 mb-8 pr-4">
            <div className="flex flex-col">
                <img src={product.thumbnail} className="shrink-0 w-32"></img>
                <div className="self-end">{formatMoney(product.price)}</div>
            </div>
            <div className="flex flex-col">
                <div className="font-semibold">{product.title}</div>
                <div className="grow text-gray-500 text-sm">{product.description}</div>
                <div className="self-end capitalize mt-2 text-sm">{product.category}</div>
            </div>
        </div>
    )
}
