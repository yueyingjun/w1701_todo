angular.module("myapp", [])
    .controller("todo", ["$scope", function ($scope) {//在压缩的时候，依赖就不会危险了
        $scope.data = localStorage.message ? JSON.parse(localStorage.message) : [];//记录所有的数据
        // console.log($scope.data)
        $scope.currentIndex = 0;// $currentIndex:当前的id
        $scope.current = $scope.data[$scope.currentIndex];// $current:当前的内容
        /*添加列表*/
        $scope.add = function () {
            var obj = {};
            obj.id = maxid();
            obj.name = "新建列表" + obj.id;
            obj.son = [];//子信息
            $scope.data.push(obj);//把所有获得的信息放入obj对象中  push:像数组的末尾添加多个元素
            $scope.currentIndex = getIndex($scope.data, obj.id);
            $scope.current = $scope.data[$scope.currentIndex];//
            localStorage.message = JSON.stringify($scope.data);//存到本地存储中
        }


        /*单击“添加计划”获得焦点*/
        $scope.focus = function (id) {
            $scope.currentIndex = getIndex($scope.current.id);
            $scope.current = $scope.data[$scope.currentIndex];
        }


        /*单击“添加计划”失去焦点*/
        $scope.blur = function () {
            localStorage.message = JSON.stringify($scope.data);//重新存到本地存储中
        }


        /*删除计划*/
        $scope.del = function (id) {
            var ind = getIndex($scope.data.id);
            angular.forEach($scope.data, function (obj, index) {
                if (id == obj.id) {////删除当前的ID
                    if (ind == $scope.data.length - 1) {//如果删除最后一个，右边的当前的ID是下一个,内容也是当前最后一个
                        //删除当前的ID
                        console.log(ind);
                        $scope.currentIndex = ind - 1;
                        $scope.current = $scope.data[$scope.currentIndex];
                        $scope.data.splice(ind, 1);
                        localStorage.message = JSON.stringify($scope.data);
                    } else { //否则，就是删除的前面的，还是显示的最后一个
                        $scope.currentIndex = $scope.daa.length - 1;
                        $scope.current = $scope.data[$scope.currentIndex];
                        $scope.data.splice(ind, 1);
                        localStorage.message = JSON.stringify($scope.data);
                    }
                }
            })
        }


        /*添加子内容*/
        $scope.addOpt = function () {
            var obj = {};
            obj.id = maxid($scope.current.son);
            obj.name = "新建条目" + obj.id;
            $scope.current.son.push = (obj);//Push   把obj放入son中
            localStorage.message = JSON.stringify($scope.data);
        }


        /*删除子内容*/
        $scope.delCon = function (id) {
            var index = getIndex($scope.current.son, id);//获得下标：数组、下标
            localStorage.message = JSON.stringify($scope.data);
        }


        /*自己创建的标识识别*/
        function maxid(arr) {
            var arr = arr || $scope.data;
            var id = 0;//
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

        //获得索引
        function getIndex(arr, id) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    return i;
                }
            }
        }


    }])
