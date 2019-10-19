import React from 'react'

function UserShort(props) {
  const { username, reviewCount, id } = props.user
  return (
    <div key={id} onClick={props.handleClick} >
      <p>{username}</p>
      <p>Reviewcount: {reviewCount}</p>
    </div>
  );
}

export default UserShort;