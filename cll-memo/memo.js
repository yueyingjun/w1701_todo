angular.module("myapp",[])
    .controller("todo",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];

        // 完成计数
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
            $scope.data.push(obj);
            localStorage.message=JSON.stringify($scope.data);

        }


        $scope.update=function (id) {
            for (let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    // $scope.name=$scope.data[i].name;
                    let ss=JSON.parse(localStorage.message);
                    ss[i].name=$scope.data[i].name;
                    localStorage.message=JSON.stringify(ss);
                }
            }
        }
        $scope.del=function (id) {
            for (let i=0;i<$scope.data.length;i++){
                if ($scope.data[i].id==id){
                    $scope.data.splice(i,1);
                    let ss=JSON.parse(localStorage.message);
                    ss.splice(i,1);
                    localStorage.message=JSON.stringify(ss);
                }
            }
        }

        $scope.active=function (n) {
            $scope.now=n;
        }


        $scope.addCon=function (id) {
            var j=0;
            for (let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    j=i;
                }
            }
            let ss=JSON.parse(localStorage.message);
            let obj={}
            obj.cid=cid(j);
            obj.content="";
            obj.status=0;
            // console.log(obj)
            // console.log($scope.data[j])
            $scope.data[j].son.push(obj)
            ss[j].son.push(obj)
            localStorage.message=JSON.stringify(ss);
        }

        $scope.updateCon=function (pid,cid) {
            for(let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==pid){
                    for (let j=0;j<$scope.data[i].son.length;j++){
                        if($scope.data[i].son[j].cid==cid){
                            let ss=JSON.parse(localStorage.message);
                            ss[i].son[j].content=$scope.data[i].son[j].content;
                            localStorage.message=JSON.stringify(ss);
                        }
                    }
                }
            }
        }


        $scope.delCon=function (pid,cid) {
            // console.log(pid,cid)
            for(let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==pid){
                    for (let j=0;j<$scope.data[i].son.length;j++){
                        if($scope.data[i].son[j].cid==cid){
                            $scope.data[i].son.splice(j,1)
                            let ss=JSON.parse(localStorage.message);
                            ss[i].son.splice(j,1);
                            localStorage.message=JSON.stringify(ss);
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
                            let ss=JSON.parse(localStorage.message);
                            ss[i].son[j].status=1;
                            localStorage.message=JSON.stringify(ss);
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