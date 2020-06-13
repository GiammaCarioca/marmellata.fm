import React, { useContext } from 'react'

import MixesContext from '../context/mixes-context'

const PlayMix = ({ id, children }) => {
	const { playMix } = useContext(MixesContext)

	return (
		<div className="pointer" onClick={() => playMix(id)}>
			{children}
		</div>
	)
}

export default PlayMix
