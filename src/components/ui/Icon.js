import React from 'react'
import {css} from 'emotion';
import icons from '../../assets/sprite.svg'

const icon = css`
  width: 30px;
  height: 30px;
  color: currentColor;
  stroke-width: 1.5;
  fill: currentColor;
  transition: fill 0.15s ease-in-out, color 0.15s ease-in-out;
`

function Icon(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			className={icon + ` icon-${props.name}`}
		>
			<use xlinkHref={`${icons}#icon-${props.name}`} />
		</svg>
	)
}

export default Icon