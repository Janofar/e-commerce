import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductInput } from '../../types/product';

const initialState  : ProductInput= {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: -1,
    currency: '',
    images: [],
    variations: [],

};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updatePriceStockStatus: (state, action: PayloadAction<Product>) => {
            //state = action.payload
        },
        
    },
});

export const { updatePriceStockStatus } = productSlice.actions;
export default productSlice.reducer;