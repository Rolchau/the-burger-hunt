import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

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
    openDays,
    id
  } = props.shopDetails;

  const {
    textureScore,
    tasteScore, 
    visualScore,
    totalScore,
    reviewNo
  } = props.reviews;

  const hasReviews = reviewNo > 0 ? true : false;

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
      { hasReviews ?
          <>
            <h2>Score: {totalScore} </h2>
            <h3>Taste: {tasteScore} </h3>
            <h3>Texture: {textureScore} </h3>
            <h3>Visual: {visualScore} </h3>
            <p>Total reviews: {reviewNo}</p>
          </>
          : 
          <>
            <p><strong>{name}</strong> has no reviews yet <span role="img" aria-label="Sad smiley">😢</span></p>
          </>
        }
      
      <Link to={'/rate/' + id} className="bg-yellow-600 hover:bg-yellow-700 transition-fast text-white font-bold py-2 px-4 rounded-full">
        Rate it
      </Link>

      <h3 className="mt-3 text-2xl text-gray-700">User pictures</h3>
      {pictures}
    </div>
  );
}

export default BurgerShopDetails;
