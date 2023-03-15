"use strict";
globalThis.jsx = function(str){
	let elem = document.createElement("template"), indexes = [];
	if (Array.isArray(str)) {
		str = str[0];
		for (let i = 1; i < arguments.length; i++) {
			str += arguments[i] instanceof Node ? (indexes.push(i), `<br jsx-replace-index="${i}">`) : arguments[i];
			str += arguments[0][i];
		}
		elem.innerHTML = str;
		for (let i of indexes) {
			let parent = elem.querySelector(`br[jsx-replace-index="${i}"]`).parentElement, children = [...parent.childNodes];
			children[children.findIndex(e => e.matches(`br[jsx-replace-index="${i}"]`))] = arguments[i];
			parent.innerHTML = "";
			parent.append(...children);
		}
	}
	else {
		elem.innerHTML = str;
	}
	return elem.content;
}