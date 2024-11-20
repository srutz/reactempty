import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store";
import { changeProduct, ShoppingCartItem } from "./ShoppingCart";
import { CartContext, useCartContext } from "./CartContext";
import { useContext } from "react";

export function CartPanel() {
    // reaktive liste from Shopping-Cart Einträgen
    const value = useCartContext()
    const { items } = value
    //const items = useSelector((state: RootState) => state.shoppingCart.items)

    return (
        <div className="flex-1 mt-8 w-full flex flex-col gap-2 items-center">
            {items.map((item) => (
                <CartRow key={item.product.id} item={item} />
            ))}
        </div>)
}

function CartRow({ item }: { item: ShoppingCartItem }) {
    const { changeProduct } = useCartContext()
    //const dispatch = useDispatch()
    const handleRemove = () => {
        // ändere den ShoppingCart
        //dispatch(changeProduct({ product: item.product, delta: -1}))
        changeProduct(item.product, -1)
    }
    return (
        <div className="w-[80%] flex flex-row gap-2 items-center border-b border-gray-300 p-4 mb-2">
            <div className="shrink-0 bg-gray-200 rounded-lg p-4 shadow-xl border border-gray-100 flex flex-col justify-center ">
                <img src={item.product.thumbnail} className="w-[40px] h-[40px] motion-preset-expand bg-contain"></img>
            </div>
            <div>{item.count}x</div>
            <div>{item.product.title}</div>
            <div className="grow"></div>
            <button className="smallbutton" onClick={handleRemove}>Remove from Cart</button>
        </div>
    )
}