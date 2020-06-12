import React from 'react'
import Mix from './Mix'

const Home = () => (
	<div className="flex flex-wrap justify-between mixes ph3 ph4-l">
		{/* here we loop through all of our mixes */}
		<div className="mix mb4">
			<Mix
				name="Hyp 176: Throwing Shade"
				id="/Hyponik/hyp-176-throwing-shade/"
			/>
		</div>
		<div className="mix mb4">
			<Mix
				name="Born n Bread - 1st February 2020"
				id="/NTSRadio/born-n-bread-1st-february-2020/"
			/>
		</div>
	</div>
)

export default Home
