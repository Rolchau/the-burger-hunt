import React from "react";
import { css } from "emotion";

function BurgerShopDetails(props) {
  const burgerImg = css`
    max-width: 100%;
    border: none;
  `;

  const burgerImgWrapper = css`
    width: 200px;
    height: 150px;
  `;

  const {
    name,
    openFrom,
    openTo,
    openDays
  } = props.shopDetails;

  const pictureArr = props.shopDetails.pictures;
  const pictures = pictureArr.map(img => (
    <div key={img.id} className={burgerImgWrapper + ' border-gray-1'}>
      <img className={burgerImg} src={img.imageUrl} alt="" />
    </div>
  ));

  return (
    <div className="max-w-xl mx-auto m-4 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-5xl text-gray-600">{name}</h1>
      <dl>
        <dt>Opening hours</dt>
        <dd>{openDays}</dd>
        <dd>
          {openFrom} - {openTo}
        </dd>
      </dl>
      <h2>Score: </h2>
      <h3>Taste: </h3>
      <h3>Texture: </h3>
      <h3>Visual: </h3>
      <h3>{pictures}</h3>
    </div>
  );
}

export default BurgerShopDetails;
