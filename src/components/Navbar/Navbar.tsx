import { NavLink } from "react-router-dom";
import cn from 'classnames';
import { links } from "./constants";
import './Navbar.scss';

const classes = ({ isActive }: { isActive: boolean}) => cn(
  "navbar__link", { active: isActive }
);

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {links.map(({ name, href }) => (
          <li key={href} className="navbar__item">
            <NavLink to={href} className={classes}>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;