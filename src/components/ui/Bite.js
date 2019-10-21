import React from 'react'
import { css } from 'emotion';

const bite = css`
  width: 100px;
  height: 100px;
  position: fixed;
  z-index: 100;
  transform: translate(-50%, -50%);
`;

function Bite(props) {
  const position = {
    left: props.left,
    top: props.top,
  }
  return(
    <svg className={bite} style={position} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261 272"><path d="M107.303 24.035C99.39 19.557 90.243 17 80.5 17 50.4 17 26 41.4 26 71.5c0 2.776.208 5.504.608 8.168C10.673 89.18 0 106.593 0 126.5c0 20.45 11.263 38.27 27.925 47.593A54.56 54.56 0 0026 188.5c0 30.1 24.4 54.5 54.5 54.5 2.238 0 4.445-.135 6.613-.397C96.193 260.07 114.453 272 135.5 272c22.515 0 41.84-13.652 50.15-33.13A54.337 54.337 0 00206.5 243c30.1 0 54.5-24.4 54.5-54.5 0-15.809-6.73-30.045-17.483-40 10.752-9.955 17.483-24.192 17.483-40 0-29.933-24.132-54.23-54.002-54.498C206.73 24.132 182.433 0 152.5 0c-18.815 0-35.403 9.534-45.197 24.035z" fill="#FCBC4D" fillRule="evenodd"/></svg>
  );
}

export default Bite;