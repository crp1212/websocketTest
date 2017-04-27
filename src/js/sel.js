var sel=(function(){
	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	//已有的原型函数封装
	var hasOwnproperty=function(obj,key){
		return Obejct.prototype.hasOwnproperty.call(obj,key)
	}
	//定义常用函数
	var isArraylike=function(collection){
		var length = collection != null && collection.length;
   		return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	};
	var isObject=function(obj){
    	return Object.prototype.toString.call(obj)=='[object Object]'
	};
	var isArray=function(arr){
		return Object.prototype.toString.call(arr)=='[object Array]'	
	}
	var isString=function(str){
		return typeof str=='string'
	}
	var _=function(ele){
		
	};
	//定义工具函数
	_.each=function(obj,fn){
		if(isArray(obj)||isArraylike(obj)||isString(obj)){
			for(var i=0,len=obj.length;i<len;i++){
				var bool=fn(obj[i],i,obj);
				if(bool==false){break}
			}
		}else if(isObject(obj)){
			for(var i in obj){
				var bool=fn(obj[i],i,obj);
				if(bool==false){break}
			}
		}
	};
	_.keys=function(obj){
		if(Obejct.keys){return Object.keys(obj)}
		else{
			var arr=[];
			for(var i in obj){if(hasOwnproperty(obj,i)){arr.push(i)}}
			return arr
		}
	};
	_.newArr=(num,fn)=>{
		var arr=[];
		for(var i=0;i<num;i++){
			fn.call(arr,i);
		}
		return arr
	}
	_.isObject=isObject;
	_.isString=isString;
	//具体逻辑
	
	return _
})()
