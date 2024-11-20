import { useSelector } from "react-redux";
import { RootState } from "./Store";
import { ShoppingCartItem } from "./ShoppingCart";

export function CartPanel() {

    const items = useSelector((state: RootState) => state.shoppingCart.items)

    return (
        <div className="flex-1 mt-8 w-full flex flex-col gap-2 items-center">
            {items.map((item) => (
                <CartRow key={item.product.id} item={item} />
            ))}
        </div>)
}

function CartRow({ item }: { item: ShoppingCartItem }) {
    return (
        <div className="flex flex-row gap-2 items-center border-b border-gray-300 p-4 mb-2">
            <div className="shrink-0 bg-gray-200 rounded-lg p-4 shadow-xl border border-gray-100 flex flex-col justify-center ">
                <img src={item.product.thumbnail} className="w-[40px] h-[40px] motion-preset-expand bg-contain"></img>
            </div>
            <div>{item.count}x</div>
            <div>{item.product.title}</div>
        </div>
    )
}