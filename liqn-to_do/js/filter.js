angular.module("filters",[])
    .filter('maxOrmin',function(arr,type){
        return function(arr){
            if (angular.isArray(arr)) {
                var type=type;
                if (type==1) {
                    var temp=arr[0];
                    for (var i = 0; i < arr.length; i++) {
                        if (temp<arr[i]) {
                            temp=arr[i];
                        }
                    }
                }else{
                    for (var i = 0; i < arr.length; i++) {
                        if (temp>arr[i]) {
                            temp=arr[i];
                        }
                    }
                    return temp;
                }
            }else{
                console.error("请输入数组");
            }
        }
        
        
    })