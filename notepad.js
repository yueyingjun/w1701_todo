angular.module('myapp',[]).controller('catr',["$scope",function ($scope) {
    $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
    $scope.add=function () {
        var obj={};
        obj.id=maxid();
        obj.name="前方的路在等你走";
        obj.son=[];
        $scope.data.push(obj);
        localStorage.message=JSON.stringify($scope.data);
    };
    function maxid() {
        var id=0;
        var tempid=0;
        if ($scope.data.length==0){
            id=1;
        }else {
            for (var i=0;i<$scope.data.length;i++){
                if ($scope.data[i].id>tempid){
                    tempid=$scope.data[i].id
                }
            }
            id=tempid+1;
        }
        return id;
    }
    $scope.remove=function (id) {
        console.log(id)
        for (let i=0;i<$scope.data.length;i++){
            if ($scope.data[i].id==id){
                $scope.data.splice(i,1)
            }
        }
    }
}]);