var game ={

    lock: false,

    first_card: null,

    second_card: null,

    moves: 1,

    segundos: 0,

    minutos: 0,

    lista: ['css', 'html',
    'javascript', 'bootstrap',
    'electron','firebase','jquery',
    'mongo','node','react'] ,

    cards: null,

    set_card: function(id){
        let card = this.cards.filter(card => card.id === id)[0]

        if (card.rotate || this.lock){
            return false
        }
        if (!this.first_card){
            this.first_card = card
            this.first_card.rotate = true
            return true
        }
        else{
            this.second_card = card
            this.second_card.rotate = true
            this.lock = true
            return true
        }
    },

    save: function(){
        if (localStorage.getItem('record_minutos') == null ||localStorage.getItem('record_moves') == null){
            localStorage.setItem('record_minutos', this.minutos)
            localStorage.setItem('record_segundos', this.segundos)
            localStorage.setItem('record_moves', this.moves)
        }
        else{
            if (this.moves < localStorage.getItem('record_moves')){
                localStorage.setItem('record_moves', this.moves)
            }
            if (this.minutos <= localStorage.getItem('record_minutos')){
                let time = (localStorage.getItem('record_minutos') * 60) +  localStorage.getItem('record_segundos')
                if (this.segundos < time){
                    localStorage.setItem('record_segundos', this.segundos)
                    localStorage.setItem('record_minutos', this.minutos) 
                }
            }
        }
        console.log(localStorage.getItem('record_moves'))
    },

    match: function(){
        var points = document.getElementsByClassName('move')[0].children[0]
        points.innerText = this.moves
        this.moves += 1
        if (!this.first_card || !this.second_card){
            return false
        }
        return this.first_card.icon === this.second_card.icon
    },

    clear: function(){
        this.first_card = null
        this.second_card = null
        this.lock = false
    },

    unflip: function(){
        this.first_card.rotate = false
        this.second_card.rotate = false
        this.clear()
    },

    game_over: function(){
        return this.cards.filter(card=>!card.rotate).length == 0
    },

    setar_cards: function(){
        this.cards = []

        this.lista.forEach((tech) =>{
            this.cards.push(this.set_pair(tech))})
        this.cards = this.cards.flatMap(pair=>pair)
        this.shuffle();
    },

    //Define os pares
    set_pair: function(tech){
        return [
            {
                id: this.set_id(tech), 
                icon: tech,
                rotate: false
            },
            {
                id: this.set_id(tech), 
                icon: tech,
                rotate: false
            }
        ]
    },
    
    //Cria os id das cartas
    set_id: function(tech){
        return tech + parseInt(Math.random() * 1000)
    },

    //Embaralha as cartas
    shuffle: function(cards){
        let index = this.cards.length
        let random_index = 0
        while (index !== 0){
            random_index = Math.floor(Math.random() * index)
            index--
            [this.cards[random_index],this.cards[index]] = [this.cards[index],this.cards[random_index]]
        }
    }
}