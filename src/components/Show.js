import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import parseISO from 'date-fns/parseISO'
import differenceInDays from 'date-fns/differenceInDays'

import Stat from './Stat'

import MixesContext from '../context/mixes-context'

const Tag = ({ name, url }) => (
	<div className="mr2 mb2 o-70">
		<a
			className="block f6 link blue b ba bw-1 b--blue br2 pv1 ph2 lh-title"
			href={url}
			target="_blank"
			rel="noopener noreferrer"
		>
			{name}
		</a>
	</div>
)

const Tags = ({ tags }) => (
	<div className="tags flex flex-wrap">
		{tags?.map((tag) => (
			<Tag {...tag} />
		))}
	</div>
)

const Show = () => {
	const { data: mixes } = useContext(MixesContext)
	const [mix, setMix] = useState({})
	const { slug } = useParams()

	const getMixFromSlug = async (mixes, slug) => {
		const result = await mixes.filter((mix) => mix.slug === slug)

		if (result) return result[0]
	}

	getMixFromSlug(mixes, slug)

	useEffect(() => {
		const setShowPage = async (mixes, slug) => {
			const firstMix = await getMixFromSlug(mixes, slug)

			if (firstMix) setMix(firstMix)
		}

		setShowPage(mixes, slug)
	}, [mixes, slug])

	const { description, play_count, created_time, audio_length, tags } = mix

	return (
		<div className={'ph3 ph4-l pad-bottom'}>
			{mix && (
				<div className={'measure center lh-copy'}>
					<Tags tags={tags} />
					<p>{description}</p>

					<Stat
						statName="Plays"
						statNumber={play_count || 0}
						statWord="times"
					/>

					<Stat
						statName="Uploaded"
						statNumber={differenceInDays(new Date(), parseISO(created_time))}
						statWord="days ago"
					/>

					<Stat
						statName="Lasting for"
						statNumber={audio_length / 60}
						statWord="minutes"
					/>
				</div>
			)}
		</div>
	)
}

export default Show
