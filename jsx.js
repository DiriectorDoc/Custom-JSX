"use strict";
globalThis.jsx = (() => {

	const searchHTML = /^<(?<tag>[a-z][a-z0-9\-]*)\s*(?<attributes>(\s+([a-z][a-z0-9\-]*)(\s*=\s*"([^"]*)")?)*)\s*>(?<content>.*)<\/\1(\s.*)?>$/i,
		splitAttribute = /([a-z][a-z0-9\-]*)(\s*=\s*"[^"]*")?/i,
		equalsQuotes = /\s*=\s*"([^"]*)".*/;

	return (str) => {
		if(Array.isArray(str)){
			str = str[0]
		}
		let foundElement = searchHTML.exec(str.trim());
		if(foundElement?.groups){
			let elem = document.createElement(foundElement.groups.tag);
			elem.innerHTML = foundElement.groups.content;
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
