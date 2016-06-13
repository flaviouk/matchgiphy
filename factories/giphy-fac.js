angular.module( 'MatchGiphy' )

.factory( 'giphyFactory', function( giphyRef, $http ) {

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
