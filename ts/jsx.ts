export default function jsx(str: string | TemplateStringsArray): DocumentFragment {
	let elem = document.createElement("template");
	if(Array.isArray(str)){
		elem.append(arguments[0][0])
		for(let i = 1; i < arguments.length; i++){
			elem.append(arguments[i] instanceof Node ? arguments[i] : `${arguments[i]}`)
			elem.append(arguments[0][i])
		}
	} else {
		elem.innerHTML = str as string;
	}
	return elem.content;
}