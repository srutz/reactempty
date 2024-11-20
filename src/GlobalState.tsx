import { useEffect, useState } from "react"
import { EventBus } from "./eventbus"
import { Product } from "./ProductTypes"
import { ShoppingCartItem } from "./ShoppingCart"

export class GlobalState {
    private static instance = new GlobalState()

    static getInstance() { return GlobalState.instance }

    items: ShoppingCartItem[] = []
    eventBus = new EventBus()

    changeProduct(product: Product, delta: number) {
        let item = this.items.find(item => item.product.id === product.id)
        if (item) {
            item.count += delta
        } else {
            item = {
                product: product,
                count: delta,
            }
            this.items.push(item)
        }
        item.count = Math.max(0, item.count)
        this.items = this.items.filter(item => item.count > 0)
        this.eventBus.emit("state")
    }
}

export function useGlobalState() {
    const [ items, setItems ] = useState<ShoppingCartItem[]>(GlobalState.getInstance().items)
    useEffect(() => {
        const l = () => {
            setItems(GlobalState.getInstance().items)
        }
        GlobalState.getInstance().eventBus.on("state", l)
        return () => {
            GlobalState.getInstance().eventBus.off("state", l)
        }
    })
    return { items }
}