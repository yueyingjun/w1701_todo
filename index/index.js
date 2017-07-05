/**
 * Created by Administrator on 2017/7/4.
 */
angular.module("myapp",[])
    .controller("todo",["$scope",function ($scope) {
        $scope.do_arr=localStorage.message_do?JSON.parse(localStorage.message_do):[];
        $scope.date=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.add=function(){
            let obj={};
            obj.id=maxid();
            obj.name="新建列表"+obj.id;
            obj.son=[];
            $scope.date.push(obj);
            $scope.currentIndex=$scope.date.length-1;
            $scope.current=$scope.date[$scope.currentIndex];
            localStorage.message=JSON.stringify($scope.date);
            $scope.flag=true;
        };
        function maxid(){
           let id=0;
           let temp=0;
            if($scope.date.length==0){
                id=1;
            }else{
                for(let i=0;i<$scope.date.length;i++){
                    if($scope.date[i].id>temp){
                        temp=$scope.date[i].id
                    }
                }
                id=temp+1;
            }
            return id;
        }
        function getIndex() {

        }
        //点击显示
        $scope.focus=function (id) {
            $scope.flag=true;
            angular.forEach($scope.date,function (value,index) {
                if (id==value.id){
                    $scope.current=value;
                }
            })
        };
        $scope.blur=function () {
            localStorage.message=JSON.stringify($scope.date);
        };
        //删除列表
        $scope.del=function (id) {
            $scope.date.forEach(function (value,index) {
                if (id==value.id){
                    if(index==$scope.date.length-1){
                        $scope.current=$scope.date[index-1];
                        if($scope.date.length==0){
                            $scope.current=$scope.date[0];
                        }
                    }else {
                        $scope.current = $scope.date[index+1];
                    }
                    $scope.date.splice(index,1)
                }
            });
            localStorage.message=JSON.stringify($scope.date);
        };
        //添加内容
        $scope.add_con=function (id) {
            $scope.date.forEach(function (value,index) {
                if (id==value.id){
                    let obj={};
                    $scope.id=maxid(value.son);
                    $scope.name="添加事件内容"+obj.id;
                    $scope.type="no";
                    value.son.push(obj);
                }
            });
            localStorage.message=JSON.stringify($scope.date);
        };
        //删除内容
        $scope.remove=function(id,sid) {
            $scope.date.forEach(function (value,index) {
                if (id==value.id){
                    value.son.forEach(function (val,index) {
                        if (sid==val.id){
                            value.son.splice(index,1)
                        }
                    })
                }
            });
            localStorage.message=JSON.stringify($scope.date);
        };
        $scope.do=function (p_id,id) {
            $scope.date.forEach(function (value,index) {
                if(p_id==value.id){
                    value.son.forEach(function (value1,index1) {
                        if(value1.id==id) {
                            value.son.type = "yes";
                            value1.doid=p_id+"_"+id;
                            $scope.do_arr.push(value1);
                            value.son.splice(index1,1);
                        }
                    })
                }
            });
            localStorage.message_do=JSON.stringify($scope.do_arr);
            localStorage.message=JSON.stringify($scope.date);
        };
           $scope.flag=true;
           $scope.show=function () {
               $scope.flag=false;
           };
        $scope.del_do=function (id) {
            $scope.do_arr.forEach(function (value,index) {
                if(id==value.id){
                    $scope.do_arr.splice(index,1);
                }
            })
            localStorage.message_do=JSON.stringify($scope.do_arr);
        }
        $scope.up=function () {
            localStorage.message_do=JSON.stringify($scope.do_arr);
            localStorage.message=JSON.stringify($scope.date);
        }
        //搜索的列表显示
        $scope.search="";
        $scope.$watch('search',function(){
            $scope.search_arr=$filter('filter')($scope.date,{name:$scope.search})
            $scope.one=$scope.search_arr[0];
        });
        $scope.all_do=function () {
            $scope.current.son.forEach(function (value,index) {
                var obj={};
                obj.id=maxid($scope.do_arr);
                obj.value=value.value;
                obj.list=$scope.current.name;
                $scope.do_arr.push(obj);
            })
            $scope.current.son=[];
            localStorage.message_do=JSON.stringify($scope.do_arr);
            localStorage.message=JSON.stringify($scope.date);
        }

    }]);