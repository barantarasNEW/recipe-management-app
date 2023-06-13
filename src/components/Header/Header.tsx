import Navbar from "../Navbar/Navbar";
import Logo from "../Logo/Logo";
import Userbar from "../Userbar/Userbar";
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />

          <Navbar />

          <Userbar />
        </div>
      </div>
    </header>
  );
};

export default Header;