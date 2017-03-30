var myCtrls = angular.module('everAppCtrls', []);

myCtrls.controller("loginCtrl", ['$scope',
	function($scope) {
		document.title = "智信睿医 - 登录";
		$scope.userData = {
			mobile: "13241497979",
			password: "111111"
		};
		$scope.submitForm = function() {
			console.log($scope.userData);
			if ($scope.loginForm.$invalid) {
				console.log("检查数据");
			} else {
				console.log("数据正常，表单提交")
			}
		}
	}
]);


myCtrls.controller('registerCtrl', ['$scope',
	function($scope) {
		document.title = "智信睿医 - 注册";
	}
]);


myCtrls.controller('userCtrl', ['$scope',
	function($scope) {
		document.title = "智信睿医 - 个人信息";
		$scope.books = [{
			tile: "ext",
			author: "大漠穷秋"
		}, {
			tile: "angular",
			author: "大漠穷秋"
		}, {
			tile: "代码大全",
			author: "大漠穷秋"
		}];
	}
]);


// bookListModule.controller('BookListCtrl', function($scope, $http, $state, $stateParams) {
myCtrls.controller('warehouseCtrl', function($scope, $http) {
	document.title = "智信睿医 - 空间管理";
	$http.get('../json/warehouse.json')
		.success(function(data) {
			console.log(data);
			if(data.head.errCode == 0){
				$scope.warehouseData = data.data.wareHouseList;
			}
		}
	);
});

myCtrls.controller('addwarehouseCtrl', ['$scope', function($scope){
	$scope.addWarehouse = function(){
		console.log($scope.warehouse);
		if ($scope.addNewWarehouseFrm.$invalid) {
			console.log("检查数据");
		} else {
			console.log("数据正常，表单提交");
			$http.get('../json/warehouse.json')
				.success(function(data) {
					console.log(data);
					if(data.head.errCode == 0){
						$scope.warehouseData = data.data.wareHouseList;
					}
				}
			);

		}
	}
}])
	



myCtrls.controller('providerCtrl', ['$scope',
	function($scope) {
		document.title = "智信睿医 - provider管理";
	}
]);


