import React, { useContext } from 'react'
import PlayMix from './PlayMix'
import PlayButton from './PlayButton'

import MixContext from '../context/mix-context'

const FeaturedMix = () => {
	const { mixes } = useContext(MixContext)

	// this makes a variable from our first mix in the array
	const [firstMix = {}] = mixes
	const { id, name, pictures = {} } = firstMix

	return (
		<>
			{firstMix && (
				<div
					className="w-50-l vh-100 flex items-center justify-center cover bg-center bg-featured pad-bottom fixed-l left-0 mix-overlay"
					style={{
						backgroundImage: `url(${pictures.extra_large})`,
					}}
				>
					<PlayMix id={id}>
						<div className="w-100 tc pa3 relative z-2">
							<p className="b biryani f6 white ttu">Featured mix</p>
							<h1 className="mix-title mt0 mb3 anton white ttu">{name}</h1>
							<PlayButton />
						</div>
					</PlayMix>
				</div>
			)}
		</>
	)
}

export default FeaturedMix
