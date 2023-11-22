export default function jsx(str: string | TemplateStringsArray, ...values: any[]): Node;
export default function jsx(str: string | TemplateStringsArray): Node {
	const elem = document.createElement("template"),
		indexes: number[] = [];
	if(Array.isArray(str)){
		str = str[0] as string;
		for(let i = 1; i < arguments.length; i++){
			str += arguments[i] instanceof Node ? (indexes.push(i), `<br jsx-replace-index="${i}">`) : arguments[i];
			str += arguments[0][i];
		}
		elem.innerHTML = str;
		for(let i of indexes){
			const br = elem.content.querySelector(`br[jsx-replace-index="${i}"]`)!,
				parent = br.parentNode!;
			parent.insertBefore(arguments[i], br);
			parent.removeChild(br)
		}
	} else {
		elem.innerHTML = str as string;
	}
	return elem.content.childNodes.length == 1 ? elem.content.firstChild! : elem.content
}