import axios from "axios"
import { useEffect, useState } from "react"


export type Product = {
    id: number
    title: string
    description: string
    price: number
    thumbnail: string
    rating: number
    images: string[]
}

export function App() {
    const [product, setProduct] = useState<Product>()
    useEffect(() => { 
        // run on mounted
        (async() => { 
            // run loading code here
            const response = await axios.get("https://dummyjson.com/products/11")
            setProduct(response.data)
        })()
    }, [])
    return (
        <div className="">
            <ProductPanel product={product}/>
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
                rounded-lg flex flex-col">
            { /* obere bereich */ }
            <div className="grow flex gap-8 items-stretch">
                {/* linke seite */}
                <div className="flex-col justify-between gap-2">
                    <img src={product.thumbnail} className="w-16"></img>
                    <div className="font-bold">{formatGerman(product.price)}€</div>
                </div>
                {/* rechte seite */}
                <div className="flex-col gap-2">
                    <div>{product.title}</div>
                    <div className="text-gray-600">{product.description}</div>
                </div>
            </div>
        </div>
    )
}

