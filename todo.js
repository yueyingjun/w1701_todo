 var app = angular.module("todo", []);
    app.controller("ctrl", ["$scope","$filter", function (s,f) {
        s.data = localStorage.message ? JSON.parse(localStorage.message) : [];
        s.addList = function () {
            var obj = {};
            obj.id = maxid(s.data);
            obj.name = "新建列表";
            obj.son = [];
            s.data.push(obj);
            localStorage.message = JSON.stringify(s.data);
        };
        //保存到本地存储
        function save() {
            localStorage.setItem('message', JSON.stringify(s.data));
        }
        //获取id
        function maxid(arr) {
            var id = 0;
            var itemid = 0;
            if (arr.length == 0) {
                id = 1;
            } else {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id > itemid) {
                        itemid = arr[i].id;
                    }
                }
                id = itemid + 1;
            }
            return id;
        }
        //设置一个空的数组，用来循环第二视图
        s.arr=[];
        //获取焦点是将数值赋值到视图中
        s.focus=function (item) {
            s.arr=item;
            s.title=item.name;

        };
        //表单值改变时出将
        s.change = function (item) {
            var arr=item;
            s.title=item.name;
            for(var i=0;i<s.data.length;i++){
                if (s.data[i].id==arr.id){
                    if (i == 0) {
                        s.data.shift();
                        s.data.splice(i,0,arr);
                    } else if (i == s.data.length - 1) {
                        s.data.pop();
                        s.data.splice(i,0,arr);
                    } else {
                        s.data.splice(i, 1,arr);
                    }
                }
            }
            save();
        };
        //删除当前数据
        s.del = function (item) {
            for (var i = 0; i < s.data.length; i++) {
                if (s.data[i] == item) {
                    if (i == 0) {
                        s.data.shift();
                    } else if (i == s.data.length - 1) {
                        s.data.pop();
                    } else {
                        s.data.splice(i, 1);
                    }
                }
            }
            save();
        }
        //添加子项
        s.addCon=function () {
            var obj={};
            obj.con="";
            obj.result=false;
            obj.id=maxid(s.arr.son);
            // var arr=typeof s.arr.son[s.arr.son.length-1].con==undefined ?"":"1";
            // console.log(arr);
            // if(arr==""){
            //     return;
            // }
            s.arr.son.push(obj);
            for(var i=0;i<s.data.length;i++){
                if (s.data[i].id==s.arr.id){
                    if (i == 0) {
                        s.data.shift();
                        s.data.splice(i,0,s.arr);
                    } else if (i == s.data.length - 1) {
                        s.data.pop();
                        s.data.splice(i,0,s.arr);
                    } else {
                        s.data.splice(i, 1,s.arr);
                    }
                }
            }
            save();
        };
        s.sonChange=function (son) {
            for(var j=0;j<s.data.length;j++){
                if (s.data[j].id==s.arr.id){
                    if (j == 0) {
                        s.data.shift();
                        s.data.splice(j,0,s.arr);
                    } else if (j == s.data.length - 1) {
                        s.data.pop();
                        s.data.splice(j,0,s.arr);
                    } else {
                        s.data.splice(j, 1,s.arr);
                    }
                }
            }
            save();
        };
        s.down=function (sid) {
            for (var i=0;i<s.arr.son.length;i++){
                if(s.arr.son[i].id==sid){
                    if(s.arr.son[i].result) {
                        s.arr.son[i].result = false;
                        s.num-=1;
                    }else{
                        if (s.arr.son[i].con==""){
                            return;
                        }
                        s.arr.son[i].result = true;
                        s.num+=1;
                    }
                }
            }
            for(var j=0;j<s.data.length;j++){
                if (s.data[j].id==s.arr.id){
                    if (j == 0) {
                        s.data.shift();
                        s.data.splice(j,0,s.arr);
                    } else if (j == s.data.length - 1) {
                        s.data.pop();
                        s.data.splice(j,0,s.arr);
                    } else {
                        s.data.splice(j, 1,s.arr);
                    }
                }
            }
            save();
        };
        //获取完成总数量
        s.num=0;
        function downNum () {
            for (var i=0;i<s.data.length;i++){
                for(var j=0;j<s.data[i].son.length;j++){
                    if (s.data[i].son[j].result){
                        s.num+=1;
                    }
                }
            }
        }
        downNum();
        s.conDel=function (son) {
            for(var i=0;i<s.arr.son.length;i++){
                if (s.arr.son[i].id==son.id){
                    s.arr.son.splice(i,1);
                    if(son.result){
                        s.num-=1;
                    }
                }
            }
            for(var j=0;j<s.data.length;j++){
                if (s.data[j].id==s.arr.id){
                    if (j == 0) {
                        s.data.shift();
                        s.data.splice(j,0,s.arr);
                    } else if (j == s.data.length - 1) {
                        s.data.pop();
                        s.data.splice(j,0,s.arr);
                    } else {
                        s.data.splice(j, 1,s.arr);
                    }
                }
            }
            save();
        }
        //搜索
        s.search=function (val) {
            var array=[];
            for(var i=0;i<s.data.length;i++){
                for(var j=0;j<s.data[i].son.length;j++){
                    s.data[i].son[j].id=maxid(array);
                    array.push(s.data[i].son[j]);
                }
            }
            // console.log(array);
            // console.log(s.arr);
            s.arr.name="搜索结果";
            array=f("filter")(array,val);
            s.arr.son=array;
            // 搜索后删除有问题
        }


    }]);