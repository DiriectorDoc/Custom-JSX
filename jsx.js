"use strict";
globalThis.jsx = function(str){
	const elem = document.createElement("template"), indexes = [];
	if (Array.isArray(str)) {
		str = str[0];
		for (let i = 1; i < arguments.length; i++) {
			str += arguments[i] instanceof Node ? (indexes.push(i), `<br jsx-replace-index="${i}">`) : arguments[i];
			str += arguments[0][i]
		}
		elem.innerHTML = str;
		for (let i of indexes) {
			const br = elem.content.querySelector(`br[jsx-replace-index="${i}"]`), parent = br.parentNode;
			parent.insertBefore(arguments[i], br)
			parent.removeChild(br)
		}
	}
	else {
		elem.innerHTML = str
	}
	return elem.content.childNodes.length == 1 ? elem.content.firstChild : elem.content
}