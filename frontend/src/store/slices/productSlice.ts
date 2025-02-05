import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

const initialState: Product = {
    id: -1,
    slug: '',
    name: '',

    description: '',
    price: -1,
    categoryId: -1,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addNewProduct: (state, action: PayloadAction<Product>) => {
            state = action.payload
        },

    },
});

export const { addNewProduct } = productSlice.actions;
export default productSlice.reducer;