import { createSlice } from "@reduxjs/toolkit"

const storedItems = localStorage?.getItem('cart')

const initialState =  {
    items : storedItems !== 'undefined' && storedItems !== null ? JSON.parse(storedItems) : []
}

const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart: (state, action) => {
            console.log(action)
            console.log(state)
            return {
                ...state,
                items : [...state.items, action.payload]
            }
        },
        deleteFromCart: (state, action) => {
            return {
                ...state,
                items : state.items.filter(ele => ele.id !== action.payload.id)
            }
        },
        incrementQuantity: (state, action) => {
            return {
                ...state,
                items : state.items.map(item => {
                    if(item.id === action.payload.id){
                        return { ...item, quantity: item.quantity + 1 };
                    }else {
                        return item;
                    }
                })
            }
        },
        decrementQuantity: (state, action) => {
            return {
                ...state,
                items : state.items.map(item => {
                    if(item.id === action.payload.id){
                        return { ...item, quantity: item.quantity - 1 };
                    }else {
                        return item;
                    }
                })
            }
        }

    },
})

export const {addToCart, deleteFromCart, decrementQuantity, incrementQuantity} =  CartSlice.actions

export default CartSlice.reducer