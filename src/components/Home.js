import React, { useContext } from 'react'
import Mix from './Mix'

import MixesContext from '../context/mixes-context'

const Home = () => {
	const { mixes } = useContext(MixesContext)

	return (
		<div className="flex flex-wrap justify-between mixes ph3 ph4-l">
			{/* here we loop through all of our mixes */}
			{mixes.map((mix) => (
				<div key={mix.id} className="mix mb4">
					<Mix name={mix.title} id={mix.src} />
				</div>
			))}
		</div>
	)
}

export default Home
