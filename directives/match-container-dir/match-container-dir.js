angular.module( 'MatchGiphy' )

.directive( 'matchContainer', function( firebaseRef, $firebaseArray ) {
	return {
		templateUrl: './directives/match-container-dir/match-container-dir.html',
		link: function( scope, elem, attr ) {

			var ranking = $firebaseArray( new Firebase( firebaseRef.ranking ) );

			function sortMe( array ) {
				return array.sort( function( a, b ) {
					if ( a.score > b.score ) {
						console.log(a.score);
						return -1;
					}
					if ( a.score < b.score ) {
						console.log(a.score);
						return 1;
					}
					// a must be equal to b
					return 0;
				} )
			}
			ranking.$on(function () {
				ranking.$loaded(function (result) {
				scope.ranking = sortMe(ranking);
			})
			})
		}
	}
} );
