

angular.module("myapp",[])
    .controller("todo",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        // console.log($scope.data)
        /*添加列表*/
        $scope.add=function(){
            var obj={};
            obj.id=maxid();
            obj.name="新建存档";
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
        $scope.currentid=0;
        $scope.setid=function(currentid){
            $scope.currentid=currentid;
        }
        $scope.currentitem=function(currentid){
            let current=[];
            $.each($scope.data,function(k,v){
                if(v.id==currentid){
                    current=v;
                    // break;
                }
            })
            return current;
        }


}])
$(function(){
var myScroll;
    myScroll = new IScroll('#wrapper', { 
        // mousewheel:true,
        scrollbars:true,
        fadeScrollbars:true, 
        shrinkScrollbars:'scale',
        click:true

    });  
})