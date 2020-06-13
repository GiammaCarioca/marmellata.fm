import React, { useContext } from 'react'

import MixesContext from '../context/mixes-context'

const PlayMix = ({ id, children }) => {
	const { playMix, currentMix } = useContext(MixesContext)

	return (
		// when our currently playing mix equals the id of the mix
		// that this component refers to, we will add a class name
		// of 'playing'
		<div
			className={`pointer ${id === currentMix && 'playing'}`}
			onClick={() => playMix(id)}
		>
			{children}
		</div>
	)
}

export default PlayMix
