
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from './ProductTypes'

export type ShoppingCartItem = {
    product: Product
    count: number
}

export type ShoppingCartType = {
    items: ShoppingCartItem[]
}

const initialState: ShoppingCartType = {
    items: []
}

const shoppingCartSlice = createSlice({
    name: 'shoppingcart',
    initialState,
    reducers: {
        changeProduct: (state, action: PayloadAction<{ product: Product, delta: number }>) => {
            const { items } = state
            const { product, delta } = action.payload
            let item = items.find(item => item.product.id === product.id)
            if (item) {
                item.count += delta
            } else {
                item = {
                    product: product,
                    count: delta,
                }
                items.push(item)
            }
            item.count = Math.max(0, item.count)
            state.items = items.filter(item => item.count > 0)
        }
    },
})
export const { changeProduct } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer

