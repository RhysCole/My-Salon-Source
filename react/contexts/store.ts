import { configureStore } from "@reduxjs/toolkit";

import userReducer from './slices/userSlice'
import bedsReducer from './slices/bedSlice'
import queueReducer from './slices/queueSlice'
import customerReducer from './slices/customersSlice'
import productsReducer from './slices/productsSlice'

const store = configureStore({
    reducer:{ 
        user: userReducer,
        beds: bedsReducer,
        queue: queueReducer,
        customers: customerReducer,
        products: productsReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
