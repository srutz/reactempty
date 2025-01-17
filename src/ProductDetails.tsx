import { formatMoney, ProductImage, Rating, useProduct } from "./App"

export function ProductDetailsView() {
    const id = 33
    const { data: product } = useProduct(id)
    if (!product) {
        return <div></div>
    }
    return (
        <div className="w-[400px] bg-white shadow-xl p-4 m-4 rounded-lg flex gap-8">
            <div className="flex flex-col gap-2"> { /* image + price */ }
                <ProductImage src={product.thumbnail}></ProductImage>
                <div className="grow"></div>
                <div className="font-bold">{formatMoney(product.price)}</div>
            </div>
            <div className="flex flex-col gap-2"> { /* title + description */}
                <div className="font-bold ">{product.title}</div>
                <div className="text-gray-600">{product.description}</div>
                <div className="grow"></div>
                <Rating rating={product.rating}></Rating>
            </div>
        </div>)
}
