angular.module("myapp",[])
    .controller("todo",["$scope",function($scope){
        $scope.data=localStorage.wyxmessage?JSON.parse(localStorage.wyxmessage):[];
        console.log($scope.data)
        /*添加列表*/
        $scope.add=function(){
            var obj={};
            obj.id=maxid();
            obj.name="新建列表";
            obj.son=[];
            $scope.data.push(obj);
            // localStorage.message=JSON.stringify($scope.data);
            localStorage.wyxmessage=angular.toJson($scope.data);
            console.log($(".list"))
        }
        //angular.toJson 和 angular.fromJson
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

        function maxid2(a) {
            var id=0;
            var tempid=0;
            for(var i=0;i<$scope.data.length;i++){
                if(a==$scope.data[i].id){
                    if($scope.data[i].son.length==0){
                        id=1;
                    }else{
                        for(var j=0;j<$scope.data[i].son.length;j++){
                            if($scope.data[i].son[j].id>tempid){
                                tempid=$scope.data[i].son[j].id
                            }
                        }
                        id=tempid+1;
                    }
                }
            }

            return id;
        }


        $scope.foc=function (id,up,son){
            $scope.uping=up;
            $scope.titleid=id;
            $scope.con=son;
        }
        $scope.keyup=function (id,name) {
            for(var i=0;i<$scope.data.length;i++){
                if(id==$scope.data[i].id){
                    // console.log($scope.data);
                    $scope.data[i].name=name;
                    $scope.uping=name;
                    localStorage.wyxmessage="";
                    localStorage.wyxmessage=angular.toJson($scope.data);
                    console.log($scope.data);
                }
            }
            console.log(name)
        }
        $scope.addcon=function () {
            var obj={};
            obj.id=maxid2($scope.titleid);
            obj.name="";
            // alert(obj.id);
            for(var i=0;i<$scope.data.length;i++){
                if($scope.titleid==$scope.data[i].id){
                    $scope.data[i].son.push(obj);
                    $scope.listcon=name;
                    localStorage.wyxmessage=angular.toJson($scope.data);
                }
            }
        }
        $scope.listkeyup=function (id,name) {
            for(var i=0;i<$scope.data.length;i++){
                if($scope.titleid==$scope.data[i].id){
                    for(var j=0;j<$scope.data[i].son.length;j++){
                        if(id==$scope.data[i].son[j].id){
                            $scope.data[i].son[j].name=name;
                            localStorage.wyxmessage=angular.toJson($scope.data);
                        }
                    }
                }
            }
            console.log(name)
        }
    }]);