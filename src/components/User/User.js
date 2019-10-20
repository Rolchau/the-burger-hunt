import React from 'react';
import {css} from 'emotion';

const user = css`
  background-color: pink;
  color: purple;
  margin-bottom: 16px;
`;

function User(props) {
  const { username } = props.user
  
  return (
    <li className={user} onClick={props.handleClick}>
      <ul>
        <li>User name: <strong>{ username }</strong></li>
      </ul>
    </li>
  );
}

export default User;