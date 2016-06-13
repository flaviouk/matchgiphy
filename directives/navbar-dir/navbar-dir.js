angular.module( 'MatchGiphy' )

.directive( 'navbar', function( authFactory, $timeout ) {
	return {
		templateUrl: './directives/navbar-dir/navbar-dir.html',
		link: function( scope, elem, attr ) {
			scope.isLogged = false;
			scope.login = function() {
				authFactory.login();
				$timeout(function () {
					amILogged();
				}, 1000);
			}
			scope.logout = function() {
				authFactory.logout();
				scope.isLogged = false;
			}
			function amILogged (){
				if ( authFactory.getLogStatus ) {
					scope.isLogged = true;
				}else{
					scope.isLogged = false;
				}
			}
			amILogged();
		}
	};
} );
