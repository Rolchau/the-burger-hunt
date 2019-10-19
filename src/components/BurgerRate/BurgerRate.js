import React from 'react';
import {css} from 'emotion';
import Icon from '../ui/Icon';

function BurgerRate(props) {
  
  const starWrapper = css`
    width: 2.5em;
    height: 2.5em;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &:nth-child(2) svg {
      transition-delay: 40ms;
    }
    &:nth-child(3) svg {
      transition-delay: 80ms;
    }
    &:nth-child(4) svg {
      transition-delay: 120ms;
    }
    &:nth-child(5) svg {
      transition-delay: 160ms;
    }

    &.active svg {
      fill: blue;
    }
  `

  const { selectedNo } = props;
  
  return(
    <div>
      <button className={starWrapper + (selectedNo >= 1 ? ' active' : '')} onClick={() => props.getRating(props.type, 1)}><Icon name="star-full"></Icon></button>
      <button className={starWrapper + (selectedNo >= 2 ? ' active' : '')} onClick={() => props.getRating(props.type, 2)}><Icon name="star-full"></Icon></button>
      <button className={starWrapper + (selectedNo >= 3 ? ' active' : '')} onClick={() => props.getRating(props.type, 3)}><Icon name="star-full"></Icon></button>
      <button className={starWrapper + (selectedNo >= 4 ? ' active' : '')} onClick={() => props.getRating(props.type, 4)}><Icon name="star-full"></Icon></button>
      <button className={starWrapper + (selectedNo >= 5 ? ' active' : '')} onClick={() => props.getRating(props.type, 5)}><Icon name="star-full"></Icon></button>
    </div>
  );
}

export default BurgerRate;
