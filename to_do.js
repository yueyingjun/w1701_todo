angular.module("myapp",[])
    .controller("todo",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.now=0;
        // console.log($scope.data);
        /*添加列表*/
        $scope.add=function(){
            var obj={};
            obj.id=maxid();
            obj.name="新建列表";
            obj.son=[];
            $scope.data.push(obj);
            localStorage.message=JSON.stringify($scope.data);
        };

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

        $scope.fn=function (n) {
            console.log(n);
            $scope.now = n;
        }

        $scope.update=function (id) {
            for (let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    let newmess=JSON.parse(localStorage.message);
                    newmess[i].name=$scope.data[i].name;
                    localStorage.message=JSON.stringify(newmess);
                }
            }
        }
}])
