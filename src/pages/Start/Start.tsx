import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as recipeActions from '../../redux/slices/recipeSlice';
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import './Start.scss';

const Start = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(state => state.user).user;
  const { recipe, loading, error } = useAppSelector(state => state.recipe);
  const { id } = useParams();
  const navigate = useNavigate();

  const [statusBarCount, setStatusBarCount] = useState(0);
  const [disabledIng, setDisabledIng] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const onClick = (value: string) => {
    if (recipe) {
      setStatusBarCount(prev => prev + 100 / (recipe.recipe.length));
      setDisabledIng(prev => ([...prev, value]));
    }
  };

  const onClickCancel = () => {
    setDisabledIng([]);
    setStatusBarCount(0);
    setIsSuccess(false);
  };
  
  useEffect(() => {
    if (!email.length) {
      navigate("/signIn");
    }

    if (id) {
      dispatch(recipeActions.init(+id));
    }
  }, []);

  useEffect(() => {
    if (recipe && recipe?.recipe.length === disabledIng.length) {
      setIsSuccess(true);
    }
  }, [disabledIng]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error</p>;
  }

  if (!recipe) {
    return <p>Not found</p>
  }
  
  return (
    <>
      <section className="page__section start">
        <div className="container">
          <div className="start__wrapper">
            <BreadCrumbs />

            <div className="start__status-bar">
              <div
                className="start__status-bar__com"
                style={{ width: `${statusBarCount}%` }}
              ></div>
            </div>
  
            <h2 className="start__title">{recipe.name}</h2>
  
            <div className="start__main__wrapper">
              <img
                className="start__img"
                src={recipe.img}
                alt="product"
              />
    
              <ul className="start__list">
                {recipe.recipe.map(value => (
                  <li key={value} className="start__item">
                    <button
                      className="start__item__btn"
                      onClick={() => onClick(value)}
                      disabled={disabledIng.includes(value)}
                    >
                      {value}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="start__btn"
              onClick={onClickCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </section>

      {isSuccess && <Modal name="My congratulation!" />}
    </>
  );
};

export default Start;