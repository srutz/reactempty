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

export function App() {
    const [product, setProduct] = useState<Product>()
    useEffect(() => { 
        // run on mounted
        (async() => { 
            // run loading code here
            const response = await axios.get("https://dummyjson.com/products/18")
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

