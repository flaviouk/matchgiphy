angular.module( 'MatchGiphy' )

.factory( 'authFactory', function( $state, firebaseRef, $timeout ) {

	var currentUser;


	// Login with facebook
	function login() {

		firebaseRef.base.authWithOAuthPopup( 'facebook', function( error, authData ) {
			if ( error ) {
				$timeout( function() {
					Materialize.toast( 'Whoops, something went wrong. Try again later!', 3000 );
				}, 500 );
				console.log( error );
			} else {

				currentUser = authData;
				// currentUserTasks = new Firebase(firebaseRef.tasks + '/' + currentUser.uid);
				$timeout( function() {
					Materialize.toast( 'Welcome to intero, ' + authData.facebook.displayName + '!', 3000 );
				}, 500 );
				$state.go( 'tasks' );

			}
		} )
	}

	// Logout
	function logout() {
		firebaseRef.base.unauth();
		$timeout( function() {
			Materialize.toast( 'Bye, see you soon!', 3000 );
		}, 500 );
		$state.go( 'home' );
	}


	function checkAuth() {
		firebaseRef.base.onAuth( function( authData ) {
			if ( authData ) {
				currentUser = authData;
				// currentUserTasks = new Firebase(firebaseRef.tasks + '/' + currentUser.uid);
				// $state.go('tasks');
			} else {
				$state.go( 'home' );
			}
		} )
	}
	checkAuth();

	return {
		login: login,
		logout: logout,
		currentUser: currentUser
	}
} );
