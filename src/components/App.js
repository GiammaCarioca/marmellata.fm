import React from 'react'

import FeaturedMix from './FeaturedMix'
import Header from './Header'

const App = () => (
	<div>
		<div>
			{/* FeaturedMix (needs styling and updating) */}
			<FeaturedMix />

			<div>
				{/* Header (needs styling and updating) */}
				<Header />

				{/* Routed page */}
			</div>
		</div>

		{/* AudioPlayer */}
		<iframe
			title="mixcloud"
			width="100%"
			height="60"
			src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F"
			frameBorder="0"
		/>
	</div>
)

export default App
