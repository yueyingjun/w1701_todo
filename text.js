angular.module("qqapp",[])
    .controller("ctrl",function ($scope,$filter) {
        $scope.data=localStorage.mess?JSON.parse(localStorage.mess):[];
        $scope.done=localStorage.done?JSON.parse(localStorage.done):[];
        $scope.title=['新建列表'];
        $scope.currentIndex=$scope.data.length-1;
        $scope.currentCon=$scope.data.length!=0?$scope.data[$scope.data.length-1].title:"新建列表";
        $scope.current=$scope.data.length!=0?$scope.data[$scope.data.length-1].son:[];
        $scope.flag=true;
        $scope.srt='';
        $scope.add=function () {
            $scope.flag=true;
            let obj={};
            obj.id=max();
            obj.title="新建列表"+obj.id;
            obj.son=[];
            $scope.data.push(obj);
            $scope.currentIndex=getIndex($scope.data,obj.id);
            $scope.currentCon=$scope.data[$scope.currentIndex].title;
            localStorage.mess=JSON.stringify($scope.data)
        }
        $scope.$watch('search',function () {
            $scope.flag=true;
            //arr是已经筛选出来的
            var arr=$filter("filter")($scope.data,{title:$scope.search});
            console.log(arr);
            var index=getIndex($scope.data,arr[0].id);
            // $scope.arr=$scope.data[index];
            if(arr.length!=0){
                $scope.currentCon=$scope.data[index].title;
                $scope.current=$scope.data[index].son;
            }

        })
        function getIndex(arr,id){
            for(let i=0;i<arr.length;i++){
                if(arr[i].id==id){
                    return i;
                }
            }

        }
        function max(arr){
            var arr=arr||$scope.data;
            let id,tempid=0;
            if(arr.length==0){
                id=1;
            }else{
                angular.forEach(arr,function(val,index){
                    if(val.id>tempid){
                        tempid=val.id;
                    }
                })
                id=tempid+1;
            }
            return id;
        }

        $scope.focus=function(a,b){
            $scope.flag=true;
            $scope.str=b;
            // $scope.title.push(a);
            $scope.currentIndex=getIndex($scope.data,a);
            $scope.currentCon=$scope.data[$scope.currentIndex].title;
            $scope.current=$scope.data[$scope.currentIndex].son;
        }

        $scope.blur1=function () {

            localStorage.mess=JSON.stringify($scope.data)
        }
        $scope.change=function(value,i){
            $scope.currentCon=value;
            angular.forEach($scope.data,function(val,index){
                if(val.id==i){
                    $scope.data[index].title=value;
                }
            })
                localStorage.mess=JSON.stringify($scope.data);

        }
        $scope.blur=function(i) {
            if($scope.currentCon==''){
                angular.forEach($scope.data,function(val,index){
                    if(val.id==i){
                        $scope.data[index].title= $scope.str;
                    }
                })
                localStorage.mess=JSON.stringify($scope.data)
            }
        }
        $scope.delete=function(value){
            let id;
            angular.forEach($scope.data,function(val,index){
                if(val.id==value){
                    id=index;
                }
            })
            $scope.data.splice(id,1);
            if($scope.data.length==0){
                $scope.currentCon='新建列表';
            }else{
                $scope.currentCon=$scope.data[$scope.data.length-1].title;
            }
            localStorage.mess=JSON.stringify($scope.data);
        }
        $scope.remove=function(value){
            let id;
            angular.forEach($scope.data[$scope.currentIndex].son,function(val,index){
                if(val.id==value){
                    id=index;
                }
            })
            $scope.data[$scope.currentIndex].son.splice(id,1);
            localStorage.mess=JSON.stringify($scope.data);
        }
        $scope.remove1=function(value){
            let id;
            angular.forEach($scope.done,function(val,index){
                if(val.id==value){
                    id=index;
                }
            })
            $scope.done.splice(id,1);
            localStorage.done=JSON.stringify($scope.done);
        }
        // console.log($scope.title[$scope.title]);

        $scope.addson=function () {
            let obj={};
            obj.id=max($scope.data[$scope.currentIndex].son);
            obj.con="新建计划"+obj.id;
            $scope.data[$scope.currentIndex].son.push(obj);
            $scope.currentsonIndex=getIndex($scope.data[$scope.currentIndex].son,obj.id);
            $scope.currentsonCon=$scope.data[$scope.currentIndex].son[$scope.currentsonIndex].con;
            localStorage.mess=JSON.stringify($scope.data)
        }
        $scope.go=function (id) {
            console.log(id)
            let obj={};
            obj.id=max($scope.done);
            obj.title=$scope.currentCon;
            for(let i=0;i<$scope.data[$scope.currentIndex].son.length;i++){
                if($scope.data[$scope.currentIndex].son[i].id==id){
                    obj.name=$scope.data[$scope.currentIndex].son[i].con;
                    $scope.data[$scope.currentIndex].son.splice(i,1);
                }
            }
            $scope.done.push(obj);
            localStorage.done=JSON.stringify($scope.done)
            localStorage.mess=JSON.stringify($scope.data)
        }
        $scope.key=function () {
            $scope.flag=false;
        }

    })