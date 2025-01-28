

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
    return (
        <div className="">
            <ProductPanel />
        </div>
    )
}
export function ProductPanel({ product} : { product?: Product}) {
    return (
        <div></div>
    )
}

