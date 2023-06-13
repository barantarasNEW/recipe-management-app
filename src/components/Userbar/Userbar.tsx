import { useContext } from "react";
import { Link } from "react-router-dom";
import { Liked } from "../../context/Liked";
import { useAppSelector } from "../../hooks/useRedux";
import './Userbar.scss';

const Userbar = () => {
  const { email } = useAppSelector(state => state.user).user;
  const { liked } = useContext(Liked);

  return (
    <nav className="userbar">
      <ul className="userbar__list">
      <li className="userbar__item">
        <Link
          className="userbar__link"
          to="/liked"
        >
          <img
            className="userbar__icon"
            src="./assets/icons/heart.svg"
            alt="icon"
          />

          <div className="userbar__count">
            {email.length && liked.length}
          </div>
          </Link>
        </li>

        {email.length
          ? (
            <li className="userbar__item">
              <Link
                className="userbar__link"
                to="/user"
              >
                <img
                  className="userbar__icon"
                  src="./assets/icons/user.svg"
                  alt="icon"
                />
              </Link>
            </li>
          )
          : (
            <li className="userbar__item">
              <Link
                className="btn"
                to="/signIn"
              >
                Sign In
              </Link>
            </li>
          )}
      </ul>
    </nav>
  );
};

export default Userbar;