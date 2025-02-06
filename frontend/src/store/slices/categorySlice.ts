import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryAttribute } from "../../types/category";

const initialState: Category[] = [];

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategories: (state, action: PayloadAction<Category[]>) => {
            return action.payload;
        },
        addNewCategory: (state, action: PayloadAction<Category>) => {
            state.push(action.payload); 
        },
        addParentCategory: (state, action: PayloadAction<{ id: number; parentId: number | null }>) => {
            const category = state.find((cat) => cat.id === action.payload.id);
            if (category) {
                category.parentId = action.payload.parentId;
            }
        },
        addCategoryAttribute: (state, action: PayloadAction<{ categoryId: number; attribute: CategoryAttribute }>) => {
            const category = state.find((cat) => cat.id === action.payload.categoryId);
            if (category) {
                category.attributes.push(action.payload.attribute);
            }
        },
    },
});

export const { addCategories, addNewCategory, addParentCategory, addCategoryAttribute } = categorySlice.actions;
export default categorySlice.reducer;
