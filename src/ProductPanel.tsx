import { ComponentProps, ReactNode, useContext } from "react"
import { Product } from "./ProductTypes"
import { useDispatch } from "react-redux"
import { changeProduct } from "./ShoppingCart"
import { CartContext } from "./CartContext"



function formatNumberGerman(number: number) {
    return new Intl.NumberFormat('de-DE', { 
        style: 'currency', 
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        currency: 'EUR' }).format(number)
}

export function ProductPanel({ product }: { product: Product }) {
    //const dispatch = useDispatch()
    const value = useContext(CartContext)!
    const handleChange = (delta: number) => {
        //dispatch(changeProduct({ product: product, delta }))
        value.changeProduct(product, delta)
    }

    return (
        <Box className="w-[640px] motion-preset-pop">
            <div className="flex flex-row gap-8 items-start overflow-hidden">
                <div className="shrink-0 bg-gray-200 rounded-lg p-4 shadow-xl border border-gray-100 flex flex-col justify-center ">
                    <img src={product.thumbnail} className="w-[240px] h-[240px] motion-preset-expand bg-contain"></img>
                </div>
                <div className="flex flex-col gap-2 self-stretch">
                    <div className="text-xl font-bold">{product.title}</div>
                    <div className="flex flex-row gap-2 justify-start items-center motion-preset-shake motion-delay-2000">
                        <div className="text-sm text-gray-700">Bewertung</div>
                        <Rating rating={product.rating} />
                    </div>
                    <div className="text-sm text-gray-700">{product.description}</div>
                    <div className="text-sm text-gray-700">Von {product.brand}</div>

                    <div className="grow"></div>
                    <div className="flex flex-row gap-2 justify-between items-center">
                        <div className="text-sm text-gray-700 motion-preset-fade">Lieferbare Menge: {product.stock}</div>
                        <div className="text-lg font-bold motion-preset-fade motion-preset-shrink motion-delay-2000">{formatNumberGerman(product.price)}</div>
                    </div>
                    <div className="flex flex-row py-2 px-1 gap-2 justify-end items-center">
                        <button onClick={() => handleChange(1)} className="smallbutton">In den Warenkorb</button>
                    </div>

                </div>
            </div>

        </Box>
    )
}

function Rating({ rating }: { rating: number }) {
    return (
        <div className="flex flex-row gap-1">
            {[1, 2, 3, 4, 5].map((i) => {
                return <div key={i} className={"text-xl " + (i <= rating ? "text-yellow-400" : "text-gray-200")}>✪</div>
            })}
        </div>
    )
}

function Box({ children, ...props }: { children: ReactNode } & ComponentProps<"div">) {
    const className = "rounded-lg shadow-xl border border-gray-200 bg-white m-2 p-4 flex flex-col gap-2 "
        + (props.className ? " " + props.className : "")
    delete props.className
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}