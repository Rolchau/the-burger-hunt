import React from 'react'
import { Link } from 'react-router-dom';
import { css } from  'emotion';

const pictureWrapper = css`
  font-family: 'Shadows Into Light', cursive;
  padding: 12px;
  background-color: #f7f7f7;
  transform: skew(-1deg, 1deg);
  border: 1px solid gray;
  width: 240px;
  box-shadow: 7px 7px 5px -3px rgba(0,0,0,0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  &:nth-child(odd) {
    transform: skew(1deg,-1deg);
  }  
`;

const imageWrapper = css`
  border: 1px solid #2f2f2f;
  background-color: black;
  min-width: 200px;
  min-height: 160px;
`;

const shop = css`
  font-size: 20px;
`;

const author = css`
  font-size: 24px;
`;

function Picture(props) {
  const { shopId, imageUrl, shopName, userName } = props.picture;
  const shopBlock = <div className={shop}>{shopName}</div>;

  const linkedShop = props.showShopLink ? <Link to={'/shop-detail/' + shopId}>{shopBlock}</Link> : <>{shopBlock}</>;

  const imageBlock = (
    <div className={pictureWrapper + ' ml-4 mb-4'}>
      <img className={imageWrapper} src={imageUrl} alt="Delicious looking burger food" />
      {linkedShop}
      <div className={author}>By: {userName}</div>
    </div>
  );

  return (
    <>
      {imageBlock}
    </>
  );
}

export default Picture;