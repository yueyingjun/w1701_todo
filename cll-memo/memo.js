angular.module("myapp",[])
    .controller("todo",["$scope","$filter",function($scope,$filter){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];

        $scope.complete=localStorage.complete?JSON.parse(localStorage.complete):[];
        // 当前显示的下标
        $scope.currentIndex=$scope.data.length-1;
        // 当前显示的列表
        $scope.currentList=$scope.data[$scope.currentIndex];

        // 开关
        $scope.flag=true;

        $scope.search=''
        // 搜索
        $scope.$watch("search",function (news) {
            let arr=$filter("filter")($scope.data,{name:news})
            $scope.currentList=arr[arr.length-1];
        })



        /*添加列表*/
        $scope.now=0;
        $scope.add=function(){
            $scope.flag=true;
            var obj={};
            obj.id=maxid();
            obj.name="新建列表"+obj.id;
            obj.son=[];
            $scope.data.push(obj);
            $scope.currentIndex=getIndex($scope.data,obj.id);
            $scope.currentList=$scope.data[$scope.currentIndex];
            localStorage.message=JSON.stringify($scope.data);
        }

        // 得到当前的下标
        function getIndex(arr,id) {
            for(let i=0;i<arr.length;i++){
                if(arr[i].id==id){
                    return i;
                }
            }
        }

        // 更新左边列表信息
        $scope.update=function () {
            $scope.flag=true;
            localStorage.message=JSON.stringify($scope.data);
        }
        // 删除左边列表
        $scope.del=function (id) {
            for (let i=0;i<$scope.data.length;i++){
                if ($scope.data[i].id==id){
                    $scope.data.splice(i,1);
                }
            }
            let currin=getIndex($scope.data,id)
            if(currin==$scope.data.length-1){
                $scope.currentIndex=currin-1;
                $scope.currentList=$scope.data[$scope.currentIndex];
            }else {
                $scope.currentIndex=$scope.data.length-1;
                $scope.currentList=$scope.data[$scope.currentIndex];
            }
            localStorage.message=JSON.stringify($scope.data);
        }

        // 当前选中的显示在右边视图
        $scope.active=function (id) {
            $scope.flag=true;
            $scope.currentIndex=getIndex($scope.data,id);
            $scope.currentList=$scope.data[$scope.currentIndex];
        }

        // 右边 添加一条内容
        $scope.addCon=function () {
            let obj={}
            obj.id=maxid($scope.currentList.son);
            obj.content=""+obj.id;
            obj.status=0;
            $scope.currentList.son.push(obj)
            localStorage.message=JSON.stringify($scope.data);
        }


        // 右边 删除
        $scope.delCon=function (id) {
            let ind=getIndex($scope.currentList.son,id);
            $scope.currentList.son.splice(ind,1)
            localStorage.message=JSON.stringify($scope.data);
        }


        // 完成
        $scope.completeCon=function (id) {
            let ind=getIndex($scope.currentList.son,id);
            let arr=$scope.currentList.son.splice(ind,1);
            let obj={};
            obj.id=maxid($scope.complete);
            obj.title=$scope.currentList.name;
            obj.content=arr[0].content;
            $scope.complete.push(obj);
            localStorage.message=JSON.stringify($scope.data);
            localStorage.complete=JSON.stringify($scope.complete);
        }


        // 已完成
        $scope.com=function () {
            $scope.flag=false;
        }
        // 删除已完成
        $scope.delCom=function (id) {
            let ind=getIndex($scope.complete,id);
            $scope.complete.splice(ind,1);
            localStorage.complete=JSON.stringify($scope.complete);
        }


        function maxid(arr){
            arr=arr||$scope.data;
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

}])