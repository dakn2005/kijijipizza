var orderControllers = angular.module('orderControllers', []);

orderControllers.controller('orderController', ['$scope', '$route', '$routeParams', '$location', 'Orders', 'Employees', 'Global',
    function ($scope, $route, $routeParams, $location, Orders, Employees, Global) {
		$scope.items = Global.Cart;
		$scope.global = Global;
		//        console.log($scope.items);

		if (Global.currentUser() === undefined || Global.currentUser() === null) { //must be loggedin
			$location.path("/unauth");
			return;
		} else if ($route.current.originalPath == '/orders/deliveryschedule') { //must be system user
			if (!Global.isAdmin() && !Global.isEmployee()) {
				$location.path("/unauth");
				return;
			}
		}

		function getCurrentDateTime() {
			var now = new Date();
			var datetime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
			datetime += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

			return datetime;
		}

		$scope.getStatusClass = function (status) {
			switch (status) {
			case "pending":
				return "badge-info";
			case "assigned":
				return "badge-important";
			case "delivered":
				return "badge-success";
			case "cancelled":
				return "no status";
			}
		}

		//--note orders have 2 states, i.e., before saving to db and after saving to db. Both use cases have to be handled

		$scope.allOrders = function (query) {
			Orders.query(query, function (orders) {
				var rord = [];
				orders.forEach(function (ord) {
					var fulltotal = 0;
					//					ord.Items = ord.Items || JSON.parse(ord.Items);
					try {
						ord.Items = JSON.parse(ord.Items);
					} catch (err) {
						console.log(err);
					}

					ord.Items.forEach(function (item) { //use reduce
						fulltotal += parseInt(item.totalcharged);
					});

					ord.fulltotal = fulltotal;
					$scope.canCancel = (ord.Status == "pending") ? true : false;
					ord.isDelivered = ord.Status == 'delivered' ? true : false;
					//ord.AssignedTo = ord.AssignedTo || "";

					rord.push(ord);

				});
				$scope.orders = rord;
				console.log(rord);
			});

			if (Global.isAdmin()) {
				Employees.query(query, function (employees) {
					employees.map(function (emp) {
						delete emp.IDNumber;
						delete emp.Email;
						delete emp.__v;

					});
					$scope.employees = [];
					$scope.employees = employees;

					//console.log($scope.employees); //kimana
				});
			}

		};

		$scope.showItems = function () { //testing function
			Global.Cart = $scope.items;

			var strp = JSON.parse(Global.Cart);

			strp.map(function (obj) {
				delete obj.typeprice;
				delete obj.imageSource;
				//return _.omit(obj, ['typeprice', 'imageSource']);
			});
		};

		$scope.createOrder = function () {
			Global.Cart = $scope.items; //array must be assigned to global
			var strp = JSON.parse(Global.Cart);

			strp.map(function (obj) {
				delete obj.typeprice;
				//delete obj.imageSource;
			});

			var order = new Orders({
				DeliveryDate: this.oDDate + ' ' + this.oDTime,
				OrderDescription: this.oDesc,
				Location: this.location,
				Items: JSON.stringify(strp), //$scope.items,
				DateOrdered: getCurrentDateTime(),
				Status: "pending"
			});

			order.$save(function (response) {
				$location.path("orders/"); // + response._id
				//console.log(response.output);
			});
		};

		$scope.updateOrder = function () {
			var ord = $scope.orders;
			//console.log(ord);
			ord.forEach(function (order) {
				if (order.AssignedTo != '' && order.AssignedTo != null)
					if (order.AssignedBy == undefined || order.AssignedBy == '' || order.AssignedBy == null)
						order.AssignedBy = Global.userId();

				order.$update();
			});

			//			$location.path("orders/deliveryschedule");
			$route.reload();
		};

		$scope.deleteOrder = function (order) {
			if (confirm('delete?')) {
				order.$remove();
				//$location.path("orders/");
				$route.reload();
			}
		};

		$scope.cart = function () {
			Orders.get({
				orderId: $routeParams.orderId
			}, function (order) {
				$scope.orders = order;
			});
		};

		$scope.reAssign = function (ordr) {
			ordr.AssignedBy = '';
			ordr.AssignedTo = '';
		};

		$scope.pgRefresh = function () {
			$route.reload();
		};

		$scope.selectAssign = function (val, ord, state) {
			if (val)
				ord.Status = state;
		};

		$scope.checkAssign = function (state, ord) {
			ord.Status = state === true ? 'delivered' : 'assigned';
		};

		//        $scope.assign=function(){
		//            var ord = $scope.orders;
		//            
		//            ord.$update(function () {
		//                $location.path('orders/' + ord._id);
		//            });
		//        };

    }]);