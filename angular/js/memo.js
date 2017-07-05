'use strict';
var $i=1;
var $j=1;
angular.module('myapp',[])
	.controller('md',function($scope){
		$scope.data=localStorage.message?JSON.parse(localStorage.message):[];   //将临时文本保存在本地
		$scope.current=$scope.data[$scope.data.length-1];		//默认显示
		if($scope.data!=''){
			if($scope.current){
				if(!angular.equals({},$scope.current.con)){
					$scope.curconlists=angular.fromJson($scope.current.con);
				}else{
					$scope.curconlists=[];
				}
			}else{
				$scope.curconlists=[];
			}
		}else{
			$scope.curconlists=[];
		}
		console.log($scope.curconlists);
		//添加新事件
		$scope.add=function(){
			if($i==1){
				if($scope.data.length>0){
					$i=JSON.parse(localStorage.message)[JSON.parse(localStorage.message).length-1].id+1;
				}
			}else{
				$i++;
			}
			var newnote={};
			newnote.id=$i;
			newnote.name="新笔记"+newnote.id;
			newnote.con={};
			$scope.data.push(newnote);
			localStorage.message=angular.toJson($scope.data);   //将临时文本保存在本地
			$scope.current=$scope.data[$scope.data.length-1];		//默认显示
			$scope.curconlists=angular.equals({},$scope.current.con)?[]:angular.fromJson($scope.current.con);
		}
		//删除
		$scope.del=function($index){
			for(var $i=0;$i<$scope.data.length;$i++){
				if($index==$i){
					$scope.data.splice($i,1);
					localStorage.message=angular.toJson($scope.data);   //将临时文本保存在本地
					$scope.current=$scope.data[$scope.data.length-1];		//默认显示
					$scope.curconlists=angular.equals({},$scope.current.con)?[]:angular.fromJson($scope.current.con);
				}
			}
		}
		//修改列表文件名
		$scope.focus=function(id){
			for(let $i=0;$i<$scope.data.length;$i++){
				if(id==$scope.data[$i].id){
					$scope.current=$scope.data[$i];
					$scope.curconlists=angular.equals({},$scope.current.con)?[]:angular.fromJson($scope.current.con);
				}
			}
		}
		$scope.blur=function(){
			localStorage.message=angular.toJson($scope.data);   //将临时文本保存在本地
		}
		
		//内容添加
		$scope.addcon=function(){
			if($j==1){
				if($scope.curconlists.length>0){
					$j=$scope.curconlists[$scope.curconlists.length-1].id+1;
				}
			}else{
				$j++;
			}
			var con={};
			con.id=$j;
			con.lists='新建列表'+$j;
			$scope.curconlists.push(con);
			$scope.current.con=$scope.curconlists;
			localStorage.message=angular.toJson($scope.data);   //将临时文本保存在本地
		}
		//内容删除
		$scope.condel=function($index){
			for(var $i=0;$i<$scope.curconlists.length;$i++){
				if($index==$i){
					$scope.curconlists.splice($i,1);
					localStorage.message=angular.toJson($scope.data);
				}
			}
		}
		//改变事件状态
		$scope.changestate=function($index){
			$scope.state=[];
			$scope.state[$index]='glyphicon glyphicon-ok';
			
		}
		//
		}
	})