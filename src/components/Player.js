/* global Mixcloud*/
import React, { useRef, useState, useEffect, useContext } from 'react'

import MixesContext from '../context/mixes-context'

const Player = ({ setMixes }) => {
	const context = useContext(MixesContext)
	const mixesIds = context.context.mixes

	const playerRef = useRef()
	const [widget, setWidget] = useState(null)
	// eslint-disable-next-line no-unused-vars
	const [playing, setPlaying] = useState(false)
	const [currentMix, setCurrentMix] = useState('')

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
	}, [mixesIds, setMixes])

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
	)
}

export default Player
