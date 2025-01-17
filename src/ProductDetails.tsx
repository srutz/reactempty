import { useParams } from "react-router-dom"
import { formatMoney, ProductImage, Rating, useProduct } from "./App"

export function ProductDetailsView() {
    const { id } = useParams()
    const { data: product } = useProduct(Number.parseInt(id ?? "-1"))
    if (!product) {
        return <div></div>
    }
    return (
        <div className="self-center max-w-[800px] bg-white shadow-xl p-4 m-4 rounded-lg 
                flex flex-col gap-8">
            <div className="flex gap-8">
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
            </div>
            <div className="mt-8 self-center flex flex-wrap gap-4">
                {product.images?.map((image) => (
                    <div className="p-4 bg-gray-200 rounded-xl flex justify-center items-center">
                        <ProductImage large src={image}></ProductImage>
                    </div>
                ))}
            </div>
        </div>)
}
