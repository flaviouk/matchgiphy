angular.module( 'MatchGiphy', [ 'ui.router', 'firebase' ] )


.constant('giphyRef', {
	apiKey: '&api_key=dc6zaTOxFJmzC',
	baseUrl: 'http://api.giphy.com/v1/gifs/search?q='

})


.config( [ '$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {


	$urlRouterProvider.otherwise( '/' );

	$stateProvider
		.state( 'home', {
			url: '/',
			templateUrl: './views/home/home-view.html',
			controller: 'homeCtrl'
		} )

} ] );






