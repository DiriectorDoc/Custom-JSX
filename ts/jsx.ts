export default function jsx(str: string | TemplateStringsArray): Node {
	const elem = document.createElement("div"),
		indexes: number[] = [];
	if(Array.isArray(str)){
		str = str[0] as string;
		for(let i = 1; i < arguments.length; i++){
			str += arguments[i] instanceof Node ? (indexes.push(i), `<br jsx-replace-index="${i}">`) : arguments[i];
			str += arguments[0][i];
		}
		elem.innerHTML = str;
		for(let i of indexes){
			let br = elem.querySelector(`br[jsx-replace-index="${i}"]`)!,
				parent = br.parentElement!;
			parent.insertBefore(arguments[i], br);
			parent.removeChild(br)
		}
	} else {
		elem.innerHTML = str as string;
	}
	if(elem.childNodes.length == 1 && elem.firstChild instanceof HTMLElement)
		return elem.firstChild;
	const template = document.createElement("template");
	template.content.append(...elem.childNodes)
	return template.content
}