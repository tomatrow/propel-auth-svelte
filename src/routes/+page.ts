import type { PageLoad } from "./$types.js"

export const load: PageLoad = ({}) => {
	return {
		testData: {
			message: "Cool stuff"
		}
	}
}
