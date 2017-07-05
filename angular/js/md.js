'use strict';
var $i=1;
angular.module('myapp',[])
	.controller('md',function($scope){
		$scope.data=localStorage.message?JSON.parse(localStorage.message):[];   //将临时文本保存在本地
		$scope.current=$scope.data[$scope.data.length-1];		//默认显示
		//添加新笔记
		$scope.add=function(){
			if($i==1){
				if($scope.data.length>0){
					$i=JSON.parse(localStorage.message)[JSON.parse(localStorage.message).length-1].id;
					$i++;
				}else{
					$i==1;
				}
			}else{
				$i++;
			}
			var newnote={};
			newnote.id=$i;
			newnote.name="新笔记"+newnote.id;
			newnote.con="在此输入内容...";
			$scope.data.push(newnote);
			localStorage.message=angular.toJson($scope.data);   //将临时文本保存在本地
			$scope.current=$scope.data[$scope.data.length-1];		//默认显示
		}
		//删除
		$scope.del=function($index){
			for(var $i=0;$i<$scope.data.length;$i++){
				if($index==$i){
					$scope.data.splice($i,1);
					localStorage.message=angular.toJson($scope.data);   //将临时文本保存在本地
					$scope.current=$scope.data[$scope.data.length-1];		//默认显示
				}
			}
		}
		//修改列表文件名
		$scope.focus=function(id){
			for(let $i=0;$i<$scope.data.length;$i++){
				if(id==$scope.data[$i].id){
					$scope.current=$scope.data[$i];
				}
			}
		}
		$scope.blur=function(){
			localStorage.message=angular.toJson($scope.data);   //将临时文本保存在本地
		}
	})