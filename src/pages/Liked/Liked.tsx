import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import RecipesList from "../../components/RecipesList/RecipesList";
import { Liked as LikedContext } from "../../context/Liked";
import { useAppSelector } from "../../hooks/useRedux";
import './Liked.scss';

const Liked = () => {
  const { email } = useAppSelector(state => state.user).user;
  const { liked } = useContext(LikedContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email.length) {
      navigate("/signIn");
    }
  }, []);

  if (!email.length) {
    return <></>;
  }

  if (!liked.length) {
    return <p className="not-have">You don't have like recipes</p>;
  }

  return (
    <section className="page__section liked">
      <div className="container">
        <h1 className="title">
          Like recipes
        </h1>

        <RecipesList recipes={liked} />
      </div>
    </section>
  );
};

export default Liked;