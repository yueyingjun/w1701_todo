

angular.module("myapp",[])
    .controller("todo",["$scope",function($scope){
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.finish=localStorage.finish?JSON.parse(localStorage.finish):[];
        // console.log($scope.data);
        // console.log($scope.finish);
        // console.log($scope.finish.length);
        /*添加列表*/
        $scope.add=function(){
            var obj={};
            obj.id=maxid($scope.data);
            obj.name="新建存档"+obj.id;
            obj.son=[];
            $scope.data.push(obj);
            localStorage.message=JSON.stringify($scope.data);
            $scope.currentid=obj.id;
            $scope.display=1;
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
        $scope.currentid=$scope.data[0]?$scope.data[0].id:0;
        $scope.setid=function(currentid){
            $scope.currentid=currentid;
            $scope.display=1;
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
            if(id){

            }else{
                return;
            }
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
        $scope.delcon=function(pid,id){
            let index;
            $.each($scope.data,function(k,v){
                if(v.id==pid){
                    index=k;
                    // break;
                }
            })
            
            // $scope.data[index].son
            if(confirm('是否删除该信息？？？')){
                // alert(1)
                for(let i=0;i<$scope.data[index].son.length;i++){
                    if($scope.data[index].son[i].id==id){
                        $scope.data[index].son.splice(i,1);
                        
                    }
                }

            localStorage.message=JSON.stringify($scope.data);
            }else{
                // alert(2)

            }
        }
        // 完成任务
        $scope.finished=function(pid,id){
        console.log($scope.finish);

            let finishobj={};
            finishobj.id=maxid($scope.finish);
            finishobj.title=[];
            finishobj.con=[];
            let index;
            $.each($scope.data,function(k,v){
                if(v.id==pid){
                    index=k;
                    finishobj.title=v.name;
                    // break;
                }
            })
            // $scope.data[index].son
            for(let i=0;i<$scope.data[index].son.length;i++){
                if($scope.data[index].son[i].id==id){
                    finishobj.con=$scope.data[index].son.splice(i,1);
                    
                }
            }
            // 存档
            $scope.finish.push(finishobj);
            localStorage.finish=JSON.stringify($scope.finish);
            localStorage.message=JSON.stringify($scope.data);
           
        }
        // 已完成展示
        $scope.display=0;
        $scope.showfinish=function(){
            $scope.display=!$scope.display;
        }
        $scope.delfinish=function(id){
            if(confirm('是否删除该纪录？？？')){
                // alert(1)
                for(let i=0;i<$scope.finish.length;i++){
                    if($scope.finish[i].id==id){
                        $scope.finish.splice(i,1);
                        
                    }
                }

            localStorage.finish=JSON.stringify($scope.finish);
            }else{
                // alert(2)

            }
        }

        //查询
        $scope.search='';
        $scope.searching=function(){
            alert('searching')
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
var myScroll2;
    myScroll2 = new IScroll('#wrapper2', { 
        // mousewheel:true,
        scrollbars:true,
        fadeScrollbars:true, 
        shrinkScrollbars:'scale',
        click:true

    }); 
var myScroll3;
    myScroll3 = new IScroll('#wrapper3', { 
        // mousewheel:true,
        scrollbars:true,
        fadeScrollbars:true, 
        shrinkScrollbars:'scale',
        click:true

    }); 
})