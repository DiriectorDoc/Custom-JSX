"use strict";
globalThis.jsx = function(str){
	if(Array.isArray(str)){
		str = str[0];
		for(let i = 1; i < arguments.length; i++){
			str += arguments[i] instanceof Element ? arguments[i].outerHTML : arguments[i];
			str += arguments[0][i];
		}
	}
	let div = document.createElement("div");
	div.innerHTML = str;
	return div.children[0]
}