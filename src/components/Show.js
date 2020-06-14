import React from 'react'
import { useParams } from 'react-router-dom'

const Show = () => {
	let { slug } = useParams()

	return (
		<div>
			<h1>Show page: </h1>
			<p>{slug}</p>
		</div>
	)
}

export default Show
