
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
            let item = state.items.find(item => item.product.id === action.payload.product.id)
            if (item) {
                item.count += action.payload.delta
            } else {
                item = {
                    product: action.payload.product,
                    count: action.payload.delta,
                }
                state.items.push(item)
            }
            item.count = Math.max(0, item.count)
            state.items = state.items.filter(item => item.count > 0)
        }
    },
})
export const { changeProduct } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer

