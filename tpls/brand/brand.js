var brandctrl = angular.module('brandCtrls', [
	'mgcrea.ngStrap', 'mgcrea.ngStrap.tooltip', 'ngGrid'
]);

brandctrl.controller('brandCtrl', ['$scope', '$http', '$modal', function($scope, $http, $modal) {
	document.title = "智信睿医 - 品牌管理";

	$scope.listPage = {};

	// 品牌列表 
	$scope.showBrandList = function() {
		$http.get(_BASEURL + '/warehouse/brand/getBrandList/')
			.then(function(result) {
				if (result.data.head.errCode == 0) {
					$scope.brandData = result.data.data.resultList;
				}
			});
	}

	$scope.showBrandList();

	// 显示添加品牌弹窗
	$scope.openAddBrand = function() {
		// debugger info
		$scope.brand = {
			name: "同仁堂",
			intro: "老牌中医症所"
		}

		// Pre-fetch an external template populated with a custom scope
		$scope.myOtherModal = $modal({
			title: '品牌管理',
			scope: $scope,
			templateUrl: 'tpls/brand/addbrand.html',
			show: true
		});
	}


	// add brand post data
	$scope.addBrand = function() {

		if ($scope.listPage.addBrandFrm.$invalid) {
			console.log("检查数据");
		} else {
			$http.post(_BASEURL + 'warehouse/brand/createBrand/')
				.then(function(result) {
					if (result.data.head.errCode == 0) {

						$scope.myOtherModal.hide();
						$scope.showBrandList();

						console.log("数据正常，表单提交");

					}
				});

		}
	}

	// 弹出修改内容弹窗
	$scope.popUpdateBrand = function(brandObj) {
		console.log(brandObj);
		$scope.brand = {
			name: brandObj.name,
			intro: brandObj.intro,
			id: brandObj.id
		}

		// Pre-fetch an external template populated with a custom scope
		$scope.myOtherModal = $modal({
			title: '品牌管理',
			scope: $scope,
			templateUrl: 'tpls/brand/addBrand.html',
			show: true
		});
	}

	// 弹出删除弹窗
	$scope.popDelBrand = function() {
		$scope.titleCnt = "确定要删除该条数据吗？";

		// Pre-fetch an external template populated with a custom scope
		$scope.myOtherModal = $modal({
			title: '品牌管理',
			scope: $scope,
			templateUrl: 'tpls/brand/deletebrand.html',
			show: true
		});
	}


	// 删除数据提交
	$scope.delBrand = function() {
		$http({
			method: 'GET',
			url: _BASEURL + 'warehouse/brand/deleteBrand/'
		})
		.success(function(result, status, headers, config) {
			if (result.data.head.errCode == 0) {

				$scope.myOtherModal.hide();
				$scope.showBrandList();

				console.log("数据正常，表单提交");

			}
			// this callback will be called asynchronously
			// when the response is available
		})
		.error(function(data, status, headers, config) {
			console.log("提交失败，请重试");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});


	}

}]);