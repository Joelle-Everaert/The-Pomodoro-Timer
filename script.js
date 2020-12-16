const container = document.querySelector('.container')
const time = document.querySelector('.time')
const start_button = document.querySelector('.start')
const stop_button = document.querySelector('.stop')
const reset_button = document.querySelector('.reset')
const pause = document.querySelector('.pause')
const break_pause = document.querySelector('.break_pause')
const tour_break = document.querySelector('.tour_break')


let tour = 0;
const tour_pomodoro = setInterval(function(){
    tour_break.innerHTML= "Break tour : " + tour
}, 1000)

// Decompte des 25min////
let sec = 1500
let min;
let pomodoro_timer;
let sec2 = 300
let min2;
let sec3 = 900;
let min3;



const start_timer = () => {
    pomodoro_timer = setInterval(function () {
        sec--
        min = Math.floor(sec / 60)
        time.innerHTML = ("0" + min).slice(-2) + ':' + (sec - (min * 60))
        if (sec < 10) {
            time.innerHTML = ("0" + min).slice(-2) + ':' + "0" + (sec - (min * 60))
        }
        if (sec == 0) { // pause
            tour++
            clearInterval(pomodoro_timer)
            if (tour < 4) {
                sec2 = 300
                let pauseInterval = setInterval(function () {
                    sec2--
                    min2 = Math.floor(sec2 / 60)
                    pause.innerHTML = ("0" + min2).slice(-2) + ':' + (sec2 - (min2 * 60))
                    if (sec2 < 10) {
                        pause.innerHTML = ("0" + min2).slice(-2) + ':' + "0" + (sec2 - (min2 * 60))
                    }
                    if (sec2 == 0) {
                        clearInterval(pauseInterval)
                        sec = 1500
                        start_timer()
                    }
                }, 1000)
            } else {
                let break_time = setInterval(function () {
                    sec3--
                    min3 = Math.floor(sec3 / 60)
                    break_pause.innerHTML = ("0" + min3).slice(-2) + ':' + (sec3 - (min3 * 60))
                    if (sec3 < 10) {
                        break_pause.innerHTML = ("0" + min3).slice(-2) + ':' + "0" + (sec3 - (min3 * 60))
                    }
                    
                    if (sec3 == 0) {
                        sec3 = 900
                        clearInterval(break_time)
                        sec = 1500
                        start_timer()
                        tour = 0
                    }
                }, 1000)
            }
            
            
        }
    }, 1000)
}

let start = true

document.body.addEventListener('click', function (e) {
    if (e.target == start_button) {
        if (start == true) {
            start = false
            start_timer()
        }
    }
    if (e.target == stop_button) {
        if (start == false) {
            start = true
            clearInterval(pomodoro_timer)
        }
    }
    if (e.target == reset_button) {
        start = true;
        sec = 1500
        clearInterval(pomodoro_timer)
        time.innerHTML = "25:00"
    }
})