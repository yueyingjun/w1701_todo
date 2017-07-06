angular.module("myapp",[])
    .controller("todo",["$scope","$filter",function($scope,$filter){

        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];

        $scope.currentIndex=$scope.data.length-1;
        $scope.current=$scope.data[$scope.currentIndex];

        $scope.done=localStorage.done?JSON.parse(localStorage.done):[];

        $scope.show=true;
        $scope.search=""

        //搜索的结果

        $scope.$watch("search",function(){
            $arr=$filter("filter")($scope.data,{name:$scope.search});
            $scope.current=$arr[$arr.length-1];
        })




        /*添加列表*/
        $scope.add=function(obj){
            $scope.show=true;
            var obj={};
            obj.id=maxid();
            obj.name="新建列表"+obj.id;
            obj.son=[];
            $scope.data.push(obj);
            $scope.currentIndex=getIndex($scope.data,obj.id);
            $scope.current=$scope.data[$scope.currentIndex];
            localStorage.message=JSON.stringify($scope.data);
        }

        /*列表获得焦点*/

        $scope.focus=function(id){
            $scope.show=true;
            $scope.currentIndex=getIndex($scope.data,id);
            $scope.current=$scope.data[$scope.currentIndex];
        }
        /*失去焦点*/

        $scope.blur=function(){
            localStorage.message=JSON.stringify($scope.data);
        }

       /*删除数据*/

       $scope.del=function(id){
            angular.forEach($scope.data,function(obj,index){
                if(id==obj.id){
                    $scope.data.splice(index,1);
                }

                var ind=getIndex($scope.data,id);

                if(ind==$scope.data.length-1){
                    $scope.currentIndex=ind-1;
                    $scope.current=$scope.data[$scope.currentIndex];
                }else{
                    $scope.currentIndex=$scope.data.length-1;
                    $scope.current=$scope.data[$scope.currentIndex];
                }



            })
           localStorage.message=JSON.stringify($scope.data);

       }

       //添加 子内容

        $scope.addOpt=function(){
           var obj={};
           obj.id=maxid($scope.current.son);
           obj.name="新建条目"+obj.id;
           console.log( $scope.current.son);
           $scope.current.son.push(obj);
           localStorage.message=JSON.stringify($scope.data);

        }

        //删除  子内容

        $scope.delCon=function(id){
            var index=getIndex($scope.current.son,id);
            $scope.current.son.splice(index,1);
            localStorage.message=JSON.stringify($scope.data);
        }

        //点击完成

        $scope.success=function(id){
               var index=getIndex($scope.current.son,id);
               var arr=$scope.current.son.splice(index,1);

               var obj={};
               obj.name=$scope.current.name;
               obj.opt=arr[0].name;
               obj.id=maxid($scope.done);

               $scope.done.push(obj);
            localStorage.message=JSON.stringify($scope.data);
            localStorage.done=JSON.stringify($scope.done);

        }

        //显示已完成内容

        $scope.change=function(){
            $scope.show=false;
        }

        //删除已完成

        $scope.delDone=function(id){
                var index=getIndex($scope.done,id);
            $scope.done.splice(index,1);
            localStorage.done=JSON.stringify($scope.done);

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


        function getIndex(arr,id){
            for(var i=0;i<arr.length;i++){
                if(arr[i].id==id){
                    return i;
                }
            }
        }


}])
