import React from "react";
import { css } from "emotion";

function BurgerShop(props) {
  const burgerImg = css`
    max-width: 100%;
    border: none;
  `;

  const burgerImgWrapper = css`
    width: 200px;
    height: 150px;
    border: 1px solid white;
  `;

  const {
    name,
    tasteScore,
    textureScore,
    visualScore,
    avgScore,
    openFrom,
    openTo,
    openDays
  } = props.shopDetails;

  const pictureArr = props.shopDetails.pictures;
  const pictures = pictureArr.map(img => (
    <div key={img.id} className={burgerImgWrapper}>
      <img className={burgerImg} src={img.imageUrl} alt="" />
    </div>
  ));

  return (
    <div>
      <h1>{name}</h1>
      <dl>
        <dt>Opening hours</dt>
        <dd>{openDays}</dd>
        <dd>
          {openFrom} - {openTo}
        </dd>
      </dl>
      <h2>Score: {avgScore}</h2>
      <h3>Taste: {tasteScore}</h3>
      <h3>Texture: {textureScore}</h3>
      <h3>Visual: {visualScore}</h3>
      <h3>{pictures}</h3>
    </div>
  );
}

export default BurgerShop;
