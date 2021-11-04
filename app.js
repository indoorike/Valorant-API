let agentNames = document.querySelector("main").querySelectorAll("li")
let agentList = document.querySelectorAll(".agent-list")
let agentInfo = document.querySelector(".agent-info")
let url = "https://valorant-api.com/v1/agents"

let nameBox = document.querySelector(".agent-name")

let start = 0
let mousedown = false
nameBox.addEventListener("mousedown", (event) => {
    mousedown = true
    start = event.clientY - nameBox.offsetTop
})

nameBox.addEventListener("mousemove" , (event) => {
    if (mousedown) {
        event.preventDefault()
        nameBox.style.top = `${event.clientY - start}px`
        if (parseInt(nameBox.style.top) > 0) {
            nameBox.style.top = '0px'
            
        } else if (parseInt(nameBox.style.top) < -850) {
            nameBox.style.top = '-850px'
        }
    }
})
document.addEventListener("mouseup", () => {
    mousedown = false
})


agentNames.forEach(item => {
    item.addEventListener('click', () => {
        updateAgent(item.getAttribute("class"))
        updateAbilities(item.getAttribute("class"))
        for(names of agentNames) { names.classList.remove("red-text")}
        item.classList.add("red-text")
        abilityTriggers[0].click()
    })
})

let currentAgent = {}
let agentPicture = document.querySelector("#picture")
let agentRole = document.querySelector("#role-name")
let roleImage = document.querySelector("#role-img")
let agentDescription = document.querySelector("#description")

async function updateAgent(name){
    let response = await fetch(url)
    let data = await response.json()

    console.log(data.data)
    await data.data.forEach(item => {
        if (item.displayName === name) {
            currentAgent = item
            console.log(currentAgent)
            agentPicture.src = item.fullPortrait
            agentRole.innerText = item.role.displayName.toUpperCase()
            roleImage.src = item.role.displayIcon
            agentDescription.innerText = item.description    
        }      
    })
}

let abilityButtons = document.querySelectorAll(".ability-button")
async function updateAbilities(name) {
    let response = await fetch(url)
    let data = await response.json()        
    data.data.forEach(item => {
        if (item.displayName === name) {
            for (let i = 0; i < abilityButtons.length; i++) {
                abilityButtons[i].src = item.abilities[i].displayIcon
            }
            abilityButtons[0].click()
        }
    })
}

let abilityTriggers = document.querySelector(".button-container").querySelectorAll("button")
let abilityTitle = document.querySelector(".ability-title")
let abilityDescription = document.querySelector(".ability-bio")
abilityButtons.forEach(item => {
    item.addEventListener("click", (event) => {
        abilityTitle.innerText = currentAgent.abilities[event.target.getAttribute("id")].displayName
        abilityDescription.innerText = currentAgent.abilities[event.target.getAttribute("id")].description
        abilityButtons.forEach(item => item.style.backgroundColor = "black")
        event.target.style.backgroundColor = "rgb(255, 86, 86)"
    })
})
