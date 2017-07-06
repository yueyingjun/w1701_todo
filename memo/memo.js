angular.module("myapp",[])
    .controller("todo",["$scope","$filter",function($scope,$filter){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.now=0;
        $scope.currentIndex=0;
        $scope.current=$scope.data[$scope.currentIndex];
        // 添加
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
        // 左边修改
        $scope.update=function (id) {
            for (let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    let ss=JSON.parse(localStorage.message);
                    ss[i].name=$scope.data[i].name;
                    localStorage.message=JSON.stringify(ss);
                }
            }
        };

        $scope.getIndex=function(arr,id){
            for(var i=0;i<arr.length;i++){
                if(arr[i].id==id){
                    return i;
                }
            }
        };
        $scope.focus=function (id) {
            $scope.flag=false;
            $scope.currentIndex=$scope.getIndex($scope.data,id);
            $scope.current=$scope.data[$scope.currentIndex];
        };
        $scope.blur=function(){
            localStorage.message=JSON.stringify($scope.data);
        }

        // 左边删除
        $scope.ldel=function(id){
            // for (let i=0;i<$scope.data.length;i++){
            //     if($scope.data[i].id==id){
            //         let arr=JSON.parse(localStorage.getItem('message'));
            //         arr.splice(i,1);
            //         localStorage.message=JSON.stringify(arr);
            //     }
            // }

            angular.forEach($scope.current.son,function(obj,index){
                if(obj.id==id){
                    $scope.current.son.splice(index,1);
                    localStorage.message=JSON.stringify($scope.data);
                    console.log(localStorage.message)
                }
            })
        };
        // 已完成
        $scope.finish=function (id,sid) {
            angular.forEach(JSON.parse(localStorage.message),function (val,index) {
                if(val.id==id){
                    angular.forEach(val.son,function(val1,index1){
                        if(val1.sid==sid){
                            let f=JSON.parse(localStorage.getItem('message'));
                            let done=[];
                            done.push(f[index].son[index1]);
                            f[index].son.splice(index1,1);
                            $scope.done=done;
                            localStorage.message=JSON.stringify(f);
                            localStorage.done=JSON.stringify(done);
                        }
                    })
                }
            })
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
        // 右边添加
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
        // 右边修改
        $scope.updateCon=function (id,sid){
            for (let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    for(var j=0;j<$scope.data[i].son.length;j++){
                        if(sid==$scope.data[i].son[j].sid){
                            let up=JSON.parse(localStorage.message);
                            up[i].son[j].lon=$scope.data[i].son[j].lon;
                            localStorage.message=JSON.stringify(up);
                        }
                    }
                }
            }
        }
        // 右边删除
        $scope.rdel=function (id,sid) {
            for (let i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    for(var j=0;j<$scope.data[i].son.length;j++){
                        if(sid==$scope.data[i].son[j].sid){
                            let arr=JSON.parse(localStorage.getItem('message'));
                            arr[i].son[j].lon=$scope.data[i].son[j].lon;
                            arr[i].son.splice(j,1);
                            localStorage.message=JSON.stringify(arr);
                        }
                    }
                }
            }
        }

        $scope.search="";
        $scope.$watch("search",function (news) {
            $arr=$filter("filter")($scope.data,{name:news})
            $scope.current=$arr[0];
        })
    }])
