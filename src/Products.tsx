import { useQuery } from "@tanstack/react-query"

export type ProductType = {
    id: number,
    title: string,
    description: string,
    price: number,
    category: string,
    stock: number
}
export type ProductResponse = { products: ProductType[] }

export function Products() {
    const { data } = useQuery({
        queryKey: [ "abc" ],
        queryFn: async () => {
            const r = await fetch("https://dummyjson.com/products")
            const data = await r.json()
            return data as ProductResponse
        }
    })

    return (<div className="bg-orange-500">
        <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>)
}