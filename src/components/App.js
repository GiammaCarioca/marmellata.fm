/* global Mixcloud*/
import React, { useState, useRef, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MixesContext from '../context/mixes-context'

import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'
import Archive from './Archive'
import About from './About'
import Show from './Show'

const App = () => {
	const context = useContext(MixesContext)
	const mixesIds = context.mixes

	const playerRef = useRef()
	const [widget, setWidget] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [currentMix, setCurrentMix] = useState('')
	const [mixes, setMixes] = useState([])

	useEffect(() => {
		const fetchingMixes = (mixesIds) => {
			return Promise.all(
				mixesIds.map((id) =>
					fetch(`https://api.mixcloud.com${id}`)
						.then((response) => response.json())
						.then((data) => data)
				)
			)
		}

		const updateWithIds = (mixes) => {
			return mixes.map((mix) => ({
				...mix,
				id: mix.key,
			}))
		}

		const setData = async (mixesIds) => {
			const mixesWithoutIds = await fetchingMixes(mixesIds)
			const mixesWithIds = await updateWithIds(mixesWithoutIds)

			return setMixes(mixesWithIds)
		}

		setData(mixesIds)
	}, [mixesIds])

	useEffect(() => {
		const widget = Mixcloud.PlayerWidget(playerRef.current)

		setCurrentMix(playerRef.current.id)

		const setupWidget = async (widget) => {
			await widget.ready

			setWidget(widget)
		}

		setupWidget(widget)
	}, [])

	useEffect(() => {
		const iframe = playerRef.current

		const replaceSrc = (iframe) => {
			const srcBase =
				'https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed='

			iframe.removeAttribute('src')

			requestAnimationFrame(() => {
				iframe.src = srcBase + currentMix
			})
		}

		replaceSrc(iframe)
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
				mixes,
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
								<Route path="/show/:slug">
									<Show />
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
