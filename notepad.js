angular.module('myapp',[]).controller('catr',["$scope","$filter",function ($scope,$filter) {
    $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
    $scope.complete=localStorage.complete?JSON.parse(localStorage.complete):[];
    $scope.currentIndex=$scope.data.length-1;//当前ID
    $scope.currentList=$scope.data[$scope.currentIndex];//当前列表
    $scope.flag=true;//开关

    //搜索
    $scope.search='';
    $scope.$watch("search",function (news) {
        let arr=$filter("filter")($scope.data,{name:news})
        $scope.currentList=arr[arr.length-1];
    });

    $scope.now=0;
    $scope.add=function () {
        $scope.flag=true;
        var obj={};
        obj.id=maxid();
        obj.name="记录的那些事"+obj.id;
        obj.son=[];
        $scope.data.push(obj);
        $scope.currentIndex=getIndex($scope.data,obj.id);
        $scope.currentList=$scope.data[$scope.currentIndex];
        localStorage.message=JSON.stringify($scope.data);
    };

    //右边标题
        function getIndex(arr,id){
            for (let i=0;i<arr.length;i++){
                if (arr[i].id==id){
                    return i;
                }
            }

        }
    //左边信息
    $scope.update=function () {
        $scope.flag=true;
        localStorage.message=JSON.stringify($scope.data);
    };

    //删除
    $scope.remove=function (id) {
        for (let i=0;i<$scope.data.length;i++){
            if ($scope.data[i].id==id){
                $scope.data.splice(i,1)
            }
        }
        let currin=getIndex($scope.data,id);
        if (currin==$scope.data.length-1){
            $scope.currentIndex=currin-1;
            $scope.currentList=$scope.data[$scope.currentIndex];
        }else {
            $scope.currentIndex=$scope.data.length-1;
            $scope.currentList=$scope.data[$scope.currentIndex];
        }
        localStorage.message=JSON.stringify($scope.data);
    }

    //右边视图
    $scope.active=function (id) {
        $scope.flag=true;
        $scope.currentIndex=getIndex($scope.data,id);
        $scope.currentList=$scope.data[$scope.currentIndex];
    }


    //添加子内容
    $scope.addCon=function (){
        var obj={};
        obj.id=maxid($scope.currentList.son);
        obj.content="子内容"+obj.id;
        obj.status=0;
        $scope.currentList.son.push(obj);
        localStorage.message=JSON.stringify($scope.data);

    };


    //删除子内容
    $scope.removeCon=function (id) {
        var index=getIndex($scope.currentList.son,id);
        $scope.currentList.son.splice(index,1);
        localStorage.message=JSON.stringify($scope.data);
    };

    // 失去焦点
    $scope.blur=function () {
        localStorage.message=JSON.stringify($scope.data);
    };

    //完成
    $scope.completeCon=function (id) {
        let index=getIndex($scope.currentList.son,id);
        let arr=$scope.currentList.son.splice(index,1);
        let obj={};
        obj.id=maxid($scope.complete);
        obj.title=$scope.currentList.name;
        obj.content=arr[0].content;
        $scope.complete.push(obj);
        localStorage.message=JSON.stringify($scope.data);
        localStorage.complete=JSON.stringify($scope.complete);
    }
    //已完成
    $scope.com=function () {
        $scope.flag=false;
    }

    //删除完成
    $scope.delCom=function (id) {
        let index=getIndex($scope.complete,id);
        $scope.complete.splice(index,1);
        localStorage.complete=JSON.stringify($scope.complete);
    }

    //获取ID
    function maxid(arr) {
        var arr=arr || $scope.data;
        var id=0;
        var tempid=0;
        if (arr.length==0){
            id=1;
        }else {
            for (var i=0;i<arr.length;i++){
                if (arr[i].id>tempid){
                    tempid=arr[i].id
                }
            }
            id=tempid+1;
        }
        return id;
    }



}]);