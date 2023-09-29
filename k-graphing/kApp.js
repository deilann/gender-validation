const JSON_PATH = '../data/kData.json'
const computerChoice = document.getElementById('computer-choice')
const userChoice = document.getElementById('user-choice')
const outcome = document.getElementById('outcome')
const kView = document.getElementById('k-display')
const validChoices = document.querySelectorAll('.option')
const kSpace = document.getElementById('k-container')
var buttonContainer = document.getElementById('buttons')


let k = 0
kView.innerHTML = k
let weapons_info = []

function populateWeapons() {
    weapons_info = []
    let n = 2*k + 1
    fetch(JSON_PATH)
        .then(res => res.json())
        .then(data => {
            let mixer = Array.from({ length: data['weapons'].length }, (value, index) => index)
            var mixed = mixer.sort(function(){ return 0.5 - Math.random() })
            var picks = mixed.slice(0,n)
            let i = 0
            picks.forEach(element => {
                weapons_info.push(data['weapons'][element])
                var button = document.createElement("button")
                button.setAttribute("value", i)
                i++
                button.setAttribute("name", data['weapons'][element]['name'])
                button.innerHTML=data['weapons'][element]['name']
                buttons.appendChild(button);
                
                button.addEventListener("click", function(event) {
                var btn = event.target;
                var page = btn.getAttribute("pageto");
                options.appendChild(btn);
                alert(page);
            })
          })
        
       
        })
        }

    
    




        // var button = document.createElement('button')
        // button.setAttribute('value', i)
        // button.setAttribute('name', weapon['name'])
        // button.setAttribute('class', 'option')
        // button.innerHTML=weapon['name']
        // button.addEventListener('click', (e) => {
        //     userChoice.innerHTML = e.target.name
        //     })
        // optionButtons.appendChild(button)
        // i++
        // })

    




function kPlusPlus() {
    k++
    kView.innerHTML = k
    buttonContainer.textContent = ''
    populateWeapons()
}

populateWeapons()
