import fetch from 'node-fetch';

export const getBlogById = async url => {
	const response = await fetch( url );
	if ( response.ok ) {
		return await response.json();
	}
	return response;
};
