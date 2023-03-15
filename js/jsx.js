"use strict";
globalThis.jsx = function(str){
	var elem = document.createElement("template");
	if (Array.isArray(str)) {
		elem.append(arguments[0][0]);
		for (var i = 1; i < arguments.length; i++) {
			elem.append(arguments[i] instanceof Node ? arguments[i] : "".concat(arguments[i]));
			elem.append(arguments[0][i]);
		}
	}
	else {
		elem.innerHTML = str;
	}
	return elem.content;
}