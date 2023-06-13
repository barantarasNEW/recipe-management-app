import { createContext } from "react";
import { Recipe } from "../types/Recipe";

type Context = {
  liked: Recipe[],
  changeLikeRecipe: (recipe: Recipe) => void;
  // delRecipe: (id: number) => void;
};

export const Liked = createContext<Context>({
  liked: [],
  changeLikeRecipe: () => {},
  // delRecipe: () => {},
});