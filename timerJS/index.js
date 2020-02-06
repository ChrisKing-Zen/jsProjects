const startButton = document.querySelector('#start')
const durationInput = document.querySelector('#duration')
const pauseButton = document.querySelector('#pause')
const circle = document.querySelector('circle')
const totalDuration = 0
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter)

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        console.log('Timer Started');
        duration = totalDuration
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset', 
        perimeter * timeRemaining / duration - perimeter
        );
    },
    onComplete() {
        console.log('Timer just stopped');
    }
})

