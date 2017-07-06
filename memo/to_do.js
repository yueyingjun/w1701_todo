angular.module("myapp",[])
    .controller("todo",["$scope","$filter",function($scope,$filter){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.currentIndex=0;
        $scope.current=$scope.data[$scope.currentIndex];
        $scope.done=localStorage.done?JSON.parse(localStorage.done):[];
        $scope.flag=false;
        // console.log($scope.data);
        /*添加列表*/
        $scope.add=function(){
            $scope.flag=false;
            var obj={};
            obj.id=maxid();
            obj.name="新建列表"+obj.id;
            obj.son=[];
            $scope.data.push(obj);
            $scope.current=$scope.data[$scope.getIndex($scope.data,obj.id)];
            localStorage.message=JSON.stringify($scope.data);
        };
        $scope.addCon=function () {
            $scope.flag=false;
            var obj={};
            obj.id=maxid($scope.current.son);
            obj.name="新建足迹"+obj.id;
            $scope.current.son.push(obj);
            localStorage.message=JSON.stringify($scope.data);
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
            // for(var i=0;i<$scope.data.length;i++){
            //     if($scope.data[i].id==id){
            //         $scope.current=$scope.data[i];
            //     }
            // }
        };
        $scope.blur=function(){
            localStorage.message=JSON.stringify($scope.data);
        }
        function maxid(arr){
            var arr=arr||$scope.data;
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

        $scope.delCon=function(id){
            angular.forEach($scope.current.son,function(obj,index){
                if(obj.id==id){
                    $scope.current.son.splice(index,1);
                    localStorage.message=JSON.stringify($scope.data);
                }
            })
        };
        $scope.del=function(id){
            angular.forEach($scope.data,function(obj,index){
                if(obj.id==id){
                    $scope.data.splice(index,1);
                    localStorage.message=JSON.stringify($scope.data);
                    var int=$scope.data.length-1;
                    if(int==index){
                        $scope.current=$scope.data[index-1];
                    }else{
                        $scope.current=$scope.data[int];
                    }
                }
            })
        };

        $scope.addDone=function(id){
            var obj={};
            obj.id=maxid($scope.done);
            obj.title=$scope.current.name;
            obj.con=$scope.current.son[$scope.getIndex($scope.current.son,id)].name;
            $scope.done.push(obj);
            localStorage.done=JSON.stringify($scope.done);
            $scope.current.son.splice($scope.getIndex($scope.current.son,id),1);
            localStorage.message=JSON.stringify($scope.data);
        };

        $scope.show=function(){
            if($scope.flag==false){
                $scope.flag=true;
            }else{
                $scope.flag=false;
            }
        };
        $scope.delDone=function(id){
            angular.forEach($scope.done,function(obj,index){
                if(obj.id==id){
                    $scope.done.splice(index,1);
                    localStorage.done=JSON.stringify($scope.done);
                }
            })
        };
        $scope.search="";
        $scope.$watch("search",function (news) {
            $arr=$filter("filter")($scope.data,{name:news});
            $scope.current=$arr[0];
        })

    }])
