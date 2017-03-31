var everApp = angular.module("everApp", [
	'ngRoute', 'everAppCtrls','everAppDirectives','mgcrea.ngStrap'
]);

everApp.config(function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'tpls/login.html',
		controller: 'loginCtrl'
	}).when('/reg', {
		templateUrl: 'tpls/register.html',
		controller: 'registerCtrl'
	}).when('/user', {
		templateUrl: 'tpls/user.html',
		controller: 'userCtrl'
	}).when('/warehouse', {
		templateUrl: 'tpls/warehouse.html',
		controller: 'warehouseCtrl'
	}).when('/provider', {
		templateUrl: 'tpls/provider.html',
		controller: 'providerCtrl'
	})
})
