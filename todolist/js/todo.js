/**
 * Created by lenovo on 2017/7/4.
 */
    var data=[
        {
            id:1,
            title:"列表1",
            color:'#6DD63A',
            todo:[{
                t:'上午9点开会',done:true
            },{
                t:'中午12点开会',done:false
            },{
                t:'下午2点讲课',done:false
            }]
        },
        {
            id:2,
            title:"列表2",
            color:'#FF2D6B',
            todo:[{
                t:'上午9点检查作业',done:true
            },{
                t:'中午10点讲课',done:false
            },{
                t:'下午2点演讲',done:false
            }]
        }
    ];
    angular.module("todoapp",[])
        .controller("todo",["$scope",function($scope){
            $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
            $scope.data=data;
            $scope.add=function(){
                var obj={};
                obj.id=maxid();
                var i=$scope.data[$scope.data.length-1].id+1;
                obj.title="新建列表"+i;
                obj.todo=[];
                $scope.data.push(obj);
                $scope.data[index].title=obj.title;
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
                            tempid=$scope.data[i].id;
                        }
                    }
                    id=tempid+1;
                }
                return id;
            }
            $scope.select=function(i){
                $scope.index=i;
            }
        }])
