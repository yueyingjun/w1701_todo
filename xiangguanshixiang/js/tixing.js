angular.module("myapp",[])
    .controller("tixing",['$scope','$filter',function($scope,$filter){//添加服务
        /*获取localStorage.message*/
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.do=localStorage.do?JSON.parse(localStorage.do):[];

        /*设置current初始值*/
        $scope.currentIndex=getIndex($scope.data);//默认最后一个是当前下标
        $scope.current=$scope.data[$scope.currentIndex];//默认最后一个是当前对象

        /*添加列表*/
        $scope.addlist=function(){
            $scope.show=false;
            let obj={};
            obj.id=maxid($scope.data);
            obj.name="我的计划";
            obj.son=[];
            $scope.data.push(obj);
            localStorage.message=JSON.stringify($scope.data);//数组转化成字符串
            $scope.currentIndex=getIndex($scope.data);//获取当前下标
            $scope.current=obj;//当前对象
        }
        /*删除列表*/
        $scope.dellist=function(id){
            let last=getIndex($scope.data);
            $scope.data.forEach(function(value,index){
                // angular.forEach($scope.data,function（obj,index  ）{})
                   if(value.id==id) {
                       $scope.data.splice(index,1);
                       if(index==last){
                           $scope.current=$scope.data[index-1];
                           $scope.currentIndex=index-1;
                       }
                   }
            })
            localStorage.message=JSON.stringify($scope.data);
        }
        /*当列表聚集焦点时，改变current,显示当前内容*/
        $scope.focus=function(id){//焦点
            $scope.show=false;
            $scope.data.forEach(function(value,index){
                if(value.id==id) {
                    $scope.current=value;
                    $scope.currentIndex=index;
                }
            })
        }
        /*当列表失去焦点时，改变localStorage.message，存储列表改后的值*/
        $scope.blur=function(){//失去焦点存储
            localStorage.message=JSON.stringify($scope.data);
        }
        /* 添加子元素*/
        $scope.addopt=function(id){
           let index=getIndex($scope.data,id);
           let obj={};
           obj.id=maxid($scope.data[index].son);
           obj.name="我的细节";
           $scope.data[index].son.push(obj);
           localStorage.message=JSON.stringify($scope.data);//数组转化成字符串
        }
        /* 删除子元素*/
        $scope.delopt=function(id){
            let index=$scope.currentIndex;
            let index1=getIndex($scope.data[index].son,id);
            $scope.data[index].son.splice(index1,1);
            localStorage.message=JSON.stringify($scope.data);
        }

        /*已完成*/
        $scope.over=function(id){
            let index=$scope.currentIndex;
            let index1=getIndex($scope.data[index].son,id);
            let obj={};
            obj.id=maxid($scope.do);
            obj.data=$scope.current.id;
            obj.name=$scope.current.name;
            obj.son=$scope.data[index].son[index1];
            $scope.do.push(obj);
            $scope.data[index].son.splice(index1,1);
            localStorage.do=JSON.stringify($scope.do);
            localStorage.message=JSON.stringify($scope.data);
        }

        /*已完成---展示*/
        $scope.show=false;
        $scope.showover=function(){
            $scope.show=true;
        }

        /* 删除已完成*/
        $scope.delover=function(id){//..,son.id
            let index=getIndex($scope.do,id);
            $scope.do.splice(index,1)
            localStorage.do=JSON.stringify($scope.do);
        }

        //列表搜索
        $scope.$watch('search',function(){
            var arr=$filter('filter')($scope.data,{name:$scope.search});//筛选
            if(arr.length!=0){
                $scope.currentIndex=arr.length-1;
                $scope.current=arr[ $scope.currentIndex];
            }
        })

        /*id自增*/
        function maxid(arr){//求最大id
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
        /*获取下标*/
        var a=0;
        function getIndex(arr,id){
            for(let i=0;i<arr.length;i++){
                if(id==arr[i].id){
                     a=i;
                }
            }
            return a;
        }

    }])


