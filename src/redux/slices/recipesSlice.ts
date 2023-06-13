import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getRecipes } from '../../api/api';
import { Recipe } from '../../types/Recipe'

interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string;
};

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: "",
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.recipes = action.payload;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });
  }
});

export const { addRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
export const init = createAsyncThunk("recipes/fetch", () => getRecipes());