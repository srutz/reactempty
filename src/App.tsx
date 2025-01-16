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
        <div className="bg-white shadow-xl p-4 m-4 rounded-lg flex gap-8">
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
                <div className={(i < props.rating ? "text-yellow-500" : "" 
                    ) + " text-2xl"}>★</div>
            ))}
        </div>
    )
}

export function useProduct(id: number) {
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

export function App() {
    const product = useProduct(17)
    const product2 = useProduct(45)
    return (
        <>
            <ProductPanel product={product} ></ProductPanel>
            <ProductPanel product={product2} ></ProductPanel>
        </>
    )
}


