import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useRedux";
import './Home.scss';

const Home = () => {
  const { firstName } = useAppSelector(state => state.user).user;

  return (
    <section className="page__section home">
      <div className="container">
        <div className="home__wrapper">
          <h1 className="page__title">
            Welcome,
            <br />
            {firstName}
          </h1>

          <Link to="/recipes" className="btn">
            Let's start
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;