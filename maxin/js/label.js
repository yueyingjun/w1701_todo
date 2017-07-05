angular.module("box",[])
    .controller("boxs",["$scope","$filter",function ($scope,$filter) {
        $scope.do_arr=localStorage.message_do?JSON.parse(localStorage.message_do):[];
        $scope.arr=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.one=$scope.arr[0];
        $scope.checked="全选";
        $scope.add=function () {
            var obj={}
            obj.id=getid($scope.arr);
            obj.name="新建便签"+obj.id;
            obj.son=[];
            obj.time=new Date();
            $scope.arr.push(obj);
            $scope.display(obj.id);
            localStorage.message=JSON.stringify($scope.arr);
        }
        function getid(brr) {
            var arr=[];
            var id;
            brr.forEach(function (value,index) {
                arr[index]=value;
            })
            if(arr.length<=0){
                id=1;
            }else {
                arr.sort((a,b)=>b.id-a.id)
                id=arr[0].id+1;
            }
            return id;
        }
        $scope.display=function (id) {
            $scope.arr.forEach(function (value,index) {
                if(id==value.id){
                    $scope.one=value;
                }
            })
        }
        $scope.add_con=function (id) {
            $scope.arr.forEach(function (value,index) {
                if(id==value.id){
                    var obj={}
                    obj.id=getid(value.son);
                    obj.value="留言内容"+obj.id;
                    obj.type="no";
                    value.son.push(obj)
                }
            })
            localStorage.message=JSON.stringify($scope.arr);
        }
        $scope.del=function (id) {
            $scope.arr.forEach(function (value,index) {
                if(id==value.id){
                    if(index==$scope.arr.length-1){
                        $scope.one=$scope.arr[index-1];
                        if($scope.arr.length==0){
                            $scope.one=$scope.arr[0];
                        }
                    }else {
                        $scope.one = $scope.arr[index + 1];
                        if ($scope.arr.length == 0) {
                            $scope.one = $scope.arr[0];
                        }
                    }
                    $scope.arr.splice(index, 1);
                }
            })

            localStorage.message=JSON.stringify($scope.arr);
        }
        $scope.del_con=function (id) {
            $scope.arr.forEach(function (value,index) {
                if(p_id==value.id){
                    value.son.forEach(function (value1,index1) {
                        if(value1.id==id) {
                            value.son.splice(index1, 1)
                        }
                    })
                }
            })
            localStorage.message=JSON.stringify($scope.arr);
        }
        $(".left>h4").click(function () {
            $(this).next("ul").slideToggle();
            $(this).find("span").toggleClass("glyphicon glyphicon-tasks");
        })
        $scope.do=function (p_id,id) {
            $scope.one.son.forEach(function (value,index) {
                if(value.id==id) {
                    var obj={};
                    obj.id=getid($scope.do_arr);
                    obj.value=value.value;
                    obj.list=$scope.one.name;
                    $scope.do_arr.push(obj);
                    $scope.one.son.splice(index,1);
                }
            })
            localStorage.message_do=JSON.stringify($scope.do_arr);
            localStorage.message=JSON.stringify($scope.arr);
        }
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
            localStorage.message=JSON.stringify($scope.arr);
        }
        //搜索的列表显示
        $scope.search="";
        $scope.$watch('search',function(){
            $scope.search_arr=$filter('filter')($scope.arr,{name:$scope.search})
            $scope.one=$scope.search_arr[0];
        });
        $scope.all_checked=function () {
            if($scope.one.son.length>0){
                if($scope.checked=="全选"){
                    $scope.checked="取消全选"
                }else if($scope.checked=="取消全选"){
                    $scope.checked="全选"
                }
            }
        }
        $scope.all_do=function () {
            $scope.all_checked();
            $scope.one.son.forEach(function (value,index) {
                var obj={};
                obj.id=getid($scope.do_arr);
                obj.value=value.value;
                obj.list=$scope.one.name;
                $scope.do_arr.push(obj);
            })
            $scope.one.son=[];
            localStorage.message_do=JSON.stringify($scope.do_arr);
            localStorage.message=JSON.stringify($scope.arr);
        }
    }])
