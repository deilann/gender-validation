const JSON_PATH = '../data/kData.json'
const kView = document.getElementById('k-display')
const choiceHead = document.getElementById('choice-header')
const buttonContainer = document.getElementById('buttons-home')
const autonomy = document.getElementById('autonomy')

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
    autonomy.innerHTML = ''
    if (k > 49 ) {
        choiceHead.innerHTML += ' NO '
    } else {
    k.plusPlus()
    kView.innerHTML = k
    buttonContainer.textContent = ''
    populate()
    }
}

function kMinusMinus() {
    autonomy.innerHTML = ''
    if (k < 2) {
        choiceHead.innerHTML += ' NO '
    } else {
        k.minusMinus()
        kView.innerHTML = k
        buttonContainer.textContent = ''
        populate()
    }
}

function kZero() {
    autonomy.innerHTML = ''
    k.reset()
    choiceHead.innerHTML = 'Choose Wisely'
    kView.innerHTML = k
    buttonContainer.textContent = ''
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
    outcomes[0] = `... ${weapons_info[node]['name']} and ${weapons_info[node]['name']} ... more like a ${weapons_info[node]['strength']} and ${weapons_info[node]['weakness']} Spiderman meme.`
    outcomes[1] = `Your clever choice of ${weapons_info[node]['name']} allows you to triumph. Choosing ${weapons_info[selector]['name']}? Really? A quick ${weapons_info[node]['attack']['present']} exploits your opponent's ${weapons_info[selector]['weakness']} nature. The ${weapons_info[node]['strength']} always prevail.`
    outcomes[2] = `You shouldn't have chosen ${weapons_info[node]['name']}. Its ${weapons_info[node]['weakness']} nature was quickly exploited by your opponent ${weapons_info[selector]['attack']['prespart']} you until they achieved one ${weapons_info[selector]['strength']} victory.`
    autonomy.innerHTML = outcomes[k.makeDiff(node, selector)]
}