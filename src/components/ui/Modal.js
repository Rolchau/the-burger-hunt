import React from 'react';
import { css, keyframes } from 'emotion';

const fadeInSlideUp = keyframes`
  0% {
    transform: translateY(5%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const modalWrapper = css`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1001;
`;

const modal = css`
  pointer-events: all;
  z-index: 1000;
  margin: auto;
  max-width: 640px;
  height: 100%;
  width: 100%;
  position: fixed;
  will-change: transform;
  animation: ${fadeInSlideUp} 0.2s ease forwards;
  @media (min-width: 38em) {
    height: 80%;
    max-height: 80%;
    position: relative;
    display: flex;
    flex-direction: column;
  }  
`;

const modalOverlay = css`
  cursor: pointer;
  position: fixed;
  width: 100%;
  height: 100%;
  visibility: hidden;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0;
  background: rgba(0, 0, 0, .7);
  transition: all .25s;

  .is-open & {
    visibility: visible;
    opacity: 1;
  }
`;

function Modal(props) {
  return (  
    <div className={modalWrapper + ' is-open'}>
      <div className={modal + ' rounded-lg p-8 bg-orange-200 text-orange-900'}>
        {props.children}
      </div>
      <div className={modalOverlay}></div>
    </div>
  );
}

export default Modal;
