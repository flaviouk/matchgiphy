angular.module( 'MatchGiphy' )

.directive( 'matchContainer', function( firebaseRef, $firebaseArray ) {
	return {
		templateUrl: './directives/match-container-dir/match-container-dir.html',
		link: function( scope, elem, attr ) {
			var ranking = $firebaseArray( new Firebase( firebaseRef.ranking ) );
			scope.ranking = ranking;
			for ( var key in ranking ) {
				if ( typeof ranking[ key ] !== 'function' ) {
					// for ( var prop in ranking[ key ] ) {
					// 	console.log( ranking[ key ].name, 'NAME' );
					// 	$scope.ranking[ prop ].name = ranking[ key ].name;
					// 	$scope.rankin
					// 	g[ prop ].score += ranking[ key ].score;
					// }
					console.log(ranking[key]);
				}

			}
			console.log( ranking, 'RANKING' );
			console.log( scope.ranking, 'SCOPE' );

		}
	}
} );
