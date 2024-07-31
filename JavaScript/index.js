
let count = 0
let countEl = document.getElementById("count-el")
let saveEl = document.getElementById("save-el")



function increment(){
    count = count +1
    countEl.innerText = count
    
}
function save(){
    let countStr = count + " - "
    saveEl.textContenttStr
    countEl.textContent = 0
    count = 0
}

