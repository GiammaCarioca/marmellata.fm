import React, { useContext } from 'react'

import MixContext from '../context/mix-context'

const PlayMix = ({ id, children }) => {
	const { playMix, currentMix, playing } = useContext(MixContext)

	return (
		// when our currently playing mix equals the id of the mix
		// that this component refers to, we will add a class name
		// of 'playing'
		<div
			className={`pointer ${id === currentMix && playing && 'playing'}`}
			onClick={() => playMix(id)}
		>
			{children}
		</div>
	)
}

export default PlayMix
