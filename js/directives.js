var myDirectives = angular.module('everAppDirectives', []);

myDirectives.directive("hello", function() {
	return {
		restrict: "AECM",
		templateUrl: "tpls/topNav/topNav.html",
		replace: true
	}
})

// myDirectives.directive("onewarehouse", function() {
// 	var obj = {
// 		restrict: "EA",
// 		templateUrl: "tpls/warehouse/onewarehouse.html",
// 		replace: true
// 	}
// 	// console.log($scope.warehouseData);
// 	return obj;
// })

