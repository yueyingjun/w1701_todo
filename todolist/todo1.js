angular.module("myapp",[])
    .controller("todo",["$scope","$filter",function($scope,$filter){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.currentIndex=0;
        $scope.current=$scope.data[$scope.currentIndex];
        $scope.done=localStorage.done?JSON.parse(localStorage.done):[];

        $scope.show=true;
        console.log($scope.data);
        /*添加列表*/
        $scope.add=function(){
            $scope.show=true;
            $scope.search="";
            var obj={};
            obj.id=maxid();
            obj.name="新建列表"+obj.id;
            obj.son=[];
            $scope.temp=$scope.data;
            $scope.temp.push(obj);
            localStorage.message=JSON.stringify($scope.temp);
            $scope.currentIndex=getindex($scope.temp,obj.id);
            $scope.current=$scope.temp[$scope.currentIndex];
            // console.log($scope.currentIndex)
        }
        //angular.toJson 和 angular.fromJson
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

        function getindex(arr,id) {
            for(var i=0;i<arr.length;i++){
                if(arr[i].id==id){
                    return i;
                }
            }
        }

        $scope.focus=function (id,up,son){
            $scope.show=true;
            $scope.currentIndex=getindex($scope.data,id);
            $scope.current=$scope.data[$scope.currentIndex];
        }
        $scope.blur=function () {
            localStorage.message=JSON.stringify($scope.data);
        }
        $scope.addOpt=function () {
            var obj={};
            obj.id=maxid($scope.current.son);
            obj.name="新建条目"+obj.id;
            $scope.current.son.push(obj);
            localStorage.message=JSON.stringify($scope.data);
        }

        //删除左侧列表
        $scope.del=function (id) {
            var ind=getindex($scope.data,id);
            angular.forEach($scope.data,function (obj,index) {
                if(id==obj.id) {
                    if (ind == $scope.data.length - 1) {
                        console.log(ind);
                        $scope.currentIndex = ind - 1;
                        $scope.current = $scope.data[$scope.currentIndex];
                        $scope.data.splice(ind, 1);
                        localStorage.message = JSON.stringify($scope.data);
                    } else {
                        $scope.currentIndex = $scope.data.length - 1;
                        $scope.current = $scope.data[$scope.currentIndex];
                        $scope.data.splice(ind, 1);
                        localStorage.message = JSON.stringify($scope.data);
                    }
                }
            })
        }
        //删除右侧列表内容
        $scope.delCon=function (id) {
            angular.forEach($scope.current.son,function (obj,index) {
                if(obj.id==id){
                    $scope.current.son.splice(index,1);
                    localStorage.message = JSON.stringify($scope.data);
                }
            })
        }

        $scope.success=function (id) {
            var index=$scope.currentIndex;
            var obj={};
            obj.id=maxid($scope.done);
            obj.name=$scope.data[index].name;
            obj.opt=$scope.current.son[getindex($scope.current.son,id)].name;
            $scope.done.push(obj);
            localStorage.done = JSON.stringify($scope.done);
            $scope.current.son.splice(getindex($scope.current.son,id),1);
            localStorage.message = JSON.stringify($scope.data);
        }
        $scope.delDone=function (id) {
            angular.forEach($scope.done,function (obj,index) {
                if(id==obj.id){
                    $scope.done.splice(index,1);
                    localStorage.done = JSON.stringify($scope.done);
                }
            })
        }
        $scope.zhuanhuan=function () {
            $scope.show=false;
        }
        $scope.temp=$scope.data;
        $scope.$watch('search',function (n,o) {
            $scope.temp = $filter('filter')($scope.data,n);
            $scope.currentIndex=0;
            $scope.current=$scope.temp[$scope.currentIndex];
        })
    }]);