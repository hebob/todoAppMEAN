/**
 * Created by Henri on 18.10.2015.
 */
var todoApp = angular.module("todoApp", ['ui.bootstrap', 'ngRoute']);

todoApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'todo/partials/lists',
        controller: 'ListsCtrl'
      }).
      when('/:listId/', {
        templateUrl: 'todo/partials/list',
        controller: 'ListCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
      
      $locationProvider.html5Mode(true);
  }]);


todoApp.controller('ListsCtrl', function ($scope, $uibModal, $log, $http) {
    
    $scope.sortType = 'name';
    $scope.sortReverse = false;

    function updateLists() {
        $http({
                method: 'GET',
                url: '/api/',
            }).then(function successCallback(response) {
                $scope.lists = response.data
            }, function errorCallback(response) {

            });
    }
    
    updateLists();
     

    $scope.animationsEnabled = true;
    
    $scope.deleteList = function (listid) {
         $http({
                method: 'DELETE',
                url: '/api/' + listid,
            }).then(function successCallback(response) {
               updateLists()
            }, function errorCallback(response) {

            });
    }

    $scope.editModal = function (size, list) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'listmodal.jade',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {

                item: function() {
                    return list;
                }
            }
        });

        modalInstance.result.then(function (resps) {
            
            var meth = resps.isNew ? 'PUT' : 'POST';
            var id = resps.isNew ? "" : resps.item.id;
            
            $http({
                method: meth,
                url: '/api/' + id,
                data: resps.item
            }).then(function successCallback(response) {
                updateLists();
            }, function errorCallback(response) {

            });

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});

todoApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, item) {

    $scope.isNew = false;
    if (!!item) {
        $scope.backupItem = $.extend({},item);
        $scope.item = item;
    } else {
        $scope.isNew = true;
        $scope.item = {name: "New list", desc: "Description"};
    }

    $scope.ok = function () {
        $modalInstance.close({
            item: $scope.item,
            isNew: $scope.isNew
            });
    };

    $scope.cancel = function () {
        angular.copy($scope.backupItem, $scope.item)
        $modalInstance.dismiss('cancel');
    };
});

todoApp.controller('ListCtrl', function ($scope, $uibModal, $log, $http, $routeParams) {

    var listId = $routeParams.listId;
    
    $scope.sortType = 'done';
    $scope.sortReverse = false;
    
    $scope.updateTodo = function() {
        if($scope.list.todos.every(function(todo) {
            return todo.done == true;
        })) {
            $scope.list.done = true;
        } else {
            $scope.list.done = false;
        }
        $http({
                method: 'POST',
                url: '/api/todos/' + listId,
                data: $scope.list
            }).then(function successCallback(response) {
                updateList();
            }, function errorCallback(response) {
            });
    }
    
    function updateList() {
        $http({
                method: 'GET',
                url: '/api/' + listId,
            }).then(function successCallback(response) {
                $scope.list = response.data;
            }, function errorCallback(response) {
            });
    }
    
    updateList();
    
    $scope.animationsEnabled = true;

    $scope.todoModal = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'todomodal.jade',
            controller: 'ModalTodoCtrl',
            size: size,
            resolve: {
                item: function() {
                    return $scope.list;
                }
            }
        });

        modalInstance.result.then(function (resp) {
            if (!$scope.list.todos) {
                $scope.list.todos = []
            }
            
            $scope.list.todos.push(resp)
            $scope.updateTodo()

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
     
});

todoApp.controller('ModalTodoCtrl', function ($scope, $modalInstance) {

    $scope.item = {task: "New task", priority: 3};

    $scope.ok = function () {
        $scope.item.added = new Date();
        $scope.item.done = false;
        $modalInstance.close($scope.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
