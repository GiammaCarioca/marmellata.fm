import React, { useContext } from 'react'
import Mix from './Mix'

import MixesContext from '../context/mixes-context'

const Home = () => {
	const { mixes } = useContext(MixesContext)

	return (
		<div className="flex flex-wrap justify-between mixes ph3 ph4-l mb5">
			{mixes?.slice(0, 6).map((mix) => (
				<div key={mix.id} className="mix mb4">
					<Mix name={mix.name} id={mix.key} pictures={mix.pictures} mix={mix} />
				</div>
			))}
		</div>
	)
}

export default Home
