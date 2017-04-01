var everApp = angular.module("everApp", [
	'ui.router', 'everAppCtrls', 'mgcrea.ngStrap'
	//'everAppCtrls', 'everAppDirectives', 'mgcrea.ngStrap'
]);

everApp.run(function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});

everApp.config(function($stateProvider, $urlRouterProvider) {
	// $urlRouterProvider.otherwise('/index');
	$stateProvider
		.state('index', {
			url: '/index',
			templateUrl: 'index.html'
		})
		.state('reg', {
			url: '/reg',
			templateUrl: 'tpls/register.html'
		})
		.state('/user', {
			url: '/user',
			templateUrl: 'tpls/user.html'
		})
		.state('/provider', {
			url: '/provider',
			templateUrl: 'tpls/provider.html'
		})
		.state('warehouse', {
			url: '/warehouse',
			views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
				'': {
					templateUrl: 'tpls/warehouse.html'
				},
				'topNav@warehouse': {
					templateUrl: 'tpls/topNav/topNav.html'
				},
				'leftNav@warehouse': {
					templateUrl: 'tpls/leftNav/leftNav.html'
				}
			}
		})
});

