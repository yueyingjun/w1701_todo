angular.module("myapp",[])
    .controller("todo",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        console.log($scope.data)
        /*添加列表*/
        $scope.add=function(){
            var obj={};
            obj.id=maxid();
            obj.name="新建列表";
            obj.son=[];
            obj.son[0]=obj.name;
            $scope.num++;
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

        $scope.num=$scope.data.length;
        $scope.del=function(id){
            $scope.num--;
            for (var i = 0; i < $scope.data.length; i++) {
                if (id==$scope.data[i].id) {
                    $scope.data.splice(i,1);
                    localStorage.message=JSON.stringify($scope.data);
                };
            };
        }

        $scope.selectid=$scope.data.length==0?"":1;
        $scope.show=function(id){   
           $scope.selectid=id;
        }
        $scope.change=function(id){
            for(i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    $scope.data[i].son[0]=$scope.data[i].name;
                    localStorage.message=JSON.stringify($scope.data);
                }
            }
        }  
}])