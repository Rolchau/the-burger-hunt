import React from 'react'
import Icon from '../ui/Icon';

function BurgerShopShort(props) {
  const { name, score } = props.shop;

  let getSmiley = (score) => {
    let smiley;
    const roundScore = Math.round(score);
    switch (roundScore) {
      case 1:
        smiley = <Icon name="angry2"></Icon>
        break;
      case 2:
        smiley = <Icon name="sad2"></Icon>
        break;
      case 3:
        smiley = <Icon name="tongue2"></Icon>
        break;
      case 4:
        smiley = <Icon name="wink2"></Icon>
        break;
      case 5:
        smiley = <Icon name="grin2"></Icon>
        break;
      default:
        smiley = <Icon name="neutral2"></Icon>
    }
    return smiley;
  }

  return (
    <div onClick={props.handleClick}>
      {name}
      <div>
        {score}
        {getSmiley(score)}
      </div>
    </div>
  );
}

export default BurgerShopShort;