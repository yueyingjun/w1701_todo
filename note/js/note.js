/**
 * Created by Administrator on 2017/7/4 0004.
 */
angular.module("myapp",[])
    .controller("todo",["$scope","$filter",function($scope,$filter){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.dones=localStorage.dones?JSON.parse(localStorage.dones):[];

        $scope.currentIndex=0;
        $scope.current=$scope.data[$scope.currentIndex];
        /*添加列表*/
        $scope.add=function(){
            var obj={};
            obj.id=maxid($scope.data);
            obj.name="新建列表";
            obj.son=[];
            $scope.data.push(obj);
            $scope.currentIndex=getindex($scope.data,obj.id);
            $scope.current=$scope.data[$scope.currentIndex];
            localStorage.setItem('message',JSON.stringify($scope.data));
        }
        //标题
        $scope.focus=function (id) {
            $scope.currentIndex=getindex($scope.data,id);
            $scope.current=$scope.data[$scope.currentIndex];
        }
        $scope.change=function () {
            localStorage.setItem('message',JSON.stringify($scope.data));
        };
        //删除列表
        $scope.dellist=function (id) {
            for(var i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id) {
                    $scope.data.splice(i,1);
                    localStorage.message=JSON.stringify($scope.data);
                    var ind=getindex($scope.data,id);
                    if(ind=$scope.data.length-1){
                        $scope.currentIndex=ind-1;
                        $scope.current=$scope.data[$scope.currentIndex];
                    }
                }

            }
        }

        //添加内容
        $scope.newlist=function(){
            var cons = {};
            cons.id = maxid($scope.current.son);
            cons.con = "";
            $scope.current.son.push(cons);
            localStorage.setItem('message', JSON.stringify($scope.data));
        }
        $scope.changecon=function () {
            localStorage.setItem('message',JSON.stringify($scope.data));

        };
        // 删除内容
        $scope.delcon=function (id) {
            for(var i=0;i<$scope.current.son.length;i++){
                if($scope.current.son[i].id==id) {
                    $scope.current.son.splice(i,1);
                    localStorage.message=JSON.stringify($scope.data);
                }
            }
        };

        //完成
        $scope.done=function (cid) {
            var index=getindex($scope.current.son,cid);
            var cons = {};
            cons.id = maxid($scope.dones);
            cons.name=$scope.current.name;
            cons.con =$scope.current.son[index].con;
            $scope.dones.push(cons);
            localStorage.setItem('dones', JSON.stringify($scope.dones));
        };


        $scope.search="";
        $scope.$watch("search",function (news) {
            $arr=$filter("filter")($scope.data,{name:news})
            $scope.current=$arr[0];
        });

        //删除已完成
        $scope.deldone=function (id) {
            for(var i=0;i<$scope.dones.length;i++){
                if($scope.dones[i].id==id) {
                    $scope.dones.splice(i,1);
                    localStorage.dones=JSON.stringify($scope.dones);
                }
            }
        };

        //获得唯一id
        function maxid(arr){
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

        //获得当前下标
        function getindex(arr,id){
            for(var j=0;j<arr.length;j++) {
                if (arr[j].id==id) {
                    return j;
                }
            }
        }

    }])