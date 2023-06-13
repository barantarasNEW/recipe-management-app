import { useNavigate } from "react-router";
import './BreadCrumbs.scss';

const BreadCrumbs = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className="bread-crumbs">
      <button className="bread-crumbs__btn" onClick={onClick}>
        <img
          className="bread-crumbs__icon"
          src="/assets/icons/back.svg"
          alt="icon"
        />
        
        Back
      </button>
    </div>
  );
};

export default BreadCrumbs;