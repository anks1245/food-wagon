import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../../types/Product"

export interface Cart { 
    values: Product[]
}

let initialState : Cart = {
    values : []
}

export interface HandleProductQuantity {
    value: Product[],
    item: Product,
    quatity: number
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        add: (state, action: PayloadAction<Product>) => {
            console.log(state);
            state.values.push(action.payload)
        },
        remove: (state, action: PayloadAction<Product>) => {
            let updateItems = state.values.filter(item=> item.foodId !== action.payload.foodId)
            state.values = updateItems
        },
        addOneQuantity: (state, action: PayloadAction<Product>) => {
            state.values = state.values.map(item => {
              if (item.foodId === action.payload.foodId) {
                return {
                  ...item,
                  quatity: item.quatity + 1
                };
              }
              return item;
            });
        },
        removeOneQuantity: (state, action: PayloadAction<Product>) => {
            state.values = state.values.map(item => {
              if (item.foodId === action.payload.foodId && item.quatity > 1) {
                return {
                  ...item,
                  quatity: item.quatity - 1
                };
              }
              return item;
            });
          }
    }
})

export const { add, remove, addOneQuantity, removeOneQuantity } = cartSlice.actions;

export default cartSlice.reducer;