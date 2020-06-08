import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import FeaturedMix from './FeaturedMix'
import Header from './Header'

const Home = () => <h1>Home</h1>
const Archive = () => <h1>Archive</h1>
const About = () => <h1>About</h1>

const App = () => (
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
					</Switch>
				</div>
			</div>

			{/* AudioPlayer */}
			<iframe
				title="mixcloud"
				width="100%"
				height="60"
				src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F"
				frameBorder="0"
				className="db fixed bottom-0 z-5"
			/>
		</div>
	</Router>
)

export default App
