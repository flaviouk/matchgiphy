angular.module( 'MatchGiphy' )

.controller( 'homeCtrl', function( $scope, giphyFactory ) {

	var allGiphys = [];
	$scope.giphys = [];

	$scope.startGame = function( search ) {

		$scope.search = '';

		giphyFactory.getMyGiphys( search ).then( function( giphys ) {
			allGiphys = [];
			$scope.giphys = [];
			for ( var key in giphys ) {
				allGiphys.push( giphys[ key ].images.fixed_height_small.url );
			}

			randomizeGiphys( allGiphys );
			return;
		} )
	}

	function randomizeGiphys( giphys ) {

		function shuffle( array ) {
			var currentIndex = array.length,
				temporaryValue, randomIndex;
			while ( 0 !== currentIndex ) {
				randomIndex = Math.floor( Math.random() * currentIndex );
				currentIndex -= 1;
				temporaryValue = array[ currentIndex ];
				array[ currentIndex ] = array[ randomIndex ];
				array[ randomIndex ] = temporaryValue;
			}
			return array;
		}
		var arrayOne = shuffle(giphys);
		var arrayTwo = shuffle(giphys);
		for( var i = 0 ; i < arrayOne.length; i++){
			$scope.giphys.push(arrayOne[i]);
		}
		for( var i = 0 ; i < arrayTwo.length; i++){
			$scope.giphys.push(arrayTwo[i]);
		}
	}



	$scope.startGame( 'wow', 3 );

} )
