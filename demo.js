function elementClicked(element){
	alert("You clicked "+element.name+".\n"+JSON.stringify(element)+"\n\nThe function elementClicked(element) determines what will happen after clicking an element.")
}
function getElementDemo(){
	var value=document.getElementById("getElement").value
	if(value!=""){
		alert(JSON.stringify(getElement(value)))
		if(document.getElementsByClassName("periodic-table").length>0){
			window.location.hash="#"+getElement(value).name
			document.getElementById(getElement(value).name).style.color="red"
			setTimeout(function(){
				document.getElementById(getElement(value).name).style.color=""
			},1000)
		}
	}
}
function getCompoundDemo(){
	var value=document.getElementById("getCompound").value
	if(value!=""){
		alert(JSON.stringify(getCompound(value)))
	}
}
document.getElementById("getElement").onclick=document.getElementById("getCompound").onclick=function(){
	this.value=""
}
document.getElementById("getElement").onkeydown=function(e){
	if(e.keyCode==13){
		getElementDemo()
	}
}
document.getElementById("getCompound").onkeydown=function(e){
	if(e.keyCode==13){
		getCompoundDemo()
	}
}
