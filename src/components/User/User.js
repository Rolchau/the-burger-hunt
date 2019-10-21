import React from 'react';
import { Link } from 'react-router-dom';
import {css} from 'emotion';
import PictureFrame from '../PictureFrame/PictureFrame';

function User(props) {
  const reviewItem = css`
    flex: 1 0 150px;
    max-width: 200px;
  `

  const scoreGrid = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `;

  const { username, email, reviews, pictures } = props.user
  const youTxt = props.yourself ? '(You)' : '';

  let emailBox = "";
  if (props.yourself) {
    emailBox = (
      <div className="bg-gray-200 p-4 mt-4 rounded-lg max-w-md border-gray-400 border shadow">
        <div className="text-gray-500">Email (Only visible to you):</div>
        <div className="font-bold text-gray-800">
          {email}
          <span className="ml-3 font-normal text-red-500">Edit</span>
        </div>
      </div>
    );
  }
  
  let reviewTitle = props.yourself ? 'Your reviews' : `${username} reviews`;

  let reviewBlocks = <div className="text-red-500">There is no reviews yet.</div>
  if (reviews) {
    reviewBlocks = reviews && reviews.map(review => 
      <li key={review.id} className={reviewItem + " bg-white rounded-lg shadow-md p-2 text-sm m-6 mb-2 border border-gray-300"}>
        <Link to={"/shop-detail/" + review.shopId}>
          <div className="font-bold truncate">{review.shopName}</div>
          <dl className={scoreGrid}>
            <dt>Taste:</dt>
            <dd className="text-right">{review.tasteScore}</dd>
            <dt>Visual:</dt>
            <dd className="text-right">{review.textureScore}</dd>
            <dt >Texture:</dt>
            <dd className="text-right">{review.textureScore}</dd>
          </dl>
        </Link>
      </li>
    )
  }
  
  let pictureTitle = props.yourself ? 'Your pictures' : `${username} pictures`;
  let pictureBlocks = <div className="text-red-500">There is no pictures yet.</div>
  if (pictures) {
    pictureBlocks = pictures.map(picture => <PictureFrame key={picture.id} picture={picture} showShopLink={true} />)
  }

  return (
    <div className="fade-in bg-white rounded-lg max-w-4xl p-6 mx-auto shadow-lg">
      <h1 className="text-5xl text-gray-700">{username} {youTxt}</h1>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nobis iste neque accusamus at harum eos voluptatum nemo iusto blanditiis.</div>
      {emailBox}
      <h2 className="text-2xl text-gray-700 mt-8">{reviewTitle}:</h2>
      <ul className="flex justify-center bg-gray-200 flex-wrap mt-4 -ml-6 -mr-6 pb-4 text-gray-700">{reviewBlocks}</ul>
      <h2 className="text-2xl text-gray-700 mt-8">{pictureTitle}:</h2>
      <div className="flex flex-wrap mt-4 text-gray-700">{pictureBlocks}</div>
    </div>
  );
}

export default User;