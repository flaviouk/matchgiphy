angular.module( 'MatchGiphy' )

.factory( 'giphyFactory', function( $state, giphyRef, $timeout, $http ) {

	function getMyGiphys( search ) {
		return $http({
			method: 'GET',
			url: giphyRef.baseUrl + search + giphyRef.apiKey
		}).then(function (giphysResponse) {
			return giphysResponse.data.data;
		})
	}

	return {
		getMyGiphys: getMyGiphys
	}
} );
