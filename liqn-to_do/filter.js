 var app = angular.module('myapp', []);
app.filter("statusFilter",function(){
        return function(data,uppercase){
            var out = [];
            for(var i=0 ; i<$scope.data.length; i++){
                if(data[i].status=='issued'||data[i].status=='masked'){
                    out.push(data[i]);
                }
            } 
            return out;
        }
    });