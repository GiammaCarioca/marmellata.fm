import React, { useContext } from 'react'
import PlayMix from './PlayMix'
import PlayButton from './PlayButton'

import MixesContext from '../context/mixes-context'

const Archive = () => {
	const { mixes } = useContext(MixesContext)

	return (
		<ul className="list pl0 archive mv0 pad-bottom">
			{mixes?.map(({ key, id, name }) => (
				<li key={key} className="ph3 ph4-l">
					<PlayMix id={id}>
						<div className="pv3 bb b--light-gray flex justify-between items-center">
							<h1 className="f6 mv0 black ttu biryani pr2">{name}</h1>
							<PlayButton />
						</div>
					</PlayMix>
				</li>
			))}
		</ul>
	)
}

export default Archive
