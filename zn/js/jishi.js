angular.module("myapp",[]).controller("jishi",function($scope,$filter){
    $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
    $scope.done=localStorage.done?JSON.parse(localStorage.done):[];
    /*添加列表*/
    $scope.add=function(){
    	$scope.show=false;
        var obj={};
        obj.id=maxid();
        obj.name="新建列表"+obj.id;
        obj.time=new Date();
        obj.son=[];
        $scope.data.push(obj);
        $scope.selectindex=getindex($scope.data,obj.id);
        $scope.select=$scope.data[$scope.selectindex];
        localStorage.message=JSON.stringify($scope.data);
    }
    /*删除列表*/
    $scope.dellist=function(id){
        var ind=getindex($scope.data,id);
        $scope.data.splice(ind,1);
        $scope.selectindex=$scope.data.length-1;
		$scope.select=$scope.data[$scope.selectindex];
        localStorage.message=JSON.stringify($scope.data);
    }
    /*搜索*/
   	$scope.search="";
   	$scope.$watch("search",function(){
   		$scope.show=false;
   		var searcharr=$filter("filter")($scope.data,{name:$scope.search});
   		$scope.select=searcharr[searcharr.length-1];
   	})
    /*当前选中的*/
    $scope.selectindex=$scope.data.length-1;
    $scope.select=$scope.data[$scope.selectindex];
   	/*失去焦点*/
    $scope.blur=function(){
    	localStorage.message=JSON.stringify($scope.data);
    }
    /*获得焦点*/
    $scope.focus=function(id){
    	$scope.show=false;
	    $scope.selectindex=getindex($scope.data,id);
	    $scope.select=$scope.data[$scope.selectindex];
    }
    /*删除内容*/
     $scope.delcon=function(id){
        var inde=getindex($scope.select.son,id);
        $scope.select.son.splice(inde,1);
        localStorage.message=JSON.stringify($scope.data);
    }
     /*添加内容*/
    $scope.addcon=function(id){
    	var obj={};
    	obj.id=maxid($scope.select.son);
		obj.name="新建条目"+obj.id;
        $scope.select.son.push(obj);
        localStorage.message=JSON.stringify($scope.data);
    }
    /*已完成*/
    $scope.selectcon=function(id){
    	var index=getindex($scope.select.son,id);
    	var obj={};
    	obj.id=maxid($scope.done);
    	obj.time=$scope.select.time;
    	obj.name=$scope.select.name;
    	obj.con=$scope.select.son[index].name;
    	$scope.done.push(obj);
    	$scope.select.son.splice(index,1);
    	localStorage.message=JSON.stringify($scope.data);
    	localStorage.done=JSON.stringify($scope.done);
    }
    $scope.show=false;
    $scope.changedone=function(){
    	$scope.show=true;
    }
    /*删除已完成*/
   	$scope.deldone=function(id){
   		var index=getindex($scope.done,id);
   		$scope.done.splice(index,1);
   		localStorage.done=JSON.stringify($scope.done);
   	}
    function maxid(arr){
    	var array=arr||$scope.data;
    	var id=0;
        var tempid=0;
        if(array.length==0){
                id=1;
        }else{
              for(var i=0;i<array.length;i++){
                if(array[i].id>tempid){
                    tempid=array[i].id

                }
              }
              id=tempid+1;
        }
        return id;
    }
    function getindex(array,id){
    	for(var i=0;i<array.length;i++){
    		if(array[i].id==id){
    			return i;
    		}
    	}
    }

})

