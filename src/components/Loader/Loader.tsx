import { createPortal } from "react-dom";
import './Loader.scss';

const Loader = () => {
  return (
    <>
      {createPortal(
        (
          <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
        ),
        document.getElementById('portal') as HTMLElement
      )}
  </>
  );
};

export default Loader;