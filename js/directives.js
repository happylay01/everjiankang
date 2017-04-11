var myDirectives = angular.module('everAppDirectives', []);

myDirectives.directive("hello", function() {
	return {
		restrict: "AECM",
		templateUrl: "tpls/hello.html",
		replace: true
	}
})



myDirectives.directive("everTableList", function() {
	return {
		restrict: "AECM",
		scope:{
			peoples: '=people1'
		},
		templateUrl: "tpls/table.html",
		replace: true
	}
})


myDirectives.directive("everPager", function() {
	return {
		restrict: "AECM",
		templateUrl: "tpls/pager.html",
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


