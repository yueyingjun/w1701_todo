/**
 * Created by chen on 2017/7/5.
 */
angular.module("myapp",[])
    .controller("ctrl",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.add=function(){
            var obj={};
            obj.id=maxid();
            obj.name="未标签";
            obj.son=[];
            $scope.data.push(obj);
            localStorage.message=JSON.stringify($scope.data);
        }

        function maxid(){
            var id=0;
            var tempid=0;
            if($scope.data.length==0){
                id=1;
            }else{
                for(var i=0;i<$scope.data.length;i++){
                    if($scope.data[i].id>tempid){
                        tempid=$scope.data[i].id
                    }
                }
                id=tempid+1;
            }
            return id;
        }
        $scope.del=function () {
            $scope.data.splice(this.item,1);
            localStorage.message=JSON.stringify($scope.data);
        }
    }])

