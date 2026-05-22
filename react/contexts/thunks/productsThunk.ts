import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/lib/supabaseClient';
import { type RootState } from '../store';
import { type IProduct, type IStock, type IPackage } from '@/Models/types';

// --- Type Definitions for Thunk Arguments ---
type NewProductPayload = Omit<IProduct, 'id'>; // For creating a new product
type UpdateProductPayload = IProduct; // For updating an existing product
type InventoryItem = (IProduct & { item_type: 'product' }) | (IPackage & { item_type: 'package' });
/**
 * An async thunk to fetch all products for the current company.
 */
export const fetchProducts = createAsyncThunk<
    IStock, // This thunk will now correctly return an IStock object
    void,
    { state: RootState }
>(
    'products/fetchProducts',
    async (_, { getState }) => {
        const state = getState();
        const companyId = state.user.profile?.companyId;

        if (!companyId) {
            throw new Error("User's company ID is not available.");
        }

        const { data, error } = await supabase.rpc('get_products', {
            company_id_input: companyId
        });

        if (error) throw error;
        
        // Process the mixed array from the database
        const allItems = data as InventoryItem[];
        
        const stock: IStock = {
            products: allItems.filter(item => item.item_type === 'product') as IProduct[],
            packages: allItems.filter(item => item.item_type === 'package') as IPackage[],
        };
        console.log(stock)
        return stock; // Return the correctly shaped IStock object
    }
);

/**
 * An async thunk to add a new product to the database.
 */
export const addProduct = createAsyncThunk<
    IProduct,
    NewProductPayload,
    { state: RootState }
>(
    'products/addProduct',
    async (newProductData, { getState }) => {
        const state = getState();
        const companyId = state.user.profile?.companyId;
        if (!companyId) throw new Error("Company ID not found.");

        const { data, error } = await supabase
            .from('products')
            .insert({ ...newProductData, company_id: companyId })
            .select()
            .single();
        
        if (error) throw error;
        return data as IProduct;
    }
);

/**
 * An async thunk to update an existing product.
 */
export const updateProduct = createAsyncThunk<
    IProduct,
    UpdateProductPayload
>(
    'products/updateProduct',
    async (productData) => {
        const { data, error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', productData.id)
            .select()
            .single();

        if (error) throw error;
        return data as IProduct;
    }
);

/**
 * An async thunk to delete a product by its ID.
 */
export const deleteProduct = createAsyncThunk<
    string, // Returns the ID of the deleted product
    { productId: string }
>(
    'products/deleteProduct',
    async ({ productId }) => {
        const { error } = await supabase
            .from('products')
            .delete()
            .match({ id: productId });
        
        if (error) throw error;
        return productId;
    }
);