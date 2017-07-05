angular.module("myapp",[])
    .controller("next",["$scope",function ($scope) {
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.add=function () {
            let obj=[];
            obj.id=maxid();
            obj.name="新建";
            obj.son=[];
            $scope.data.push(obj);
            localStorage.message=JSON.stringify($scope.data);
        };
        function maxid() {
            let id=0;
            let tempid=0;
            if($scope.data.length==0){
                id=1;
            }else{
                for(let i=0;i<$scope.data.length;i++){
                    if($scope.data[i].id>tempid){
                        tempid=$scope.data[i].id
                    }
                }
                id=tempid+1;
            }
            return id;
        }
        $scope.change=function () {

        };
        $scope.del=function () {
            angular.forEach($scope.data,function (index) {
                $scope.data.splice(index, 1);
            })
        }
    }]);


