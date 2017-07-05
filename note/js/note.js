/**
 * Created by Administrator on 2017/7/4 0004.
 */
angular.module("myapp",[])
    .controller("todo",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.con=localStorage.content?JSON.parse(localStorage.content):[];
        /*添加列表*/
        $scope.add=function(){
            var obj={};
            obj.id=maxid();
            obj.name="新建列表";
            obj.son=[];
            $scope.data.push(obj);
            localStorage.setItem('message',JSON.stringify($scope.data));
        }
        //标题
        $scope.val="标题";
        $scope.con1="内容";
        $scope.focus=function (id) {
            for(var i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id) {
                    $scope.val = $scope.data[i].name;
                }
            }
        }
        $scope.change=function (id) {
            for(var i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id) {
                    $scope.val = $scope.data[i].name;
                    localStorage.setItem('message',JSON.stringify($scope.data));
                }
            }
        };
        //删除列表
        $scope.dellist=function (id) {
            for(var i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id) {
                    $scope.data.splice(i,1);
                    localStorage.message=JSON.stringify($scope.data);
                }
            }
        }

        //添加内容
        $scope.newlist=function(){
            var cons={};
            cons.cid=maxid1();
            cons.con="";
            cons.son=[];
            $scope.con.push(cons);
            localStorage.setItem('content',JSON.stringify($scope.con));
        }
        $scope.changecon=function (id) {
            for(var i=0;i<$scope.con.length;i++){
                if($scope.con[i].cid==id) {
                    $scope.con1 = $scope.con[i].con;
                    localStorage.setItem('content',JSON.stringify($scope.con));
                }
            }
        };
        //删除内容
        $scope.delcon=function (cid) {
            for(var i=0;i<$scope.con.length;i++){
                if($scope.con[i].cid==cid) {
                    $scope.con.splice(i,1);
                    localStorage.content=JSON.stringify($scope.con);
                }
            }
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
        function maxid1(){
            let id=0;
            let tempid=0;
            if($scope.con.length==0){
                id=1;
            }else{

                for(var i=0;i<$scope.con.length;i++){
                    if($scope.con[i].cid>tempid){
                        tempid=$scope.con[i].cid

                    }
                }

                id=tempid+1;
            }
            return id;
        }



    }])