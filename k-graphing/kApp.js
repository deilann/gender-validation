const JSON_PATH = '../data/kData.json'
const kView = document.getElementById('k-display')
const choiceHead = document.getElementById('choice-header')
const buttonContainer = document.getElementById('buttons-home')
const autonomy = document.getElementById('autonomy')
const automaton = document.getElementById('automaton')
const details = document.getElementById('details')

let weapons_info = []
const k = new oddInteger()
kView.innerHTML = k
let wins = []
let losses = []
let ties = []
let noCount = 0
let noWarns = 0
choiceHead.innerHTML = 'Choose Wisely'
automaton.innerHTML = `★ wins ${wins.length} ★ losses ${losses.length} ★ ties ${ties.length} ★`
let totalOptions

function populate() {
    buttonContainer.textContent = ''
    details.innerHTML = ''
    choiceHead.innerHTML = 'Choose Wisely'
    weapons_info = []
    if (noCount > 5) {
        if (!noWarns) {
            details.innerHTML = 'Do you know what no means?'
            noWarns++
        } else if (noWarns === 1) {
            details.innerHTML = 'I\'d ask again if you know what no means, but I\'ve already asked once.'
            noWarns++
        } else if (noWarns < 5) {
            details.innerHTML = `Oh yay another warning to put with your other ${noWarns} warnings. It's kind of concerning how little you care about NO. (It means no.)` 
            noWarns++
        } else {
            window.location.pathname = '/k-graphing/apologize.html';
        }
        
        noCount = 0
        
    }
    fetch(JSON_PATH)
        .then(res => res.json())
        .then(data => {
            totalOptions = data['weapons'].length
            let mixer = Array.from({ length: totalOptions }, (value, index) => index)
            let mixed = mixer.sort(function(){ return 0.5 - Math.random() })
            let picks = mixed.slice(0,k.getN())

            picks.forEach(element => {
                weapons_info.push(data['weapons'][element])
                let button = document.createElement('button')
                button.setAttribute('value', (weapons_info.length-1))
                button.setAttribute('class', 'option')
                button.setAttribute('name', data['weapons'][element]['name'])
                button.style.backgroundImage = data['weapons'][element]['image']
                button.innerHTML=data['weapons'][element]['name']
                button.setAttribute('title', data['weapons'][element]['alt'])
                buttonContainer.appendChild(button)
                
                button.addEventListener('click', function(event) {
                    let choice = event.target
                    play(choice.value)
                })

          })
    })
}

function kPlusPlus() {
    
    if (k >= Math.floor((totalOptions-1)/2)) {
        choiceHead.innerHTML += ' NO '
        noCount++
    } else {
    k.plusPlus()
    kView.innerHTML = k
    buttonContainer.textContent = ''
    autonomy.innerHTML = ''
    populate()
    }
}

function kMinusMinus() {
    if (k < 1) {
        choiceHead.innerHTML += ' NO '
        noCount++
    } else {
        k.minusMinus()
        kView.innerHTML = k
        buttonContainer.textContent = ''
        autonomy.innerHTML = ''
        populate()
    }
}

function kZero() {
    k.reset()
    choiceHead.innerHTML = 'Choose Wisely'
    kView.innerHTML = k
    buttonContainer.textContent = ''
    autonomy.innerHTML = ''
    populate()

}

function makeDudButton(element) {
    let button = document.createElement('button')
    button.setAttribute('class', 'option')
    button.setAttribute('name', weapons_info[element]['name'])
    button.style.backgroundImage = weapons_info[element]['image']
    button.innerHTML = weapons_info[element]['name']
    button.setAttribute("title", weapons_info[element]['alt'])
    buttonContainer.appendChild(button)
}


let outcomes = []

function play(node) {
    const selector = Math.floor(Math.random() * k.getN())
    choiceHead.innerHTML = `${weapons_info[node]['name']} vs ${weapons_info[selector]['name']}`
    buttonContainer.textContent = ''
    makeDudButton(node)
    makeDudButton(selector)
    if (!k.makeDiff(node, selector)) {
        autonomy.innerHTML = `... ${weapons_info[node]['name']} and ${weapons_info[node]['name']} ... more like one ${weapons_info[node]['strength']} and ${weapons_info[node]['weakness']} Spiderman meme.`
        ties.push(weapons_info[node]['name'])
        if (ties.length % 5 === 0) {
            details.innerHTML = `Has ${ties[Math.floor(Math.random() * ties.length)]} ever managed to make any impact?`
        }
    } else if (k.makeDiff(node, selector) === 1) {
        autonomy.innerHTML = `Your clever choice of ${weapons_info[node]['name']} allows you to triumph. Choosing ${weapons_info[selector]['name']}? Really? A quick ${weapons_info[node]['attack']['present']} exploits your opponent's ${weapons_info[selector]['weakness']} nature. The ${weapons_info[node]['strength']} always prevail.`
        wins.push(weapons_info[node]['name'])
        if (wins.length % 5 === 0) {
            details.innerHTML = `When are you going to let ${wins[Math.floor(Math.random() * wins.length)]} retire?`
        }
    } else {
        autonomy.innerHTML = `You shouldn't have chosen ${weapons_info[node]['name']}. That choice is too ${weapons_info[node]['weakness']} which can be exploited by your opponent ${weapons_info[selector]['attack']['prespart']} you until they achieve their ${weapons_info[selector]['strength']} victory.`
        losses.push(weapons_info[node]['name'])
        if (losses.length % 5 === 0) {
            details.innerHTML = `Do you think ${losses[Math.floor(Math.random() * losses.length)]} still has hope?`
        }
    }

    automaton.innerHTML = `★ wins ${wins.length} ★ losses ${losses.length} ★ ties ${ties.length} ★`
}

populate()