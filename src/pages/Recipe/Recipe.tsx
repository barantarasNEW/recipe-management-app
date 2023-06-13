import { useEffect } from "react";
import { useParams } from "react-router";
import Loader from "../../components/Loader/Loader";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import * as recipeActions from '../../redux/slices/recipeSlice';
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import './Recipe.scss';

const Recipe = () => {
  const dispatch = useAppDispatch();
  const { loading: recipesLoading } = useAppSelector(state => state.recipes);
  const { recipe, loading, error } = useAppSelector(state => state.recipe);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(recipeActions.init(+id));
    }
  }, []);

  if (loading || recipesLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error</p>;
  }

  if (!recipe) {
    return <p>Not found</p>
  }

  return (
    <section className="page__section recipe">
      <div className="container">
        <div className="recipe__wrapper">
          <BreadCrumbs />

          <h2 className="recipe__title">
            {recipe.name}
          </h2>

          <img
            className="recipe__img"
            src={recipe.img}
            alt="product"
          />

          <ul className="recipe__ingredients">
            {recipe.recipe.map(value => (
              <li key={value} className="recipe__ingredient">
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Recipe;