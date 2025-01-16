import { useEffect, useState } from "react"

export type Product = {
    id: number,
    title: string,
    description: string,
    rating: number,
    price: number,
    thumbnail: string
}

export function App() {
    const [ product, setProduct] = useState<Product>()
    useEffect(() => {
        fetch("https://dummyjson.com/product/17").
        then((result) => {
            return result.json()
        }).
        then((data) => {
            setProduct(data)
        })
    }, [])
    if (!product) { return <div></div> }
    return (
        <pre className="">{JSON.stringify(product,null,4)}</pre>
    )
}

