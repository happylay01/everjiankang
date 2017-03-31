	
var warehouse = angular.module('everAppCtrls', ['mgcrea.ngStrap','mgcrea.ngStrap.tooltip']);

warehouse.controller("loginCtrl", ['$scope',
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


warehouse.controller('registerCtrl', ['$scope',
	function($scope) {
		document.title = "智信睿医 - 注册";
	}
]);


warehouse.controller('userCtrl', ['$scope',
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


warehouse.controller('warehouseCtrl', ['$scope', '$http', '$modal', function($scope, $http,$modal) {
	document.title = "智信睿医 - 空间管理";

	// list 
	$scope.showHousewareList = function(){
		$http.get('../json/warehouse.json')
		.then(function(result) {
			console.log(result);
			if (result.data.head.errCode == 0) {
				$scope.warehouseData = result.data.data.wareHouseList;
			}
		});
	}

	// show add houseware modal
	$scope.openAddHouseware = function(){
		$scope.titleName = "XXXX";
		// Pre-fetch an external template populated with a custom scope
		$scope.myOtherModal = $modal({
			title: '空间管理111111',
			scope: $scope,
			template: 'tpls/warehouse/addWarehouse.html',
			show: true
		});

		$scope.warehouse = {
			name:"郑世翼",
			flour:"一层",
			code:"LL10"
		}
	}

	$scope.showHousewareList();

	// add warehouse post data
	$scope.addWarehouse = function() {

		if ($scope.addNewWarehouseFrm.$invalid) {
			console.log("检查数据");
		} else {
			$http.get('../json/addwarehouse.json')
				.then(function(result) {
					if (result.data.head.errCode == 0) {
						
						$scope.myOtherModal.hide();
						$scope.showHousewareList();

						console.log("数据正常，表单提交");

					}
				});

		}
	}


	// 弹出导航
	

}]);



warehouse.controller('providerCtrl', ['$scope',
	function($scope) {
		document.title = "智信睿医 - provider管理";
	}
]);