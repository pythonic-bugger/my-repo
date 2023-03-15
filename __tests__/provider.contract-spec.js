/* eslint-disable jest/expect-expect */
/**
 * External dependencies
 */
import { Verifier, VerifierOptions } from '@pact-foundation/pact';

jest.setTimeout( 120000 );

describe( 'pact Verification', () => {
	// Verifier Options to validate contract. 
	let opts;
	

	beforeAll( async () => {

		/**
		 * To be used in case of webhook events.
		 * When there is a change in Parker contract, Pact Broker will send a Webhook to trigger verification by SDS
		 * In such event, the test should use the following VerifierOptions to validate the contract
		 */
		const pactChangeOpts = {
			pactUrls: [process.env.PACT_URL]
		}

		// Core Pact Options
		const coreContractOpts = {
			providerBaseUrl: 'http://localhost:3000',
			logLevel: 'debug',
			provider: 'MyTestProvider',
			publishVerificationResult: true,
			providerVersion: process.env.PROVIDER_VERSION ?? 'latest',

		}

		// Verifier Options to fetch contract dynamically
		const dynamicContractOpts = {
			// Fetching the pact from broker
			pactBrokerUrl: 'https://wpvip.pactflow.io',
			pactBrokerToken: process.env.PACT_BROKER_TOKEN,

			// TODO: Uncomment the mainBranch and deployed flags later to always validate the contract from trunk branch of Parker.
			// This needs to be done when PR has the contract tests in trunk
			consumerVersionSelectors: [
				{
					latest: true,
					// deployed: true,
					// mainBranch: true,
				}
			],
			// SDS branch property that will flow from the CI actions
			providerVersionBranch: process.env.PROVIDER_BRANCH ?? 'master',
		};

		opts = {
			...coreContractOpts,
			...(process.env.PACT_URL ? pactChangeOpts : dynamicContractOpts),
		}
	} );

	it( 'should validate Parker expectations', async () => {
		console.log(`running verification for sha ${process.env.PROVIDER_VERSION}`)
		const verifier = new Verifier( opts );
		await verifier.verifyProvider();
	} );
} );
