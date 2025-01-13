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
    return (<div className="h-1 grow bg-orange-500 overflow-auto">
        {data?.products.map((p) => (
            <ProductDetails product={p}></ProductDetails>
        ))}
    </div>)
}

export type ProductDetailsProps = { product: ProductType }

export function ProductDetails({ product } : ProductDetailsProps) {
    return <div>{product.title}</div>
}
