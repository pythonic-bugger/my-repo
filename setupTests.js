// /**
//  * External dependencies
//  */
// import nock from 'nock';

// // Don't let tests talk to the outside world
// nock.disableNetConnect();

// // But do allow them to talk to our own server
// nock.enableNetConnect( '127.0.0.1|localhost' );

// // Log more info - helps detect async problems
// process.on( 'unhandledRejection', error => {
// 	console.error( 'unhandledRejection', error.message, error.stack ); // eslint-disable-line no-console
// } );
