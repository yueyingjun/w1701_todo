angular.module("qqapp",[])
    .controller("ctrl",function ($scope) {
        $scope.data=localStorage.mess?JSON.parse(localStorage.mess):[];
        $scope.title=['新建计划'];
        $scope.add=function () {
            let obj={};
            obj.id=max();
            obj.title="新建计划";
            obj.son=[];
            $scope.data.push(obj);
            localStorage.mess=JSON.stringify($scope.data)
        }
        function max(){
            let id,tempid=0;
            if($scope.data.length==0){
                id=1;
            }else{
                angular.forEach($scope.data,function(val,index){
                    if(val.id>tempid){
                        tempid=val.id;
                    }
                })
                id=tempid+1;
            }
            return id;
        }

        $scope.focus=function(a){
            $scope.title.push(a);
        }
        $scope.change=function(value,i){
            $scope.title.push(value);
            angular.forEach($scope.data,function(val,index){
                if(val.id==i){
                    $scope.data[index].title=value;
                }
            })
            localStorage.mess=JSON.stringify($scope.data);
        }
        $scope.delete=function(value){
            let id;
            angular.forEach($scope.data,function(val,index){
                if(val.id==value){
                    id=index;
                }
            })
            $scope.data.splice(id,1);
            localStorage.mess=JSON.stringify($scope.data);
        }
    })