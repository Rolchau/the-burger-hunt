import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import PictureFrame from '../PictureFrame/PictureFrame';

function BurgerShop(props) {
  const burgerImg = css`
    max-width: 100%;
  `;

  const burgerImgWrapper = css`
    width: 200px;
    height: 150px;
    border: 1px solid gray;
    border-radius: 16px;
    overflow: hidden;
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

  const pictures = props.pictures;
  let pictureBlocks = (
    <div className="text-red-500">There is no pictures yet.</div>
  );
  if (pictures.length) {
    pictureBlocks = pictures.map(picture => <PictureFrame key={picture.id} picture={picture} />)
  }

  return (
    <div className="fade-in max-w-xl mx-auto m-4 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="sm:text-5xl text-3xl text-gray-600">{name}</h1>
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

      <h3 className="mt-3 text-2xl text-gray-700">Images uploaded by our visitors:</h3>
      <p className="my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, eligendi.</p>
      <div className="flex flex-wrap mt-4 text-gray-700">
        {pictureBlocks}      
      </div>
    </div>
  );
}

export default BurgerShop;
