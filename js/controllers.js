var warehouse = angular.module('everAppCtrls', [
	'mgcrea.ngStrap', 'mgcrea.ngStrap.tooltip', 'ngGrid'
]);

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


warehouse.controller('warehouseCtrl', ['$scope', '$http', '$modal', function($scope, $http, $modal) {
	document.title = "智信睿医 - 空间管理";

	// list 
	$scope.showHousewareList = function() {
		$http.get('../json/warehouse.json')
			.then(function(result) {
				console.log(result);
				if (result.data.head.errCode == 0) {
					$scope.warehouseData = result.data.data.wareHouseList;
				}
			});
	}

	$scope.showHousewareList();


	// show add houseware modal
	$scope.openAddHouseware = function() {
		$scope.titleName = "空间管理";
		$scope.warehouse = {
			name: "郑世翼",
			flour: "一层",
			code: "LL10"
		}

		// Pre-fetch an external template populated with a custom scope
		$scope.myOtherModal = $modal({
			title: '空间管理',
			scope: $scope,
			templateUrl: 'tpls/warehouse/addWarehouse.html',
			show: true
		});


	}

	// add warehouse post data
	$scope.addWarehouse = function() {

		debugger
		if ($scope.test.addNewWarehouseFrm.$invalid) {
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

	// 弹出导航 采用内联方式，暂时不在这里初始化

	// 弹出修改内容弹窗
	$scope.popUpdateWarehouse = function(warehouseId) {
		$scope.titleName = "空间管理";
		$scope.warehouse = {
			name: "郑世翼",
			flour: "一层",
			code: "LL10",
			id: warehouseId
		}

		// Pre-fetch an external template populated with a custom scope
		$scope.myOtherModal = $modal({
			title: '空间管理',
			scope: $scope,
			templateUrl: 'tpls/warehouse/addWarehouse.html',
			show: true
		});

	}

	// 弹出删除弹窗
	$scope.popDelWarehouse = function() {
		$scope.titleName = "空间管理";
		$scope.titleCnt = "确定要删除该条数据吗？";

		// Pre-fetch an external template populated with a custom scope
		$scope.myOtherModal = $modal({
			title: '诊室管理',
			scope: $scope,
			templateUrl: 'tpls/warehouse/delWarehouse.html',
			show: true
		});
	}


	// 弹出删除弹窗
	$scope.delWarehouse = function() {
		debugger
		$http.get('../json/delwarehouse.json')
			.then(function(result) {
				if (result.data.head.errCode == 0) {

					$scope.myOtherModal.hide();
					$scope.showHousewareList();

					console.log("数据正常，表单提交");

				}
			});

	}

}]);


warehouse.controller('DisplayWarehouseListCtrl', function($scope, $http) {

	$scope.filterOptions = {
		filterText: "",
		useExternalFilter: true
	};
	$scope.totalServerItems = 0;
	$scope.pagingOptions = {
		pageSizes: [5, 10, 20],
		pageSize: 20,
		currentPage: 1
	};

	$scope.setPagingData = function(data, page, pageSize) {

		$scope.warehouseData = data.data.data.wareHouseList;
		$scope.totalServerItems = $scope.warehouseData.length;
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	};

	$scope.getPagedDataAsync = function(pageSize, page, searchText) {

		setTimeout(function() {
			var data;

			if (searchText) {
				var ft = searchText.toLowerCase();
				$http.get('../json/warehouse.json').then(function(largeLoad) {
					data = largeLoad.filter(function(item) {
						return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
					});
					$scope.setPagingData(data, page, pageSize);
				});
			} else {
				$http.get('../json/warehouse.json').then(function(largeLoad) {
					$scope.setPagingData(largeLoad, page, pageSize);
				});
			}
		}, 100);
	};

	$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

	$scope.$watch('pagingOptions', function(newVal, oldVal) {
		if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		}
	}, true);
	$scope.$watch('filterOptions', function(newVal, oldVal) {
		if (newVal !== oldVal) {
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		}
	}, true);

	$scope.gridOptions = {

		data: 'warehouseData',
		multiSelect: false,
		enableCellSelection: true,
		enableRowSelection: false,
		enableCellEdit: true,
		enablePinning: true,
		columnDefs: [{
			field: 'id',
			displayName: 'id',
			width: 60,
			pinnable: false,
			sortable: false
		}, {
			field: 'name',
			displayName: '诊室名',
			enableCellEdit: true
		}, {
			field: 'flour',
			displayName: '楼层',
			enableCellEdit: true,
			width: 220
		}, {
			field: 'roomName',
			displayName: '诊室名',
			enableCellEdit: true,
			width: 120
		}, {
			field: 'state',
			displayName: '状态',
			enableCellEdit: true,
			width: 120
				// cellFilter: 'currency:"￥"'
		}, {
			field: 'id',
			displayName: '操作',
			enableCellEdit: false,
			sortable: false,
			pinnable: false,
			cellTemplate: '<div><a ui-sref="bookdetail({bookId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
		}],
		enablePaging: true,
		showFooter: true,
		totalServerItems: 'totalServerItems',
		pagingOptions: $scope.pagingOptions,
		filterOptions: $scope.filterOptions

	};
});

warehouse.controller('providerCtrl', ['$scope',
	function($scope) {
		document.title = "智信睿医 - provider管理";
	}
]);