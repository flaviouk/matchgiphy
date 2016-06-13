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
		ranking = $firebaseArray( new Firebase( firebaseRef.ranking ) );
		ranking.$loaded( function( response ) {
			for ( var i = 0; i < response.length; i++ ) {
				if ( currentUser.facebook.id === response[ i ].id ) {
					ranking[i].score += num;
					ranking.$save(i).then(function (result) {
					})
				}
			}
		} )
	}

	return {
		addToMyRank: addToMyRank
	}
} );
