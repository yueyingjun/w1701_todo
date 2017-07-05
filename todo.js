 var app = angular.module("todo", []);
    app.controller("ctrl", ["$scope","$filter", function (s,f) {
        s.data = localStorage.message ? JSON.parse(localStorage.message) : [];
        s.num=0;
        s.addList = function () {
            s.searchFlag=true;
            s.flag=true;
            var obj = {};
            obj.id = maxid(s.data);
            obj.name = "新建列表"+obj.id;
            obj.son = [];
            s.data.push(obj);
            s.arr=s.data[s.data.length-1];
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

        //设置一个数组，用来循环第二视图
        s.arr=s.data[s.data.length-1];
        function getIndex(arr,id) {
            for(var i=0;i<arr.length;i++){
                if (arr[i].id==id){
                    s.index=i;
                    return i;
                }
            }
        }
        //获取焦点是将数值赋值到视图中
        s.focus=function (id) {
            s.flag=true;
            s.searchFlag=true;
            s.currentIndex=getIndex(s.data,id);
            s.arr=s.data[s.currentIndex];
        };
        //表单值改变时出
        s.change = function () {
            s.title=s.arr.name;
            save();
        };
        //直接修改原始数据所有都会变化
        //删除当前数据
        s.del = function (id) {
            var index=getIndex(s.data,id);
            s.data.splice(index,1);
            if (index==s.data.length){
                s.arr=s.data[index-1];
            }else {
                s.arr=s.data[index];
            }
            save();
            //或者循环判断跟数据;
        };

        //添加子项
        s.addCon=function () {
            var obj={};
            obj.result=false;
            obj.id=maxid(s.arr.son);
            obj.con="新建事项"+obj.id;
            s.arr.son.push(obj);
            save();
        };
        s.sonChange=function () {
            save();
        };
        //创建完成列表
        s.arrDone=localStorage.done ? JSON.parse(localStorage.done) : [];
        s.flag=true;
        s.down=function (sid) {
            var obj={};
            var index=getIndex(s.arr.son,sid);
            if(s.arr.son[index].result){
                //如果为真，将其删除
                s.arr.son[index].result=false;
            }else {
                s.arr.son[index].result=true;
                obj.name=s.arr.name;
                obj.dcon=s.arr.son[index];
                obj.id=maxid(s.arrDone);
                s.arr.son.splice(index,1);
                s.arrDone.push(obj);
            }
            localStorage.setItem("done", JSON.stringify(s.arrDone));
            save();
        };
        //删除待办事项
        s.conDel=function (id) {
            var index=getIndex(s.arr.son,id);
            s.arr.son.splice(index,1);
            save();
        };
        //获得完成页面
        s.done=function () {
            s.flag=false;
        };

        //变回到待办事项
        s.changeDone=function (id) {
            var index=getIndex(s.arrDone,id);
            var obj=s.arrDone[index];
            for(var i=0;i<s.data.length;i++){
                if (s.data[i].name==obj.name){
                    obj.dcon.id=maxid(s.data[i].son);
                    obj.dcon.result=false;
                    s.data[i].son.push(obj.dcon);
                }
            }
            s.arrDone.splice(index,1);
            localStorage.setItem("done", JSON.stringify(s.arrDone));
            save();
        };
        //删除完成列表内容
        s.doneDel=function (id) {
            var index=getIndex(s.arrDone,id);
            s.arrDone.splice(index,1);
            localStorage.setItem("done", JSON.stringify(s.arrDone));
        };
        //搜索//待完善
        s.searchFlag=true;
        // s.searchArray=[];
        // s.search=function (val) {
        //     s.searchFlag=false;
        //     var array=[];
        //     for(var i=0;i<s.data.length;i++){
        //         for(var j=0;j<s.data[i].son.length;j++){
        //             s.data[i].son[j].id=maxid(array);
        //             array.push(s.data[i].son[j]);
        //         }
        //     }
        //     array=f("filter")(array,val);
        //     for(var j=0;j<array.length;j++){
        //         if (!array[i]){
        //
        //         }else if (array[i]!=[]){
        //             var id=(function(){return maxid(s.searchArray)})();
        //             array[i].id=id;
        //             console.log(i)
        //             s.searchArray.push(array[i]);
        //         }
        //     }
        //     console.log(s.searchArray);
        // }

        //列表搜索
        s.$watch('search',function () {
            //arr是已经筛选出来的
            var arr=f("filter")(s.data,{name:s.search});
            if(arr.length!=0){
            var index=getIndex(s.data,arr[0].id);
                s.arr=s.data[index];    
            }
            
          })


    }]);