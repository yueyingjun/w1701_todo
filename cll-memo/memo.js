angular.module("myapp",[])
    .controller("todo",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        // 当前显示的下标
        $scope.currentIndex=$scope.data.length-1;
        // 当前显示的列表
        $scope.currentList=$scope.data[$scope.currentIndex];

        // 已完成计数
        $scope.comNum=0;
        for(let i=0;i<$scope.data.length;i++){
            for (let j=0;j<$scope.data[i].son.length;j++){
                if($scope.data[i].son[j].status==1){
                    $scope.comNum++;
                }
            }
        }

        /*添加列表*/
        $scope.now=0;
        $scope.add=function(){
            var obj={};
            obj.id=maxid();
            obj.name="新建列表";
            obj.son=[];
            $scope.currentIndex=getIndex($scope.data,obj.id);
            $scope.currentList=$scope.data[$scope.currentIndex];
            $scope.data.push(obj);
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
        $scope.update=function (id) {
            localStorage.message=JSON.stringify($scope.data);
        }
        // 删除左边列表
        $scope.del=function (id) {
            for (let i=0;i<$scope.data.length;i++){
                if ($scope.data[i].id==id){
                    $scope.data.splice(i,1);
                    localStorage.message=JSON.stringify($scope.data);
                }
            }
        }

        // 当前选中的显示在右边视图
        $scope.active=function (id) {
            $scope.currentIndex=getIndex($scope.data,id);
            $scope.currentList=$scope.data[$scope.currentIndex];
        }

        // 右边 添加一条内容
        $scope.addCon=function (id) {
            var j=0;
            for (let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    j=i;
                }
            }
            let obj={}
            obj.cid=cid(j);
            obj.content="";
            obj.status=0;
            $scope.data[j].son.push(obj)
            localStorage.message=JSON.stringify($scope.data);
        }

        // 右边的修改内容
        $scope.updateCon=function () {
            localStorage.message=JSON.stringify($scope.data);
        }

        // 右边 删除
        $scope.delCon=function (pid,cid) {
            for(let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==pid){
                    for (let j=0;j<$scope.data[i].son.length;j++){
                        if($scope.data[i].son[j].cid==cid){
                            $scope.data[i].son.splice(j,1)
                            localStorage.message=JSON.stringify($scope.data);
                        }
                    }
                }
            }
        }


        // 完成
        $scope.complete=function (pid,cid) {
            for(let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==pid){
                    for (let j=0;j<$scope.data[i].son.length;j++){
                        if($scope.data[i].son[j].cid==cid){
                            $scope.data[i].son[j].status=1;
                            $scope.comNum++;
                            localStorage.message=JSON.stringify($scope.data);
                        }
                    }
                }
            }
        }



        function cid(pid){
            var cid=0;
            var tempid=0;
            if($scope.data[pid].son.length==0){
                cid=1;
            }else{

                for(var i=0;i<$scope.data[pid].son.length;i++){
                    if($scope.data[pid].son[i].cid>tempid){
                        tempid=$scope.data[pid].son[i].cid

                    }
                }

                cid=tempid+1;
            }
            return cid;
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

}])