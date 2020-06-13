import React from 'react'

const MixesContext = React.createContext({
	defaultMix: {
		id: '/NTSRadio/floating-points-jamie-xx-18th-august-2016/',
		title: 'Jamie XX mix',
		src: '%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F',
	},
	mixes: [
		{
			id: '/NTSRadio/bonobo-24th-june-2015/',
			title: 'Bonobo mix',
			src: '%2FNTSRadio%2Fbonobo-24th-june-2015%2F',
		},
		{
			id: '/NTSRadio/floating-points-four-tet-16th-march-2017/',
			title: 'Four Tet mix',
			src: '%2FNTSRadio%2Ffloating-points-four-tet-16th-march-2017%2F',
		},
		{
			id: '/NTSRadio/mint-condition-w-hotthobo-27th-november-2017/',
			title: 'Mint Condition mix',
			src: '%2FNTSRadio%2Fmint-condition-w-hotthobo-27th-november-2017%2F',
		},
		{
			id: '/NTSRadio/full-house-6th-november-2017/',
			title: 'Full House mix',
			src: '%2FNTSRadio%2Ffull-house-6th-november-2017%2F',
		},
	],
})

export default MixesContext
