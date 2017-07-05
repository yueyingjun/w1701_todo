angular.module("myapp",[])
    .controller("todo",["$scope","$filter",function($scope,$filter){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.currentIndex=$scope.data.length-1;
        $scope.current=$scope.data[$scope.currentIndex];
        $scope.done=localStorage.done?JSON.parse(localStorage.done):[];
        $scope.flag=false;
        /*添加列表*/
        $scope.add=function(){
            $scope.flag=false;
            var obj={};
            obj.id=maxid();
            obj.name="新建列表"+obj.id;
            obj.time=new Date();
            obj.son=[];
            $scope.data.push(obj);
            $scope.currentIndex=getIndex($scope.data,obj.id);
            $scope.current=$scope.data[$scope.currentIndex];
            localStorage.message=JSON.stringify($scope.data);
        }
        // 获取焦点
        $scope.focus=function(id){
            $scope.flag=false;
            $scope.currentIndex=getIndex($scope.data,id);
            $scope.current=$scope.data[$scope.currentIndex];
        }
        // 失去焦点
        $scope.blur=function(){
            localStorage.message=JSON.stringify($scope.data);
        }
        // 获取index
        function getIndex(arr,id) {
            for (var i = 0; i < arr.length; i++) {
                if (id==arr[i].id) {
                    return i;
                };
            };
        }

        // 获取列表id
        function maxid(arr){
            var arr=arr||$scope.data;
            var id=0;
            var tempid=0;
            if(arr.length==0){
                id=1;
            }else{

                  for(var i=0;i<arr.length;i++){
                    if(arr[i].id>tempid){
                        tempid=arr[i].id

                    }
                  }
                  id=tempid+1;
            }
            return id;
        }
        // 删除列表
        $scope.del=function(id){
            for (var i = 0; i < $scope.data.length; i++) {
                if (id==$scope.data[i].id) {
                    $scope.data.splice(i,1);
                    $scope.current=$scope.data[$scope.data.length-1];
                    localStorage.message=JSON.stringify($scope.data);
                };
            };
        }

        // 添加内容
        $scope.addCon=function () {
            $scope.flag=false;
            var obj={};
            obj.id=maxid($scope.current.son);
            obj.name="新建足迹"+obj.id;
            $scope.current.son.push(obj);
            localStorage.message=JSON.stringify($scope.data);
        };

        // 删除内容
         $scope.delCon=function(id){
            angular.forEach($scope.current.son,function(obj,index){
                if(obj.id==id){
                    $scope.current.son.splice(index,1);
                    localStorage.message=JSON.stringify($scope.data);
                }
            })
        };
        // 添加完成的内容
        $scope.addDone=function(id){
            var obj={};
            obj.id=maxid($scope.done);
            obj.title=$scope.current.name;
            obj.con=$scope.current.son[getIndex($scope.current.son,id)].name;
            $scope.done.push(obj);
            $scope.current.son.splice(getIndex($scope.current.son,id),1);
            localStorage.done=JSON.stringify($scope.done);      
            localStorage.message=JSON.stringify($scope.data);
        }
        // 删除完成的内容
        $scope.delDone=function(id){
            angular.forEach($scope.done,function(obj,index){
                if(obj.id==id){
                    $scope.done.splice(index,1);
                    localStorage.done=JSON.stringify($scope.done);
                }
            })
        }
        /*搜索*/
        $scope.search="";
        $scope.$watch("search",function(){
            $scope.flag=false;
            var searcharr=$filter("filter")($scope.data,{name:$scope.search});
            $scope.current=searcharr[searcharr.length-1];
        })
        // 显示
        $scope.show=function(){
            if($scope.flag==false){
                $scope.flag=true;
            }else{
                $scope.flag=false;
            }
        }
     
}])