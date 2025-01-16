import { useEffect, useState } from "react"

export type Product = {
    id: number,
    title: string,
    description: string,
    rating: number,
    price: number,
    thumbnail: string
}
export type ProductPanelProps = { product: Product }

export function ProductPanel(props: ProductPanelProps) {
    return <div></div>
}

export function App() {
    const [ product, setProduct] = useState<Product>()
    useEffect(() => {
        (async () => {
            const result = await fetch("https://dummyjson.com/product/17")
            const data = await result.json()
            setProduct(data)
        })()
    }, [])
    if (!product) { return <div></div> }
    return (
        <ProductPanel product={product} ></ProductPanel>
    )
}


