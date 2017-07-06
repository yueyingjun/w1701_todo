/**
 * Created by hp1 on 2017/7/4.
 */
angular.module("myapp",[])
    .controller("todo",function($scope,$filter){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        /*添加列表*/
        $scope.add=function(){
            var obj={};
            obj.id=maxid($scope.data);
            obj.name="新建备忘录"+obj.id;
            obj.time=time();
            obj.son=[];
            $scope.data.push(obj);
            $scope.rows=$scope.data.length;
            localStorage.message=JSON.stringify($scope.data);
        }
        //获取当前时间
        function time() {
            let time=new Date();
            $scope.time = $filter('date')(time,'yyyy-MM-dd');
            return $scope.time;
        }
        // 获取存储的条数
        $scope.rows=$scope.data.length;
        //判断开关
        $scope.show=true;
        $scope.show1=function(){
            $scope.show=false;
        }
        //完成后进行存储
        $scope.done=localStorage.done?JSON.parse(localStorage.done):[];
        $scope.done1=function(id){
            var obj={};
            console.log($scope.done);
            obj.id=maxid($scope.done);
            for(let i=0;i<$scope.data[$scope.now].son.length;i++){
                if($scope.data[$scope.now].son[i].id==id){
                    obj.con=$scope.data[$scope.now].son[i].con;
                    $scope.data[$scope.now].son.splice(i,1);
                }
            }
            $scope.done.push(obj);
            localStorage.message=JSON.stringify($scope.data);
            localStorage.done=JSON.stringify($scope.done);
        }
        //筛选
        $scope.search='';
        $scope.$watch("search",function () {
            $scope.show=true;
            $scope.arr=$filter("filter")($scope.data,{name:$scope.search});
            if($scope.arr.length!=0){
               console.log($scope.arr.length);
                $scope.now=$scope.arr[0].id-1;
            }
        })
        //添加子项
        $scope.addCon=function () {
            var obj={};
            obj.con="我是子选项";
            obj.id=maxid($scope.data[$scope.now].son);
            $scope.data[$scope.now].son.push(obj);
            localStorage.message=JSON.stringify($scope.data);
        };
        //失去焦点
        $scope.blur=function(){
            localStorage.message=JSON.stringify($scope.data);
        }
        //存取当前下标
        $scope.now=0;//不懂
        $scope.index=function(index){
            $scope.show=true;
            $scope.now=index;
        };
        //删除标题
        $scope.del=function (id) {
            angular.forEach($scope.data,function (val, key) {
                if($scope.data[key].id==id){
                    $scope.data.splice(key,1);
                    $scope.rows=$scope.data.length;
                    localStorage.message=JSON.stringify($scope.data);
                }
            })
            $scope.now=0;
        }
        //删除子内容
        $scope.delcon=function (id) {
            angular.forEach($scope.data[$scope.now].son,function (val, key) {
                if($scope.data[$scope.now].son[key].id==id){
                    $scope.data[$scope.now].son.splice(key,1);
                    localStorage.message=JSON.stringify($scope.data);
                }
            })
        }
        //删除已完成的内容
        $scope.completecon=function (id) {
            angular.forEach($scope.done,function (val, key) {
                if($scope.done[key].id==id){
                    $scope.done.splice(key,1);
                    localStorage.done=JSON.stringify($scope.done);
                }
            })
        }
        //传入id下标
        function maxid(arr){
            var id=0;
            var tempid=0;
            if(arr.length==0){
                id=1;
            }else{
                for(var i=0;i<arr.length;i++){
                    if(arr[i].id>tempid){
                        tempid=arr[i].id;//此时值已经发生变化
                    }
                }
                id=tempid+1;
            }
            return id;
        }
    })