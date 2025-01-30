

document.getElementById("showmodal").addEventListener("click", function(){
    document.getElementById("mymodal").style.display = "block"
    document.getElementById("close").style.display = "block"
    document.getElementById("showmodal").style.display = "none"
})

document.getElementById("close").addEventListener("click", function(){
    document.getElementById("mymodal").style.display = "none"
    document.getElementById("close").style.display = "none"
    document.getElementById("showmodal").style.display = "block"
})