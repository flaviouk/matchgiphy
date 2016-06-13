angular.module( 'MatchGiphy' )

.directive( 'matchGifs', function( giphyFactory, $timeout ) {
	return {
		templateUrl: './directives/match-gifs-dir/match-gifs-dir.html',
		link: function( scope, elem, attr ) {
			var allGiphys = [];
			scope.giphys = [];

			scope.startGame = function( search ) {
				scope.search = '';
				scope.giphys = [];

				giphyFactory.getMyGiphys( search ).then( function( giphys ) {
					allGiphys = [];
					for ( var key in giphys ) {
						allGiphys.push( giphys[ key ].images.fixed_height.url );
					}
					randomizeGiphys( allGiphys );
				} )

				toggleCards();
			}

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

			function randomizeGiphys( giphys ) {
				var arrayOne = shuffle( giphys );
				var arrayTwo = shuffle( giphys );
				for ( var i = 0; i < arrayOne.length; i++ ) {
					scope.giphys.push( arrayOne[ i ] );
				}
				for ( var i = 0; i < arrayTwo.length; i++ ) {
					scope.giphys.push( arrayTwo[ i ] );
				}
			}

			function toggleCards() {
				var numCardsVisible = 0;
				var cards = [];
				var firstCard;
				var totalVisible = 0;


				$( document ).off( 'click', '.giphy-a' ).on( 'click', '.giphy-a', function() {
					if ( numCardsVisible < 2 ) {
						var thisElem = $( this );
						var giphyImg = thisElem.find( '.giphy-img' );
						var giphyCard = thisElem.find( '.giphy-card' );
						var myCardIndex = numCardsVisible;

						cards[ myCardIndex ] = giphyImg;

						numCardsVisible++;

						if(toggleVisibility( giphyImg, giphyCard )){
							totalVisible--;
						}else{
							totalVisible++;
						};

						if ( cards.length === 2 ) {
							if ( !isSameCard( cards[ 0 ], cards[ 1 ] ) ) {
								$timeout( function() {
									toggleVisibility( giphyImg, giphyCard );
									numCardsVisible--;
									totalVisible--;
									cards.splice( myCardIndex, 1 );
								}, 2000 );
							} else {
								numCardsVisible = 0;
								cards.length = 0;
							}
						}
					}

					if(totalVisible === scope.giphys.length){
						console.log('NICE');
					}

				} )
			}

			function isSameCard( cardOne, cardTwo ) {
				if ( cardOne.attr( 'src' ) === cardTwo.attr( 'src' ) ) {
					return true;
				}
				return false;
			}

			function toggleVisibility( first, second ) {
				console.log('checked');
				if ( first.css( 'visibility' ) == 'visible' ) {
					first.css( 'visibility', 'hidden' );
					second.css( 'visibility', 'visible' );
					return true;
				} else {
					first.css( 'visibility', 'visible' );
					second.css( 'visibility', 'hidden' );
					return false;
				}
			}

			scope.startGame( 'wow' );
		}
	}
} );
