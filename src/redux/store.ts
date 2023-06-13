import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from './slices/recipesSlice';
import recipeReducer from './slices/recipeSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    recipe: recipeReducer,
    user: userReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch