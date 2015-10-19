/**
 * Created by Henri on 18.10.2015.
 */
var todoApp = angular.module("todoApp", ['ui.bootstrap']);

var lists = [
    {id: 1, name: 'shopping list', desc: 'shoppinglist', added: '2015-10-18T18:43:08.852Z'},
    {id: 2, name: 'example', desc: 'example list', added: '2015-10-18T18:43:08.852Z'},
    {id: 3, name: 'user made', desc: 'an user made list', added: '2015-10-18T18:43:08.852Z'}
];

todoApp.controller('ListsCtrl', function ($scope, $uibModal, $log) {

    $scope.lists = lists;

    $scope.animationsEnabled = true;

    $scope.editModal = function (size, list) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'listmodal.jade',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                /*items: function() {
                    return $scope.lists;
                },*/
                item: function() {
                    return list;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            //returns modified list
            //fetch lists again
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});

todoApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, item) {

    $scope.backupItem = $.extend({},item);
    console.log(item)
    $scope.item = item;
    //$scope.items = items;
    /*$scope.selected = {
        item: $scope.items[0]
    };

    console.log($scope.selected);*/

    $scope.ok = function () {
        $modalInstance.close(true);
    };

    $scope.cancel = function () {
        angular.copy($scope.backupItem, $scope.item)
        $modalInstance.dismiss('cancel');
    };
});