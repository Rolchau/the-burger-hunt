import React from 'react'

function BurgerShopShort(props) {
  const { name } = props.shop;
  return (
    <div onClick={props.handleClick}>
      {name}
    </div>
  );
}

export default BurgerShopShort;