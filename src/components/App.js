import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import GlobalState from '../context/GlobalState'

import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'
import Archive from './Archive'
import About from './About'
import Show from './Show'
import Player from './Player'

const App = () => {
	return (
		<GlobalState>
			<Router>
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
				<Player />
			</Router>
		</GlobalState>
	)
}
export default App
