angular.module( 'MatchGiphy' )

.factory( 'rankFactory', function( $http, firebaseRef, $firebaseArray ) {
	var ranking;
	var currentUser;

	function authDataCallback( authData ) {
		if ( authData ) {
			currentUser = authData;
		}
	}
	var ref = firebaseRef.base;
	ref.onAuth( authDataCallback );

	function addToMyRank( num ) {
		ranking = $firebaseArray( new Firebase( firebaseRef.ranking + '/' + currentUser.facebook.id) );
		ranking.$add({
			score: num,
			name: currentUser.facebook.displayName
		})
	}
	// addToMyRank(2);

	return {
		addToMyRank: addToMyRank
	}
} );
