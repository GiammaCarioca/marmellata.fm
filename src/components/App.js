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

		const initialMix = playerRef.current.id

		// get the mix from the iframe and set it to state
		setCurrentMix(initialMix)

		// widget.ready.then((widget) => widget.play())

		const setupWidget = async (widget) => {
			// wait until the widget is ready
			await widget.ready

			// store the widget inside state so it's available outside this function
			setWidget(widget)

			// using the mixcloud widget events we can detect when our audio has been paused, set playing state to false
			widget.events.pause.on(() => setPlaying(false))

			//audio is playing again, so we set playing state to true
			widget.events.play.on(() => setPlaying(true))

			// start playing the mix immediately; inconsistent
			widget.play()
		}

		setupWidget(widget)
	}, []) // the callback will only be fired once, similar to componentDidMount

	const playMix = (mixName) => {
		// widget.getIsPaused().then((paused) => console.log('is paused?', paused))

		if (!widget) return

		if (currentMix === mixName) {
			// update the currentMix in our state with the mixName
			// setCurrentMix(mixName) // asynchronous!!!

			console.log('equal?', currentMix === mixName)
			widget.togglePlay()

			widget.events.pause.on(() => setPlaying(false)) // asynchronous!!!
			widget.events.play.on(() => setPlaying(true)) // asynchronous!!!

			return
		}

		if (currentMix !== mixName) {
			console.log('equal?', currentMix === mixName)
			console.log('play this!', mixName)

			// update the currentMix in our state with the mixName
			setCurrentMix(mixName) // asynchronous!!!

			// load a new mix by its name and then start playing it immediately
			widget.load(mixName, true)

			widget.events.pause.on(() => setPlaying(false)) // asynchronous!!!
			widget.events.play.on(() => setPlaying(true)) // asynchronous!!!

			return
		}
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
							{!!currentMix && <h1>current mix: {currentMix}</h1>}
							{playing ? <p>playing</p> : <p>paused</p>}
							<button
								onClick={() => playMix('/NTSRadio/bonobo-24th-june-2015/')}
							>
								'Play/Pause bonobo mix'
							</button>

							<button
								onClick={() =>
									playMix('/NTSRadio/floating-points-four-tet-16th-march-2017/')
								}
							>
								Play/Pause four tet mix'
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
					id="/NTSRadio/floating-points-jamie-xx-18th-august-2016/"
					ref={playerRef}
				/>
			</div>
		</Router>
	)
}
export default App
