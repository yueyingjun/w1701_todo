/**
 * Created by Administrator on 2017/7/4.
 */
angular.module('note',[])
    .controller('ctrl',['$scope','$filter',function ($scope,$filter) {
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];
        $scope.down=localStorage.down?JSON.parse(localStorage.down):[];
        $scope.currentIndex=0;
        $scope.currentData=$scope.data[$scope.currentIndex];
        $scope.flag=true;
        $scope.sou='';

        // 搜索
        $scope.$watch("sou",function (news) {
            let arr=$filter('filter')($scope.data,{name:news})
            $scope.currentData=arr[arr.length-1];
        })

        // 添加事项
        $scope.add=function () {
            $scope.flag=true;
            var obj={};
            obj.id=maxId($scope.data);
            obj.name='新建备忘录'+obj.id;
            obj.time=new Date();
            obj.son=[];
            $scope.data.push(obj);
            localStorage.message=JSON.stringify($scope.data);
            $scope.currentIndex=$scope.data.length-1;
            $scope.currentData=$scope.data[$scope.currentIndex];
        }

        // 改变事项名称
        $scope.change=function () {
            $scope.flag=true;
            localStorage.message=JSON.stringify($scope.data);
        }

        // 删除事项
        $scope.del=function (id) {
            var index=geti($scope.data,id);
            $scope.data.splice(index,1);
            localStorage.message=JSON.stringify($scope.data);
        }

        // 点击事项
        $scope.fn=function (id) {
            $scope.flag=true;
            var index=geti($scope.data,id);
            $scope.currentIndex=index;
            $scope.currentData=$scope.data[$scope.currentIndex];
        }

        // 添加备忘事件
        $scope.addson=function () {
            var obj={};
            obj.id=maxId($scope.currentData.son);
            obj.con='新建备忘事件'+obj.id;
            obj.ok=0;
            $scope.currentData.son.push(obj);
            localStorage.message=JSON.stringify($scope.data);
        }

        // 删除备忘事件
        $scope.delson=function (id) {
            var index=geti($scope.currentData.son,id);
            $scope.currentData.son.splice(index,1);
            localStorage.message=JSON.stringify($scope.data);
            var index2=geti($scope.down,id);
            $scope.down.splice(index2,1);
            localStorage.down=JSON.stringify($scope.down);
        }

        // 完成备忘事件
        $scope.over=function (id) {
            var index=geti($scope.currentData.son,id);
            $scope.currentData.son[index].ok=1;
            localStorage.message=JSON.stringify($scope.data);
            var obj={};
            obj.id=$scope.currentData.id+"-"+$scope.currentData.son[index].id;
            obj.par=$scope.currentData.name;
            obj.con=$scope.currentData.son[index].con;
            $scope.down.push(obj);
            localStorage.down=JSON.stringify($scope.down);
        }

        // 显示完成的备忘事件
        $scope.ok=function () {
            $scope.flag=false;
        }
        // 获取当前数组中的最大id
        function maxId(arr) {
            var id=0;
            if(arr.length==0){
                id=1;
            }else{
                for(var i=0;i<arr.length;i++){
                    if(arr[i].id>=id){
                        id=arr[i].id+1;
                    }
                }
            }
            return id;
        }

        // 判断当前id在数组中是第几个
        function geti(arr, pid) {
            var key;
            angular.forEach(arr,function (obj, i) {
                if (obj.id==pid){
                    key=i;
                }
            })
            return key;
        }
    }])