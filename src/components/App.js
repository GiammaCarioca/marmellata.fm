/* global Mixcloud*/
import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import FeaturedMix from './FeaturedMix'
import Header from './Header'

const Home = () => <h1>Home</h1>
const Archive = () => <h1>Archive</h1>
const About = () => <h1>About</h1>

const App = () => {
	const playerRef = useRef()
	const [widget, setWidget] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [currentMix, setCurrentMix] = useState('')

	useEffect(() => {
		const widget = Mixcloud.PlayerWidget(playerRef.current)

		// widget.ready.then((widget) => widget.play())

		const setupWidget = async (widget) => {
			await widget.ready

			// store the widget inside state so it's available outside this function
			setWidget(widget)

			// start playing the mix immediately
			// widget.play()

			// using the mixcloud widget events we can detect when our audio has been paused, set playing state to false
			widget.events.pause.on(() => setPlaying(false))

			//audio is playing again, so we set playing state to true
			widget.events.play.on(() => setPlaying(true))
		}

		setupWidget(widget)
	}, []) // the callback will only be fired once, similar to componentDidMount

	const togglePlay = () => {
		if (!widget) return
		widget.togglePlay()
	}

	const playMix = (mixName) => {
		// update the currentMix in our state with the mixName
		setCurrentMix(mixName)

		// load a new mix by its name and then start playing it immediately
		widget.load(mixName, true)
	}

	return (
		<Router>
			<div>
				<div className="flex-l justify-end">
					{/* FeaturedMix */}
					<FeaturedMix />

					<div className="w-50-l relative z-1">
						{/* Header */}
						<Header />

						{/* Routed page */}

						<div>
							<button onClick={() => togglePlay()}>
								{playing ? 'Pause' : 'Play'}
							</button>
						</div>

						<div>
							<h1>current playing: {currentMix}</h1>
							<button
								onClick={() => playMix('/NTSRadio/bonobo-24th-june-2015/')}
							>
								Play bonobo mix
							</button>

							<button
								onClick={() =>
									playMix('/NTSRadio/floating-points-four-tet-16th-march-2017/')
								}
							>
								Play four tet mix
							</button>
						</div>

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
					ref={playerRef}
				/>
			</div>
		</Router>
	)
}
export default App
