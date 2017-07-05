angular.module("myapp",[])
    .controller("ctrl",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];

        /*添加列表*/
        $scope.add=function(){
            let dateobj=new Date();
            var obj={};
            //时间
            obj.time=dateobj.getHours()+":"+dateobj.getMinutes();
            obj.id=maxid($scope.data);
            obj.name=dateobj.getFullYear()+"-"+dateobj.getMonth()+"-"+dateobj.getDate();
            obj.son=[];
            $scope.data.push(obj);
            localStorage.message=JSON.stringify($scope.data);
        };
        $scope.sonadd=function(id){
            $scope.data.forEach(function (val,index) {
                if(val.id==id){
                    let dateson=new Date();
                    var sonobj={};
                    //时间
                    sonobj.time=dateson.getHours()+":"+dateson.getMinutes();
                    sonobj.id=maxid(val.son);
                    sonobj.name='新建列表'+sonobj.id;
                    sonobj.content='';
                    val.son.push(sonobj);
                    localStorage.message=JSON.stringify($scope.data);
                }
            });

        };
        function maxid($arr){
            var id=0;
            var tempid=0;
            if($arr.length==0){
                id=1;
            }else{
                for(var i=0;i<$arr.length;i++){
                    if($arr[i].id>tempid){
                        tempid=$arr[i].id
                    }
                }
                id=tempid+1;
            }
            return id;
        }
        /*获取当前在数组中的位置*/
        function getIndex($arr,id){
            for(let i=0;i<$arr.length;i++){
                if($arr[i].id==id){
                    return i;
                }
            }
        }
        $scope.currentIndex=0;
        $scope.sonIndex=0;
    //点击切换
        $scope.focus=function (pid,id){
            $scope.currentIndex=getIndex($scope.data,pid);
            $scope.sonIndex=getIndex($scope.data[$scope.currentIndex].son,id);
        };
        $scope.blur=function (){
            localStorage.message=JSON.stringify($scope.data);
        };
    //点击删除
        $scope.del=function (id){
            $scope.data.forEach(function (val,index) {
                if(val.id==id){
                    $scope.data.splice(index,1);
                    if(index==0){
                        $scope.currentIndex=0;
                    }else{
                        $scope.currentIndex=index-1;
                    }
                }
            });
            localStorage.message=JSON.stringify($scope.data);
        };
    //删除子列表
        $scope.delson=function(pid,id){
            $scope.data.forEach(function (val,index) {
                if(val.id==pid){
                    let num=index;
                    val.son.forEach(function(val,index){
                        if(val.id==id){
                            $scope.data[num].son.splice(index,1);
                            if(index==0){
                                $scope.sonIndex=0;
                            }else{
                                $scope.sonIndex=index-1;
                            }
                        }
                    });
                }
            });
            localStorage.message=JSON.stringify($scope.data);
        }

    }]);