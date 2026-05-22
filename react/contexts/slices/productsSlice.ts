import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IProduct, type IStock } from '@/Models/types';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../thunks/productsThunk';

// Define the shape of this slice of the Redux state
interface ProductsState {
    stock: IStock;
    isLoading: boolean;
    error: string | null;
}

// Define the initial state when the app loads
const initialState: ProductsState = {
    stock: {
        packages: [],
        products: [],
    },
    isLoading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    // Synchronous reducers are no longer needed as thunks handle optimistic updates.
    reducers: {},
    // Handles the async states of all the thunks
    extraReducers: (builder) => {
        builder
            // Cases for fetching products
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IStock>) => {
                state.isLoading = false;
                state.stock = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch products.';
            })
            // Case for successfully adding a product
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
                state.stock.products.unshift(action.payload); // Add new product to the start of the list
            })
            // Case for successfully updating a product
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
                const index = state.stock.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.stock.products[index] = action.payload;
                }
            })
            // Case for successfully deleting a product
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
                state.stock.products = state.stock.products.filter(p => p.id !== action.payload);
            });
    },
});

export default productsSlice.reducer;