angular.module("myapp",[])
    .controller("todo",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.now=0;
        /*添加列表*/
        $scope.add=function(){
            var obj={};
            obj.id=maxid();
            obj.name="新建列表";
            obj.son=[];
            $scope.data.push(obj);
            localStorage.message=JSON.stringify($scope.data);
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


        $scope.fn=function (n) {
            $scope.now = n;
        }

        $scope.update=function (id) {
            for (let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    let ss=JSON.parse(localStorage.message);
                    ss[i].name=$scope.data[i].name;
                    localStorage.message=JSON.stringify(ss);
                }
            }
        };

        function maxsid(id){
            for (let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    var sid=0;
                    var tempid=0;
                    if($scope.data[i].son.length==0){
                        sid=1;
                    }else{
                        for(var j=0;j<$scope.data[i].son.length;j++){
                            if($scope.data[i].son[j].sid>tempid){
                                tempid=$scope.data[i].son[j].sid;
                            }
                        }
                        sid=tempid+1;
                    }
                }
            }
            return sid;
        }

        $scope.addCon=function (id) {
            for (let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    var obj1={};
                    obj1.sid=maxsid(id);
                    obj1.lon="123";
                    $scope.data[i].son.push(obj1);
                    localStorage.message=JSON.stringify($scope.data);
                }
            }
        };

        $scope.updateCon=function (id,sid){
            for (let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    for(var j=0;j<$scope.data[i].son.length;j++){
                        if(sid==$scope.data[i].son[j].sid){
                            console.log($scope.data[i].son[j]);
                            let up=JSON.parse(localStorage.message);
                            up[i].son[j].lon=$scope.data[i].son[j].lon;
                            localStorage.message=JSON.stringify(up);
                        }
                    }
                }
            }
        }

    }])
