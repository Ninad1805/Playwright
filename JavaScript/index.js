
let count = 0
let countEl = document.getElementById("count-el")
let saveEl = document.getElementById("save-el")
let welcomeEl = document.getElementById("welcome-el")


welcomeEl.innerText ="Welcome back user!!"



function increment(){
    count += 1
    countEl.innerText = count
    
}
function save(){
    let countStr = count + " - "
    saveEl.textContent += countStr
}

