"use strict";
globalThis.jsx = (() => {

	const searchVoid = /^<(?<tag>area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)\s*(?<attributes>(\s+([a-z][a-z0-9\-]*)(\s*=\s*"([^"]*)")?)*)\s*\/?>$/i,
		searchHTML = /^<(?<tag>[a-z][a-z0-9\-]*)\s*(?<attributes>(\s+([a-z][a-z0-9\-]*)(\s*=\s*"([^"]*)")?)*)\s*>(?<content>.*)<\/\1(\s.*)?>$/i,
		splitAttribute = /([a-z][a-z0-9\-]*)(\s*=\s*"[^"]*")?/i,
		equalsQuotes = /\s*=\s*"([^"]*)".*/;

	return function(str){
		if(Array.isArray(str)){
			str = str[0];
			for(let i = 1; i < arguments.length; i++){
				str += arguments[i] instanceof Element ? arguments[i].outerHTML : arguments[i];
				str += arguments[0][i];
			}
		}
		let foundElement = searchVoid.exec(str.trim()) || searchHTML.exec(str);
		if(foundElement?.groups){
			let elem = document.createElement(foundElement.groups.tag);
			if(foundElement.groups.content){
				elem.innerHTML = foundElement.groups.content;
			}
			if(foundElement.groups.attributes){
				let arr = foundElement.groups.attributes.split(splitAttribute).filter(e => e === undefined || e.trim());
				for(let i = 0; i < arr.length; i += 2){
					elem.setAttribute(arr[i], arr[i+1]?.replace(equalsQuotes, "$1") || "")
				}
			}
			return elem
		}
	}
})()
