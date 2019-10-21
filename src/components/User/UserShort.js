import React from 'react'

function UserShort(props) {
  const { username, reviewCount, id } = props.user
  return (
    
    <div className="border-orange-300 border-b -mx-6 hover:bg-orange-400 px-6 flex content-center justify-between cursor-pointer" key={id} onClick={props.handleClick} >
      <div className="self-center">{username}</div>
      <div className="text-3xl font-bold text-orange-600">{reviewCount}</div>
    </div>
  );
}

export default UserShort;