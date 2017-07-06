angular.module("myapp",[])
    .controller("todo",["$scope","$filter",function($scope,$filter){
    	$scope.num=function(){
    		return $scope.done.length;
    	};
//  	定义数据  
    	$scope.arr=localStorage.message?JSON.parse(localStorage.message):[];
//  	定义右边要显示的是第几个
    	$scope.currentIndex=$scope.arr.length-1;
//  	定义右边要显示的是第几个数组
    	$scope.current=$scope.arr[$scope.currentIndex]
        // console.log($scope.arr)
        $scope.flag=true;
        
//      定义搜索字符串初始值为空
        $scope.search="";
//      $watch 监听模型变化     （监听的对象,变化时会被调用函数（新值，旧值）)
        $scope.$watch('search',function(){
            $scope.search_arr=$filter('filter')($scope.arr,{name:$scope.search})
            $scope.current=$scope.search_arr[$scope.search_arr.length-1];
        });
        
        /*添加列表*/
        $scope.add=function(){
//      	创建一个空对象
            var obj={};
//          给对象添加属性
            obj.id=maxid();
            obj.name="新建列表"+obj.id;
            obj.son=[];
            $scope.arr.push(obj);
           	$scope.currentIndex=getIndex($scope.arr,obj.id);
           	$scope.current=$scope.arr[$scope.currentIndex]
//          把json对象转化为字符串	
            localStorage.message=JSON.stringify($scope.arr);
        }
//      获取当前的下标
        function getIndex(arr,id){
//      	添加的时候循环这个数组 如果传进来的ID==数组中第I个的ID时 返回i
        	for( var i=0;i<arr.length;i++){
        		if(arr[i].id==id){
        			return i;
        		}
        	}
        }
      
      //		添加计划
		$scope.addplay=function(){
			let obj={};
			obj.id=maxid($scope.current.son);
			obj.name="新建play"+obj.id;
			$scope.current.son.push(obj);
			localStorage.message=JSON.stringify($scope.arr)
		}
//		修改计划
		$scope.editplay=function(id){
			for(var i=0;i<$scope.current.son.length;i++){
                if(id==$scope.current.son[i].id){
               		$scope.current.son[i].name
                }
            }
			localStorage.message=JSON.stringify($scope.arr)
		}
//		删除计划
		$scope.delplay=function(id){
			for(var i=0;i<$scope.current.son.length;i++){
                if(id==$scope.current.son[i].id){
               		$scope.current.son.splice(i,1)
                }
            }
			localStorage.message=JSON.stringify($scope.arr)
		}
//		完成计划
		$scope.done=localStorage.done?JSON.parse(localStorage.done):[];
		$scope.show=function(id){
			for(var i=0;i<$scope.current.son.length;i++){
                if(id==$scope.current.son[i].id){
               		var brr=$scope.current.son.splice(i,1)[0];
               		brr.onlyid=maxid($scope.done);
               		brr.list=$scope.current.name;
               		localStorage.message=JSON.stringify($scope.arr)
                }
                $scope.done.push(brr)
            }
			localStorage.done=JSON.stringify($scope.done)
		}
//		点击显示已完成
		$scope.showhtml=function(){
			$scope.flag=false;
		}
//		删除已完成
		$scope.delhtml=function(id){
			console.log($scope.done)
			let index=getIndex($scope.done,id-1)
			$scope.done.splice(index,1);
			localStorage.done=JSON.stringify($scope.done)
		}
		
		
//    获取最大ID
        function maxid(arr){
        	var arr=arr||$scope.arr;
            var id=0;
            var tempid=0;
//          如果这个数组没有内容的时候 它的ID是1
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
//      左边获取焦点 让右边显示对应的
        $scope.focus=function(id){
        	$scope.flag=true;
        	$scope.currentIndex=getIndex($scope.arr,id);
        	$scope.current=$scope.arr[$scope.currentIndex];
        }
//      删除
        $scope.del=function(id){
        	var index=getIndex($scope.arr,id);
        	
        	if(index==$scope.arr.length-1){
        		$scope.currentIndex=index-1;
        		$scope.current=$scope.arr[$scope.currentIndex]
        	}else{
//      		如果删除的那条数据的id等于最后一个的话
        		$scope.currentIndex=$scope.arr.length-1;
        		$scope.current=$scope.arr[$scope.currentIndex]
        	}
        	$scope.arr.splice(index,1);
        	localStorage.message=JSON.stringify($scope.arr)
        }
//      修改
		$scope.edit=function(id){
			$scope.flag=true;
			for(var i=0;i<$scope.arr.length;i++){
                if(id==$scope.arr[i].id){
                	$scope.arr[i].name
                }
            }
			localStorage.message=JSON.stringify($scope.arr)
		}
		
    }])