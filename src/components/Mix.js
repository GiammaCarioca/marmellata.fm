import React, { useContext } from 'react'
import PlayButton from './PlayButton'

import MixesContext from '../context/mixes-context'

const Mix = ({ name, id }) => {
	const { playMix } = useContext(MixesContext)

	return (
		<div
			className="aspect-ratio aspect-ratio--3x4 pointer bg-black"
			onClick={() => playMix(id)}
		>
			<div className="ph3 pv4 aspect-ratio--object mix-overlay">
				<div className="flex items-center relative z-2">
					<h1 className="f4 f3-l mv0 white ttu biryani pr2 lh-title">{name}</h1>
					{/* PlayButton goes here */}
					<PlayButton />
				</div>
			</div>
		</div>
	)
}

export default Mix
