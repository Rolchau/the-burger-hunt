import React from 'react';
import { Link } from 'react-router-dom';
import {css} from 'emotion';

function User(props) {
  const reviewItem = css`
    flex: 1 0 200px;
  `

  const scoreGrid = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `;

  const { username, email, reviews } = props.user
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
      <li key={review.id} className={reviewItem + " bg-gray-500 rounded shadow p-2 text-white text-sm m-4"}>
        <Link to={"/shop-detail/" + review.shopId}>
          <div>{review.shopName}</div>
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

  return (
    <div className="fade-in bg-white rounded-lg max-w-4xl p-6 mx-auto shadow-lg">
      <h1 className="text-5xl text-gray-700">{username} {youTxt}</h1>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nobis iste neque accusamus at harum eos voluptatum nemo iusto blanditiis.</div>
      {emailBox}
      <h2 className="text-2xl text-gray-700 mt-8">{reviewTitle}:</h2>
      <ul className="flex flex-wrap mt-4 -ml-4 -mr-4">{reviewBlocks}</ul>
    </div>
  );
}

export default User;