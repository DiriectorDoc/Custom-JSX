"use strict";
globalThis.jsx = function(str){
	let elem = document.createElement("div");
	if(Array.isArray(str)){
		str = str[0];
		for(let i = 1; i < arguments.length; i++){
			str += arguments[i] instanceof Element ? `<br jsx-replace-index="${i}">` : arguments[i];
			str += arguments[0][i];
		}
		elem.innerHTML = str;
		for(let i = 1; i < arguments.length; i++){
			if(arguments[i] instanceof Element){
				let parent = elem.querySelector(`br[jsx-replace-index="${i}"]`).parentElement,
					content = parent.innerHTML.split(`<br jsx-replace-index="${i}">`).map(e => {
						let tpl = document.createElement("template");
						tpl.innerHTML = e;
						return tpl.content
					});
				parent.innerHTML = "";
				parent.append(content[0], arguments[i], content[1])
			}
		}
	} else {
		elem.innerHTML = str;
	}
	return elem.children[0];
}