/* global Mixcloud*/
import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'

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

		const setupWidget = async (widget) => {
			// wait until the widget is ready
			await widget.ready

			// store the widget inside state so it's available outside this function
			setWidget(widget)

			// start playing the mix immediately; inconsistent
			widget.play()

			// widget.getIsPaused().then((paused) => console.log('is paused?', paused))
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
	}, [currentMix, widget])

	const playMix = (mixName) => {
		if (!widget) return

		if (currentMix === mixName) {
			console.log('equal?', currentMix === mixName)
			widget.togglePlay()

			widget.events.pause.on(() => setPlaying(false))
			widget.events.play.on(() => setPlaying(true))

			return
		}

		if (currentMix !== mixName) {
			// update the currentMix in our state with the mixName
			setCurrentMix(mixName)

			// load a new mix by its name and then start playing it immediately
			widget.load(mixName, true)

			widget.events.pause.on(() => setPlaying(false))
			widget.events.play.on(() => setPlaying(true))

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
					className="db fixed bottom-0 z-5"
					ref={playerRef}
					id="/NTSRadio/floating-points-jamie-xx-18th-august-2016/"
					sandbox="allow-scripts allow-same-origin"
					allow="autoplay 'src' https://www.mixcloud.com/"
				></iframe>
			</div>
		</Router>
	)
}
export default App
