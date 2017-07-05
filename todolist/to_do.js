angular.module("myapp",[])
    .controller("todo",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        // console.log($scope.data)
        /*添加列表*/
        $scope.add=function(){
            var obj={};
            obj.id=maxid();
            obj.name="新建列表";
            obj.son=[];
            $scope.data.push(obj);
            localStorage.message=JSON.stringify($scope.data);
        }
        //删除
        $scope.del=function (id) {
            for(var i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    $scope.data.splice(i,1);
                    localStorage.message=JSON.stringify($scope.data);
                }
            }
        }

        //内容改变
        $scope.change=function () {
            // $scope.data.name=document.querySelector(".name").value;
            var obj={};
            obj.id=maxid();
            obj.name="新建列表";
            obj.son=[];
            $scope.data.push(obj);
            $scope.data.pop();
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



}])
