angular.module( 'MatchGiphy' )

.factory( 'authFactory', function( firebaseRef, $timeout ) {

	var isLogged;

	// Login with facebook
	function login() {

		firebaseRef.base.authWithOAuthPopup( 'facebook', function( error, authData ) {
			if ( error ) {
				$timeout( function() {
					Materialize.toast( 'Whoops, something went wrong. Try again later!', 3000 );
				}, 500 );
				console.log( error );
				return false;
			} else {
				$timeout( function() {
					Materialize.toast( 'Welcome, ' + authData.facebook.displayName + '!', 3000 );
				}, 500 );
				isLogged = true;
			}
		} )
	}

	// Logout
	function logout() {
		firebaseRef.base.unauth();
		sLogged = false;
	}

	return {
		login: login,
		logout: logout,
		getLogStatus: function () {
			return isLogged
		}
	}
} );
