import { useEffect } from "react";
import * as RecipesActions from '../../redux/slices/recipesSlice'; 
import RecipesList from "../../components/RecipesList/RecipesList";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import './Recipes.scss';

const Recipes = () => {
  const dispatch = useAppDispatch();
  const { recipes, loading, error } = useAppSelector(state => state.recipes);

  useEffect(() => {
    dispatch(RecipesActions.init());
  }, [dispatch]);

  return (
    <section className="page__section recipes">
      <div className="container">
        <div className="recipes__wrapper">
          <RecipesList
            recipes={recipes}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </section>
  );
};

export default Recipes;