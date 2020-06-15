import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MixesContext from '../context/mixes-context'

import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'
import Archive from './Archive'
import About from './About'
import Show from './Show'
import Player from './Player'

const App = () => {
	const context = useContext(MixesContext)

	const [mixes, setMixes] = useState([])

	// get updated values from child component
	const updateValues = (newValue) => {
		setMixes(newValue)
	}

	return (
		<MixesContext.Provider value={{ context, mixes }}>
			<Router>
				<div>
					<div className="flex-l justify-end">
						{/* FeaturedMix */}
						<FeaturedMix />

						<div className="w-50-l relative z-1">
							{/* Header */}
							<Header />

							{/* Routed page */}
							<Switch>
								<Route exact path="/">
									<Home />
								</Route>
								<Route path="/archive">
									<Archive />
								</Route>
								<Route path="/about">
									<About />
								</Route>
								<Route path="/show/:slug">
									<Show />
								</Route>
							</Switch>
						</div>
					</div>
					{/* AudioPlayer */}
					<Player setMixes={updateValues} />
				</div>
			</Router>
		</MixesContext.Provider>
	)
}
export default App
