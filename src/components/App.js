/* global Mixcloud*/
import React, { useState, useRef, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MixesContext from '../context/mixes-context'

import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'

const Archive = () => <h1>Archive</h1>
const About = () => <h1>About</h1>

const App = () => {
	const context = useContext(MixesContext)
	context.displayName = 'Mixes'

	const playerRef = useRef()
	const [widget, setWidget] = useState(null)
	// eslint-disable-next-line no-unused-vars
	const [playing, setPlaying] = useState(false)
	const [currentMix, setCurrentMix] = useState('')

	useEffect(() => {
		const widget = Mixcloud.PlayerWidget(playerRef.current)

		const initialMix = playerRef.current.id

		// get the mix from the iframe and set it to state
		setCurrentMix(initialMix)

		const setupWidget = async (widget) => {
			// wait until the widget is ready
			await widget.ready

			// store the widget inside state so it's available outside this function
			setWidget(widget)

			// start playing the mix immediately; inconsistent
			// widget.play()

			widget.events.pause.on(() => setPlaying(false)) // not working!
			widget.events.play.on(() => setPlaying(true)) // not working!
		}

		setupWidget(widget)
	}, []) // the callback will only be fired once, similar to componentDidMount

	useEffect(() => {
		const iframe = playerRef.current
		const srcBase =
			'https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed='

		iframe.removeAttribute('src')

		requestAnimationFrame(() => {
			iframe.src = srcBase + currentMix
		})
	}, [currentMix])

	const playMix = (mixName) => {
		if (!widget) return

		if (currentMix === mixName) {
			widget.togglePlay()

			widget.events.pause.on(() => setPlaying(false))
			widget.events.play.on(() => setPlaying(true))

			return
		}

		if (currentMix !== mixName) {
			// update the currentMix in our state with the mixName
			setCurrentMix(mixName)

			// load a new mix by its name and then start playing it immediately
			widget.load(mixName, false)

			widget.events.pause.on(() => setPlaying(false))
			widget.events.play.on(() => setPlaying(true))

			return
		}
	}

	return (
		<MixesContext.Provider value={{ ...context, playMix, currentMix }}>
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
						src={context.defaultMix.src}
						className="db fixed bottom-0 z-5"
						ref={playerRef}
						id={context.defaultMix.id}
						sandbox="allow-scripts allow-same-origin"
					></iframe>
				</div>
			</Router>
		</MixesContext.Provider>
	)
}
export default App
