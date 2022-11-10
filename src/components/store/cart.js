import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmount: 0
    },

    reducers: {
        addItemToCart(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload.id)
            if(existingItem) {
                return
            }
            state.items = [...state.items, action.payload]
            state.totalAmount = state.totalAmount + action.payload.price * action.payload.amount

        },

        removeOneItemFromCart(state, action) {

            const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload)
        
            const existingItem = state.items[existingCartItemIndex]
    
            const updatedTotalAmount = state.totalAmount - existingItem.price
    
            let updatedItems
            if(existingItem.amount === 1){
                updatedItems = state.items.filter(item => item.id !== action.payload)
            } else {
                const updatedItem = {...existingItem, amount: existingItem.amount -1}
                updatedItems = [...state.items]
                updatedItems[existingCartItemIndex] = updatedItem
            }

            state.items = updatedItems
            state.totalAmount = updatedTotalAmount

        },

        addOneItemToCart(state, action) {
            const itemIndex = state.items.findIndex(x => x.id === action.payload)
            const item = state.items[itemIndex]

            const updatedItem = {...item, amount: item.amount + 1}

            const totalAmount = state.totalAmount + item.price
            
            let updatedItemsArray = [...state.items]
            updatedItemsArray[itemIndex] = updatedItem


            state.items = updatedItemsArray
            state.totalAmount = totalAmount
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice