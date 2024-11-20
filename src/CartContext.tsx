import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCartType } from "./ShoppingCart";
import { Product } from "./ProductTypes";

export type ShoppingCartContextTypeX = ShoppingCartType &
{
    changeProduct: (product: Product, delta: number) => void
}

export interface ShoppingCartContextType extends ShoppingCartType {
    changeProduct: (product: Product, delta: number) => void
}


export const CartContext = createContext<ShoppingCartContextType|undefined>(undefined)

export function CartContextWrapper(props: { children: ReactNode}) {

    const [ cart, setCart ] = useState<ShoppingCartType>({ items: [] })

    function changeProduct(product: Product, delta: number) {
        let item = cart.items.find(item => item.product.id === product.id)
        if (item) {
            item.count += delta
        } else {
            item = {
                product: product,
                count: delta,
            }
            cart.items.push(item)
        }
        item.count = Math.max(0, item.count)
        cart.items = cart.items.filter(item => item.count > 0)
        setCart({
            items: cart.items,
        } satisfies ShoppingCartType)
    }
    

    return (
        <CartContext.Provider value={{ items: cart.items, changeProduct }}>
            {props.children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    const c = useContext(CartContext)
    if (!c) {
        throw "Provider not set for CartContext"
    }
    return c
}

