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

function formatMoney(n: number) {
    const nf = new Intl.NumberFormat("de-DE", {
        currency: "EUR", 
        style: "currency" })
    return nf.format(n)
}

export function ProductPanel(props: ProductPanelProps) {
    const { product } = props
    return (
        <div className="bg-white shadow-xl p-4 m-4 rounded-lg flex gap-8">
            <div className="flex flex-col gap-2"> { /* image + price */ }
                <img src={product.thumbnail} className="w-64"></img>
                <div className="grow"></div>
                <div className="font-bold">{formatMoney(product.price)}</div>
            </div>
            <div className="flex flex-col gap-2"> { /* title + description */}
                <div className="font-bold">{product.title}</div>
                <div className="text-gray-600">{product.description}</div>
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
                <div className={(i < props.rating ? "text-yellow-500" : "" 
                    ) + " text-2xl"}>★</div>
            ))}
        </div>
    )
}

export function App() {
    const [ product, setProduct] = useState<Product>()
    useEffect(() => {
        (async () => {
            const result = await fetch("https://dummyjson.com/product/12")
            const data = await result.json()
            setProduct(data)
        })()
    }, [])
    if (!product) { return <div></div> }
    return (
        <ProductPanel product={product} ></ProductPanel>
    )
}


