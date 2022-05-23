const FRONT = "front"
const BACK = "back"
const CARD = "card"
const ICON = 'icon'

let show = true
var start_game = document.getElementsByClassName('start_game')[0]
var cabecalho = document.getElementById('container')
var tabuleiro = document.getElementById('board')

function show_regras(){
    //let btn_regras = document.getElementById('btn_regras')
    let field = document.getElementsByClassName('regras')[0]
    field.classList.toggle('on', show)
    show = !show
}

//Inicia o jogo (cria, embaralha as cartas e prepara o tabuleiro)
function start(){
    start_game.style.display = "none"
    cabecalho.style.display = "flex"
    tabuleiro.style.display = "grid"
    game.setar_cards()
    setar_tabuleiro(game.cards)
    contar = setInterval(time, 1000)
}

function time(){
    setar_timer(game.segundos, game.minutos)
    game.segundos += 1
    if (game.segundos >= 60){
        game.segundos = 0 
        game.minutos += 1
    }
}

function setar_timer(segundos, minutos){
    let clock = document.getElementById('clock')
    if (segundos < 10){
        segundos = '0'+segundos
    }
    if (minutos < 10){
        minutos = '0'+minutos
    }
    clock.innerHTML = `${minutos}:${segundos}`
}
//Cria o tabuleiro
function setar_tabuleiro(cards){
    for (let card of cards){
        let element = document.createElement('div')
        element.id = card.id;
        element.setAttribute('class', CARD)
        element.dataset.icon = card.icon
        create_card(card, element)
        element.addEventListener('click', flip)
        tabuleiro.appendChild(element)
    }
}
function create_face(face, card, element){
    let card_face = document.createElement('div')
    card_face.setAttribute('class', face)
    if(face === FRONT){
        let icon_element = document.createElement('img')
        icon_element.setAttribute('class', ICON)
        icon_element.src = "images/" + card.icon + ".png"
        card_face.appendChild(icon_element)
    }
    else{
        card_face.innerHTML = '?'
    }
    element.appendChild(card_face)
}
//Define uma animação
function flip(){
    if(game.set_card(this.id)){
        this.classList.add('rotate')
        if(game.second_card){
            if (game.match()){
                game.clear()
                if (game.game_over()){
                    clearInterval(contar)
                    game.save()
                    var end_game = document.getElementById('end_game')
                    var recorde_tempo = document.getElementById('recorde_tempo')
                    var recorde_move = document.getElementById('recorde_moves')
                    recorde_tempo.innerText = `Recorde de tempo = ${localStorage.getItem('record_minutos')}:${localStorage.getItem('record_segundos')}`
                    recorde_move.innerText = `Recorde de movimenetos = ${localStorage.getItem('record_moves')}`
                    end_game.style.display = 'flex'
                }
            }
            else{
                setTimeout(() => {
                    let first_view = document.getElementById(game.first_card.id)
                    let second_view = document.getElementById(game.second_card.id)
        
                    first_view.classList.remove('rotate')
                    second_view.classList.remove('rotate')
                    game.unflip() 
                }, 1000);
            }
        }
    }
    
}
//Cria a carta
function create_card(card, element){
    create_face(FRONT, card, element)
    create_face(BACK, card, element)
}
function restart(){
    window.location.reload(false);
}
