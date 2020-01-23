function getElementPath( element ){
	if( element.id != undefined && element.id != "" ){
		return "#"+element.id;
	}
	if( element.className != undefined && element.className != "" && document.querySelectorAll( element.tagName + "." + element.className ).length == 1 ){
		return element.tagName + "." + element.className;
	}
	if( document.querySelectorAll( element.tagName ).length == 1 ){
		return element.tagName;
	}
	
	var max_iter = document.querySelectorAll( element.tagName ).length;
	for (let i = 1; i <= max_iter; i++) {
		//console.log(element.tagName + ":nth-child(" + i + ")");
		if( element === document.querySelector( element.tagName + ":nth-child(" + i + ")" ) ){
			return element.tagName + ":nth-child(" + i + ")";
		}
	}
	return element.tagName;
}
function getPath( element ){
	var ln = element;
	var q = getElementPath(ln);
	if( document.querySelectorAll(q).length == 1 ){
		return q;
	}
	
	while(true){
		if( document.querySelectorAll(q).length == 1 || ln.tagName == "HTML" ){
			break;
		}
		ln = ln.parentNode;
		q = getElementPath(ln) + " " + q;
	}
	return q;
}
console.log(getPath($0));