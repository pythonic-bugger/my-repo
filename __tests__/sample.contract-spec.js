/**
 * External dependencies
 */
import { MatchersV3, PactV3 } from '@pact-foundation/pact';
const { string, integer } = MatchersV3;
const Like = MatchersV3.like;
const EachLike = MatchersV3.eachLike;
const AtMostLike = MatchersV3.atMostLike;
import * as path from 'path';

/**
 * Internal dependencies
 */
import { getBlogById } from './utils/contract-client';

// Config Pact with provider, logging and pact storage details
const provider = new PactV3( {
	dir: path.resolve( process.cwd(), '__tests__/contracts/pacts' ),
	consumer: 'MyTestConsumer',
	provider: 'MyTestProvider',
	port: 4000,
	logLevel: 'INFO',
} );

// My interactions test suite
describe( 'MyProvider', () => {

	const siteId = 71;
	const blogId = 3189;

	const getBlogByIdPath = `/v2/sites/${ siteId }/blogs/${ blogId }`;

	describe( 'get /v2/sites/:siteId/blogs/:blogId', () => {
		it( 'get /v2/sites/:siteId/blogs/:blogId', async () => {
			// Using testUtils for ease until the proper response is finalised
			const providerResponse = {
                foo: "barrel",
                some: "thing"
            }

			provider
				.given( 'valid blog Id' )
				.uponReceiving( 'a request to get blog by blogId' )
				.withRequest( {
					method: 'GET',
					path: getBlogByIdPath,
				} )
				.willRespondWith( {
					status: 200,
					body: Like( providerResponse ),
				} );
			return provider.executeTest( async mockserver => {
				const response = await getBlogById( `${ mockserver.url }${ getBlogByIdPath }` );
				// eslint-disable-next-line jest/no-standalone-expect
				expect( response.blogId ).not.toBeNull();
			} );
		} );
	} );
} );
