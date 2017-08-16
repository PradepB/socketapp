var app = angular.module('app', [])
    .controller('appCtrl', function ($scope) {
        $scope.click = function () {
            var socket = io.connect(window.location.hostname);
              socket.emit('input', {                        
                        message: $scope.value
                    });
        }
    })