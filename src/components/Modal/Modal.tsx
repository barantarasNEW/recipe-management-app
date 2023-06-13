import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import './Modal.scss';

type Props = {
  name: string;
}

const Modal: React.FC<Props> = ({ name }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [setIsOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {createPortal(
        (
         <div className="modal">
          {name}
         </div>
        ),
        document.getElementById('portal') as HTMLElement
      )}
  </>
  );
};

export default Modal;