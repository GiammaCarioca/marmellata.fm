/* global Mixcloud*/
import React, { useState, useRef, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MixesContext from '../context/mixes-context'

import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'
import Archive from './Archive'
import About from './About'

const App = () => {
	const context = useContext(MixesContext)
	const mixesIds = context.mixes

	const playerRef = useRef()
	const [widget, setWidget] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [currentMix, setCurrentMix] = useState('')
	const [data, setData] = useState([])

	useEffect(() => {
		const getMixes = () => {
			return Promise.all(
				mixesIds.map((id) =>
					fetch(`https://api.mixcloud.com${id}`)
						.then((response) => response.json())
						.then((data) => data)
				)
			).then((data) =>
				data.map((mix) => ({
					...mix,
					id: mix.key,
				}))
			)
		}

		const setMixes = async () => {
			const mixesWithId = await getMixes()

			return setData(mixesWithId)
		}

		setMixes()
	}, [mixesIds])

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

			setPlaying(false)

			widget.events.pause.on(() => setPlaying(false))
			widget.events.play.on(() => setPlaying(true))

			return
		}
	}

	return (
		<MixesContext.Provider
			value={{
				widget,
				data,
				playMix,
				currentMix,
				playing,
			}}
		>
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
						ref={playerRef}
						title="mixcloud-iframe"
						sandbox="allow-scripts allow-same-origin"
						width="100%"
						height="60"
						className="db fixed bottom-0 z-5"
						src="%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F"
						id="/NTSRadio/floating-points-jamie-xx-18th-august-2016/"
					></iframe>
				</div>
			</Router>
		</MixesContext.Provider>
	)
}
export default App
