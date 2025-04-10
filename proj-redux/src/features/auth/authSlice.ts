import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface User {
    mobile: String,
    token: String,
    status: String
}

export interface Auth{
    value: User | null
}

const initialState : Auth = {
    value : null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state, action:PayloadAction<User>)=>{
            state.value = action.payload
        },
        logout:(state)=>{
            state.value = null
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer;