let listCreated = false
function elementClicked(element) {
	alert("You clicked " + element.name + ".\n" + JSON.stringify(element)
		+ "\n\nThe function elementClicked(element) determines what will "
		+ "happen after clicking an element.")
}
function getElementDemo() {
	const value = document.getElementById("element-input").value
	if (value) {
		const result = getElement(value)
		alert(JSON.stringify(result))
		if (listCreated) {
			const id = result.name
			window.location.hash = "#" + id
			document.getElementById(id).classList.add("highlight")
			setTimeout(() => {
				document.getElementById(id).classList.remove("highlight")
			}, 1000)
		}
	}
}
function getCompoundDemo() {
	const value = document.getElementById("compound-input").value
	if (value) {
		alert(JSON.stringify(getCompound(value)))
	}
}
document.getElementById("createlist-demo").onclick = () => {
	listCreated = true
	createList(document.getElementById("element-list"))
}
document.getElementById("getelement-demo").onclick = getElementDemo
document.getElementById("getcompound-demo").onclick = getCompoundDemo
document.getElementById("element-input").onclick
	= document.getElementById("compound-input").onclick
	= function () {
		this.value = ""
	}
document.getElementById("element-input").onkeydown = evt => {
	if (evt.code && evt.code.endsWith("Enter")) {
		getElementDemo()
	}
}
document.getElementById("compound-input").onkeydown = evt => {
	if (evt.code && evt.code.endsWith("Enter")) {
		getCompoundDemo()
	}
}
