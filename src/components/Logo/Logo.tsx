import { Link } from 'react-router-dom';
import './Logo.scss';

const Logo = () => {
  return (
    <Link className="logo" to="/">
      RM
    </Link>
  );
};

export default Logo;