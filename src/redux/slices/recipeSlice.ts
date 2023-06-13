import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRecipe } from '../../api/api';
import { Recipe } from '../../types/Recipe'

interface RecipeState {
  recipe: Recipe | null;
  loading: boolean;
  error: string;
};

const initialState: RecipeState = {
  recipe: null,
  loading: false,
  error: "",
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.recipe = action.payload;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });
  }
});

export default recipeSlice.reducer;
export const init = createAsyncThunk("recipe/fetch", (id: number) => getRecipe(id));