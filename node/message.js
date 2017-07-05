/**
 * Created by Administrator on 2017/7/4.
 */
    angular.module('note',[])
        .controller('ctrl',["$scope",function ($scope) {
            $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
            $scope.now=0;
            $scope.all=0;
            // 添加
            $scope.add=function () {
                var obj={};
                obj.id=maxid();
                obj.name="新建列表";
                obj.son=[];
                $scope.data.push(obj);
                localStorage.message=JSON.stringify($scope.data);
                $scope.now=obj.id-1;
            }

            $scope.del=function (id) {
                angular.forEach($scope.data,function (val, key) {
                    if($scope.data[key].id==id){
                        $scope.data.splice(key,1);
                        localStorage.message=JSON.stringify($scope.data);
                    }
                })
            }

            $scope.gaibian=function (id) {
                angular.forEach($scope.data,function (val, key) {
                    if($scope.data[key].id==id){
                        var aa=JSON.parse(localStorage.message);
                        aa[key].name=$scope.data[key].name
                        localStorage.message=JSON.stringify(aa);
                    }
                })
            }

            $scope.fn=function (n) {
                $scope.now = n;
            }

            $scope.addson=function (id) {
                var obj={};
                obj.id=minid(id);
                obj.con="填写备忘录";
                obj.ok=0;
                angular.forEach($scope.data,function (val, key){
                    if($scope.data[key].id==id){
                        $scope.data[key].son.push(obj);
                    }
                })
                localStorage.message=JSON.stringify($scope.data);
            }

            $scope.delson=function (pid,id) {
                var keyid2;
                angular.forEach($scope.data,function (val, key){
                    if($scope.data[key].id==pid){
                        keyid2=key;
                    }
                })
                for(var i=0;i<$scope.data[keyid2].son.length;i++){
                    if($scope.data[keyid2].son[i].id==id){
                        $scope.data[keyid2].son.splice(i,1);
                        localStorage.message=JSON.stringify($scope.data);
                    }
                }
            }

            $scope.gaibianson=function (pid,id) {
                var keyid2;
                angular.forEach($scope.data,function (val, key){
                    if($scope.data[key].id==pid){
                        keyid2=key;
                    }
                })
                for(var i=0;i<$scope.data[keyid2].son.length;i++){
                    if($scope.data[keyid2].son[i].id==id){
                        var aa=JSON.parse(localStorage.message);
                        aa[keyid2].son[i].con=$scope.data[keyid2].son[i].con
                        localStorage.message=JSON.stringify(aa);
                    }
                }
            }

            $scope.backson=function (pid,id) {
                var keyid2;
                angular.forEach($scope.data,function (val, key){
                    if($scope.data[key].id==pid){
                        keyid2=key;
                    }
                })
                for(var i=0;i<$scope.data[keyid2].son.length;i++){
                    if($scope.data[keyid2].son[i].id==id){
                        $scope.data[keyid2].son[i].ok=1;
                        var aa=JSON.parse(localStorage.message);
                        aa[keyid2].son[i].ok=1;
                        localStorage.message=JSON.stringify(aa);
                        $scope.all++;
                    }
                }
            }

            for(var i=0;i<$scope.data.length;i++){
                for(var j=0;j<$scope.data[i].son.length;j++){
                    if($scope.data[i].son[j].ok==1){
                        $scope.all++;
                    }
                }
            }




            function maxid(){
                var id=0;
                var tempid=0;
                if($scope.data.length==0){
                    id=1;
                }else{

                    for(var i=0;i<$scope.data.length;i++){
                        if($scope.data[i].id>tempid){
                            tempid=$scope.data[i].id;

                        }
                    }

                    id=tempid+1;
                }
                return id;
            }

            function minid(pid){
                var id=0;
                var tempid=0;

                angular.forEach($scope.data,function (val, key){
                    if($scope.data[key].id==pid){
                        keyid=key;
                    }
                })

                if($scope.data[keyid].son.length==0){
                    id=1;
                }else{
                    for(var i=0;i<$scope.data[keyid].son.length;i++){
                        if($scope.data[keyid].son[i].id>tempid){
                            tempid=$scope.data[keyid].son[i].id;
                        }
                    }
                    id=tempid+1;
                }
                return id;
            }
        }])