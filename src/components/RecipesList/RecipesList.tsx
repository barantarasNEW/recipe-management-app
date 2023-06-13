import { useContext, useDeferredValue, useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as RecipesActions from '../../redux/slices/recipesSlice'; 
import Search from "../../components/Search/Search";
import Loader from "../../components/Loader/Loader";
import { Liked } from "../../context/Liked";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { Recipe } from "../../types/Recipe";
import './RecipesList.scss';
import { TransitionGroup, CSSTransition } from "react-transition-group";

type Props = {
  recipes: Recipe[];
  loading?: boolean;
  error?: string;
}

const RecipesList: React.FC<Props> = ({ recipes, loading, error }) => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(state => state.user).user;
  const { liked, changeLikeRecipe } = useContext(Liked);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const deferredQuery = useDeferredValue(query);
  const navigate = useNavigate();

  const isSigned = email.length;
  const findRecipe = (id: number) => {
    if (isSigned) {
      return liked.find(currLiked => currLiked.id === id);
    }
  };

  const visibleRecipes = useMemo(() =>  {
    if (!deferredQuery.length) {
      return recipes;
    }

    const reg = new RegExp(`${deferredQuery}.+$`, 'ig');

    return recipes.filter(recipe => {
      return recipe.name.search(reg) !== -1;
    });
  }, [deferredQuery, recipes]);

  const onClickLike = (recipe: Recipe) => {
    if (!isSigned) {
      navigate("/signIn");

      return;
    }

    changeLikeRecipe(recipe);
  };

  useEffect(() => {
    dispatch(RecipesActions.init());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error...</p>;
  }

  if (!recipes.length) {
    return <p>Recipes not found</p>
  }

  return (
    <div className="recipes-list">
      <div className="container">
        <div className="recipes-list__wrapper">
          <Search />

          <ul>
            <TransitionGroup className="recipes-list__list">
              {visibleRecipes.map((recipe) => (
                <CSSTransition
                  key={recipe.id}
                  timeout={500}
                  classNames="item"
                >
                  <li className="recipes-list__item">
                    <h2 className="recipes-list__title">
                      {recipe.name}
                    </h2>

                    <img
                      className="recipes-list__img"
                      src={recipe.img}
                      alt="product"
                    />
      
                    <div className="recipes-list__btns">
                      <Link to={`/recipes/${recipe.id}`} className="btn">
                        Recipe
                      </Link>
      
                      <button onClick={() => onClickLike(recipe)}>
                        <img
                          className="recipes-list__icon"
                          src={`./assets/icons/${findRecipe(recipe.id) ? "heart-active.svg" : "heart.svg"}`}
                          alt="icon"
                        />
                      </button>
      
                      <Link
                        to={isSigned
                          ? `/recipes/${recipe.id}/start`
                          : "/signIn"}
                      >
                        <img
                          className="recipes-list__icon"
                          src="./assets/icons/start.svg"
                          alt="icon"
                        />
                      </Link>
                    </div>

                    <div className="recipes-list__stars">
                      <ul className="recipes-list__stars__list">
                        <li className="recipes-list__stars__item"></li>
                      </ul>
                    </div>
                  </li>
                </CSSTransition>              
              ))}
            </TransitionGroup>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipesList;