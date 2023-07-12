const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const totalEl = document.querySelector('#total')
// const again = document.querySelector('.again')


let time = 0
let score = 0
let total = 0
const colors = ['#F9F7F7', '#3F72AF', '#E84545']


startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

// again.addEventListener('click', event => {
//     screens[2].classList.remove('up')
//     startGame()
// })

board.addEventListener('click', event =>{
    if (event.target.classList.contains('circle')){
        score++
        total++
        event.target.remove()
        createRandomCircle()
    } else if (event.target.classList.contains('board')){
        total++
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0){
        finishGame()
    } else {
        let current = --time
        if (current < 10){
        current = `0${time}`
    }
    setTime(current)
    }    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(15, 25)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size*2) 
    const y = getRandomNumber(0, height - size*2) 
    const color = getColor()


    circle.classList.add('circle')
    circle.style.background = `${color}`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function getColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getTotal(score, total){
    let accuracy = score/total*100
    totalEl.innerHTML = `Ваш счёт: ${score}<br/>Ваша меткость: ${accuracy}%`
}

function finishGame(){
    screens[2].classList.add('up')
    timeEl.parentNode.classList.add('hide')
    getTotal(score, total)
}