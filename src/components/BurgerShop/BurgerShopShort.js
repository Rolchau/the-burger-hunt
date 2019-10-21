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
    <a href="/prevented" onClick={props.handleClick} className="flex border-b content-center border-orange-400 py-2 hover:bg-orange-300">
      <span className="mr-4 self-center">{getSmiley(score)}</span>
      <div className="text-xl self-center font-bold">{name}</div>
      <div className="ml-auto">
        <span className="text-3xl">{score}</span>        
      </div>
    </a>
  );
}

export default BurgerShopShort;