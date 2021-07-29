import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const  Modal =({closeModal,children})=> {
  useEffect(()=>{
    window.addEventListener('keydown',handleKeyDown);
    return ()=>{
      window.removeEventListener('keydown',handleKeyDown);
    }
  })

  const handleKeyDown = e => {
    if (e.code === 'Escape') return closeModal();
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) return closeModal();
  };

    return createPortal(
      <div className="Overlay" onClick={handleBackdropClick}>
        <div className="Modal">{children}</div>
      </div>,
      modalRoot,
    );
}
