const JSON_PATH = '../data/kData.json'
const kView = document.getElementById('k-display')
const choiceHead = document.getElementById('choice-header')
const buttonContainer = document.getElementById('buttons-home')
const lifeChoices = document.getElementById('life-choices')

let weapons_info = []
const k = new oddInteger()
kView.innerHTML = k
choiceHead.innerHTML = 'Choose Wisely'



function populate() {
    weapons_info = []
    fetch(JSON_PATH)
        .then(res => res.json())
        .then(data => {
            let mixer = Array.from({ length: data['weapons'].length }, (value, index) => index)
            let mixed = mixer.sort(function(){ return 0.5 - Math.random() })
            let picks = mixed.slice(0,k.getN())
            
            picks.forEach(element => {
                weapons_info.push(data['weapons'][element])
                let button = document.createElement("button")
                button.setAttribute("value", (weapons_info.length-1))
                button.setAttribute("class", 'option')
                button.setAttribute("name", data['weapons'][element]['name'])
                button.style.backgroundImage = 'url(' + data['weapons'][element]['image'] + ')'
                button.innerHTML=data['weapons'][element]['name']
                button.setAttribute("title", data['weapons'][element]['alt'])
                console.log(data['weapons'][element]['alt'])
                buttonContainer.appendChild(button)
                
                button.addEventListener("click", function(event) {
                    let choice = event.target
                    userChoice.innerHTML = choice.name
                    play(choice.value)
                })
          })
    })
}

function kPlusPlus() {
    k.plusPlus()
    kView.innerHTML = k
    buttonContainer.textContent = ''
    populate()
}

function play(node) {
    const selector = Math.floor(Math.random() * defineNumbers[n])
    let choiceString = ('selector')
    lifeChoices.innerHTML = choiceString
}
