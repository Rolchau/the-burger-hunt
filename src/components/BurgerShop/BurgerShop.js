import React from 'react';
import PictureFrame from '../PictureFrame/PictureFrame';

function BurgerShop(props) {
  const {
    name,
    openFrom,
    openTo,
    openDays,
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
    <div className="fade-in max-w-5xl mx-auto m-4 p-6 bg-orange-200 rounded-lg shadow-xl">
      <h1 className="text-3xl sm:text-5xl text-orange-900">{name}</h1>
      <div className="flex flex-wrap">
        <p className="text-orange-900 my-4 max-w-xl mr-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati necessitatibus eligendi at, provident saepe alias iste consequatur voluptates reprehenderit unde?</p>
        <dl className="bg-orange-300 p-4 mt-4 rounded-lg text-orange-900 shadow w-64">
          <dt className="font-bold">Opening hours</dt>
          <dd>{openDays}</dd>
          <dd>
            {openFrom} - {openTo}
          </dd>
        </dl>
      </div>
      <h3 className="mt-3 text-3xl text-orange-900">Burger rating</h3>

      { hasReviews ?
          <div className="fade-in flex flex-wrap max-w-sm bg-orange-300 content-center p-4 mt-4 rounded-lg text-orange-900 shadow">
            <div className="text-6xl">{totalScore} </div>
            <ul className="self-center ml-4">
              <li>Taste: <span className="font-bold">{tasteScore}</span></li>
              <li>Texture: <span className="font-bold">{textureScore}</span></li>
              <li>Visual: <span className="font-bold">{visualScore}</span></li>
            </ul>
            <div className="w-full">No of reviews: <span className="font-bold">{reviewNo}</span></div>
          </div>
          : 
          <>
            <p className="text-orange-900"><strong>{name}</strong> has no reviews yet <span role="img" aria-label="Sad smiley">😢</span></p>
          </>
        }
      
      <h3 className="mt-3 text-3xl text-orange-900">Tried any of our burgers?</h3>
      <p className="text-orange-900">Then help us by rating how it was:</p>
      
      <button onClick={props.handleRateClick} className="inline-block mt-4 text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Rate us</button>
      
      <h3 className="mt-3 text-3xl text-orange-900">Images uploaded by our visitors:</h3>
      <p className="my-4 text-orange-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, eligendi.</p>
      <div className="flex flex-wrap mt-4 text-gray-700">
        {pictureBlocks}      
      </div>
    </div>
  );
}

export default BurgerShop;
