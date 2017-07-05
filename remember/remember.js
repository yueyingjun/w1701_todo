

angular.module("myapp",[])
    .controller("todo",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        // console.log($scope.data)
        /*添加列表*/
        $scope.add=function(){
            var obj={};
            obj.id=maxid($scope.data);
            obj.name="新建存档"+obj.id;
            obj.son=[];
            $scope.data.push(obj);
            localStorage.message=JSON.stringify($scope.data);
            $scope.currentid=obj.id;
        }

        function maxid(arr){
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
        $scope.currentid=$scope.data[0].id;
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
        $scope.save=function(){
            localStorage.message=JSON.stringify($scope.data);
        }
        $scope.del=function(id){
            if(confirm('是否删除该存档？？？')){
                // alert(1)
                for(let i=0;i<$scope.data.length;i++){
                    if($scope.data[i].id==id){
                        $scope.data.splice(i,1);
                        if($scope.currentid==id){
                            $scope.currentid=$scope.data[0].id;
                        }
                    }
                }

            localStorage.message=JSON.stringify($scope.data);
            }else{
                // alert(2)

            }
        }
        // 右边
        $scope.addcon=function(id){
            let index;
            $.each($scope.data,function(k,v){
                if(v.id==id){
                    index=k;
                    // break;
                }
            })
            var obj={};
            obj.id=maxid($scope.data[index].son);
            obj.con="早起的虫子有鸟吃！！！！"+obj.id;
           
            $scope.data[index].son.push(obj);
            localStorage.message=JSON.stringify($scope.data);
            // $scope.currentid=obj.id;
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