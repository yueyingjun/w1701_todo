/**
 * Created by chen on 2017/7/5.
 */
angular.module("myapp",[])
    .controller("ctrl",["$scope","$filter",function($scope,$filter) {
        $scope.data = localStorage.message ? JSON.parse(localStorage.message) : [];
        $scope.completeArr = localStorage.done ? JSON.parse(localStorage.done) : [];
        $scope.flag = true;
        $scope.currentObj=$scope.data[0];
        $scope.add = function () {
            var obj = {};
            obj.id = maxid($scope.data);
            obj.name = "未标签";
            obj.son = [];
            $scope.data.push(obj);
            localStorage.message = JSON.stringify($scope.data);
            $scope.currentIndex = getIndex($scope.data, obj.id);
            $scope.currentObj = $scope.data[$scope.currentIndex];
        }
        //删除 列表
        $scope.del = function () {
            var currentIndex = getIndex($scope.data, this.item.id);

            if( currentIndex +1<$scope.data.length){
                // $scope.currentIndex = getIndex($scope.data, $scope.data.length+1);
                $scope.currentObj = $scope.data[ currentIndex +1];
            }else {
                $scope.currentObj = $scope.data[$scope.data.length-2];
            }
            $scope.data.splice(currentIndex, 1);

            localStorage.message = JSON.stringify($scope.data);
        }

        //删除内容
        $scope.delCon=function () {
            var sonIndex=getIndex($scope.currentSon,this.item.id);
            $scope.currentSon.splice(sonIndex,1);
            localStorage.message=JSON.stringify($scope.data);
        }
        //删除已完成事项
        $scope.delComCon=function () {
            var comIndex=getIndex($scope.completeArr,this.item.id);
            console.log(comIndex);
            $scope.completeArr.splice(comIndex,1);
            localStorage.done=JSON.stringify($scope.completeArr);
        }


        //获取焦点
       $scope.focus=function () {
           $scope.currentIndex=getIndex($scope.data,this.item.id);
           $scope.currentObj=$scope.data[$scope.currentIndex];
           $scope.currentSon=$scope.currentObj.son;
           if($scope.flag==false){
               $scope.flag=true;
           }
           // console.log($scope.currentSon);
       }
       // console.log($scope.currentObj);
       //  $scope.currentSon=$scope.currentObj.son;
       //失去焦点
       $scope.blur=function () {
           localStorage.message=JSON.stringify($scope.data);
       }
       //添加内容
       $scope.addCon=function () {
           $scope.currentSon=$scope.currentObj.son;
            $scope.sonObj={
                    id:maxid($scope.currentSon),
                    name:"新建内容",
                };
           $scope.currentSon.push($scope.sonObj);
           localStorage.message=JSON.stringify($scope.data);
       }
       //完成内容
       //  $scope.completeArr=[];
        $scope.completeCon=function () {
            $scope.arrIndex=getIndex($scope.currentSon,this.item.id);
            $scope.arrSplice=$scope.currentSon.splice($scope.arrIndex,1);
            $scope.comObj={
                id:maxid($scope.completeArr),
                name:$scope.arrSplice[0].name,
            }
            $scope.completeArr.push($scope.comObj);
            localStorage.message=JSON.stringify($scope.data);
            localStorage.done=JSON.stringify($scope.completeArr);
            console.log($scope.completeArr);
            $scope.comArrlen=$scope.completeArr.length;
        }
        $scope.comArrlen=$scope.completeArr.length;
        $scope.date = $filter('date')(new Date());
        // 搜索
        $scope.search="";
        $scope.$watch("search",function () {
            $scope.searchArr=$filter("filter")($scope.data,{name:$scope.search});
            $scope.searchlen=$scope.searchArr.length;
            $scope.currentObj=$scope.searchArr[0];
        });
        $scope.showcom=function () {
           if($scope.flag==true){
               $scope.flag=false;
           }else{
               $scope.flag=true;
           }
        }
        function maxid(arr){
            var id=0;
            var tempid=0;
            if(arr.length==0){
                id=1;
            }else{
                for(var i=0;i<arr.length;i++){
                    if(arr[i].id > tempid){
                        tempid=arr[i].id
                    }
                }
                id=tempid+1;
            }
            return id;
        }
        //得到当前的id
        function getIndex(arr,id){
            for(var i=0;i<arr.length;i++){
                if(id==arr[i].id){
                   return i;
                }
            }
        }
    }])

