angular.module("myapp", [])
    .controller("todo", ["$scope", function ($scope) {
        $scope.data = localStorage.message ? JSON.parse(localStorage.message):[];
        $scope.currentIndex = $scope.data.length - 1;
        $scope.current = $scope.data[$scope.currentIndex];
        $scope.done = localStorage.done ? JSON.parse(localStorage.done) : [];
        $scope.show = true;
        /*添加列表*/
        $scope.add = function () {
            $scope.show = true;
            var obj = {};
            obj.id = maxid();
            obj.name = "新建列表" + obj.id;
            obj.son = [];
            $scope.data.push(obj);
            $scope.currentIndex = getIndex($scope.data, obj.id);
            $scope.current = $scope.data[$scope.currentIndex];
            localStorage.message = JSON.stringify($scope.data);

        }
        $scope.focus=function (id,up,son){
            $scope.show=true;
            $scope.currentIndex=getIndex($scope.data,id);
            $scope.current=$scope.data[$scope.currentIndex];
        }
        $scope.blur = function () {
            localStorage.message = JSON.stringify($scope.data);
        }
        //删除列表
        $scope.del = function (id) {
            var ind = getIndex($scope.data, id);
            angular.forEach($scope.data, function (obj, index) {
                if (id == obj.id) {
                    // $scope.data.splice(index, 1);
                    if (ind == $scope.data.length - 1) {
                        $scope.currentIndex = ind - 1;
                        $scope.current = $scope.data[$scope.currentIndex];
                        $scope.data.splice(ind, 1);
                        localStorage.message = JSON.stringify($scope.data);
                    } else {
                        $scope.currentIndex = $scope.data.length - 1;
                        $scope.current = $scope.data[$scope.currentIndex];
                        $scope.data.splice(ind, 1);
                        localStorage.message = JSON.stringify($scope.data);
                    }
                }
            })
        }
        //添加子内容
        $scope.addOpt = function () {
            var obj = {};
            obj.id = maxid($scope.current.son);
            obj.name = "新建条目" + obj.id;
            $scope.current.son.push(obj);
            localStorage.message = JSON.stringify($scope.current.son);
            // localStorage.done = JSON.stringify($scope.done);
        }
        //点击完成
        $scope.success = function (id) {
            var index=$scope.currentIndex;
            var obj={};
            obj.id=maxid($scope.done);
            obj.name=$scope.data[index].name;
            obj.opt=$scope.current.son[getIndex($scope.current.son,id)].name;
            $scope.done.push(obj);
            localStorage.done = JSON.stringify($scope.done);
            $scope.current.son.splice(getIndex($scope.current.son,id),1);
            localStorage.message = JSON.stringify($scope.data);
        }
        //显示已完成内容
        $scope.change = function () {
            $scope.show = false;
        }
        //删除已完成
        $scope.delDone = function (id) {
            angular.forEach($scope.done,function (obj,index) {
                if(id==obj.id){
                    $scope.done.splice(index,1);
                    localStorage.done = JSON.stringify($scope.done);
                }
            })
        }
        //删除 子内容
        $scope.delCon = function (id) {
            angular.forEach($scope.current.son,function (obj,index) {
                if(obj.id==id){
                    $scope.current.son.splice(index,1);
                    localStorage.message = JSON.stringify($scope.data);
                }
            })
        }
        function getIndex(arr, id) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    return i;
                }
            }
        }

        function maxid(arr) {
            var arr = arr || $scope.data;
            var id = 0;
            var tempid = 0;
            if (arr.length == 0) {
                id = 1;
            } else {

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id > tempid) {
                        tempid = arr[i].id

                    }
                }

                id = tempid + 1;
            }
            return id;
        }
    }])
