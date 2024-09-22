const CONTAINER = document.getElementById('container');
let range = document.getElementById('range');
let option = document.getElementById('option');
const totalContainer = document.getElementById('total');
const totalItemsContainer = document.getElementById('total-items');
const timer = document.getElementById('timer')
const timerCounter = document.getElementById('timer-counter')
const play = document.getElementById('play');

let time = 1000;
let counter = 1;

range.addEventListener('change', () => {
    let rangeValue = range.value;
    totalContainer.innerHTML = rangeValue;
    if (rangeValue == 9) {
        totalItemsContainer.innerHTML = "5";
    } else if (rangeValue == 12) {
        totalItemsContainer.innerHTML = "5";
    } else if (rangeValue == 15) {
        totalItemsContainer.innerHTML = "8";
    }
});

function setTime(myEl, difficulty) {
    let diffuculties = document.querySelectorAll('.difficulty');
    diffuculties.forEach((el) => {
        el.classList.remove('difficultyActive')
    });
    if (difficulty == "1") {
        time = 1000;
        myEl.classList.add('difficultyActive')
    } else if (difficulty == "2") {
        time = 0500;
        myEl.classList.add('difficultyActive')
    } else {
        time = 0300;
        myEl.classList.add('difficultyActive')
    } this
}

play.addEventListener('click', () => {
    let number = range.value;
    let generate = 0;
    let rand = 9;
    if (number == 9) {
        CONTAINER.style.gridTemplateColumns = "1fr 1fr 1fr";
        CONTAINER.style.gridTemplateRows = "1fr 1fr 1fr";
        generate = 5;
    } else if (number == 12) {
        CONTAINER.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
        CONTAINER.style.gridTemplateRows = "1fr 1fr 1fr";
        rand = 12;
        generate = 5;
    } else if (number == 15) {
        CONTAINER.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
        CONTAINER.style.gridTemplateRows = "1fr 1fr 1fr";
        rand = 15;
        generate = 8;
    }

    // Generate random numbers
    numbers = []
    positions = []
    for (let i = 1; i <= generate; i++) {
        numbers.push(i);
    }

    while (positions.length < generate) {
        let random = Math.floor(Math.random() * rand) + 0
        if (positions.indexOf(random) === -1) {
            positions.push(random)
        }
    }

    console.log(numbers)
    console.log(positions)

    for (let i = 0; i < number; i++) {
        let box = document.createElement('div');
        box.classList.add('box', 'add', 'boxHover');
        box.setAttribute('onclick', `clickMe(this, '${generate}')`)
        const label = document.createElement('h1');
        label.classList.add("label");
        box.style.pointerEvents = "none";

        // SET THE POSITION OF GENERATED NUMBER
        if (positions.indexOf(i) != -1) {
            box.setAttribute('data-value', numbers[positions.indexOf(i)])
            box.appendChild(label)
            label.textContent = numbers[positions.indexOf(i)]
        } else {
            box.setAttribute('data-value', 0)
        }

        CONTAINER.appendChild(box);
    }

    option.style.display = "none";

    // Countdown starting value
    let countdown = 3;

    // Update the timer h1 element with the current countdown value
    timer.style.display = "flex"
    timerCounter.innerText = countdown;

    // Set interval to countdown every second
    let countdownInterval = setInterval(() => {
        countdown--;
        timerCounter.innerText = countdown; // Update the timer on screen

        if (countdown === 0) {
            clearInterval(countdownInterval); // Stop the countdown when it reaches 0
            timer.style.display = "none"; // Hide the timer
            displayNumbers(number); // Call the function to display boxes
        }
    }, 1000);

});

function displayNumbers() {
    let label = document.querySelectorAll('.label');
    let allBoxes = document.querySelectorAll('.box');
    label.forEach((myEl) => {
        myEl.style.visibility = "visible";
    })

    setTimeout(() => {
        label.forEach((myEl) => {
            myEl.style.visibility = "hidden";
        })
    }, time);

    allBoxes.forEach((myEl) => {
        myEl.style.pointerEvents = "fill";
    })
}

function clickMe(el, limit) {
    let num = parseInt(limit);
    let allBoxes = document.querySelectorAll('.box');
    let allLabels = document.querySelectorAll('.label');

    if (counter <= num) {
        let value = parseInt(el.getAttribute("data-value"));
        console.log("Clicked box value:", value);

        if (value == counter) {
            counter++;
            let label = el.querySelector('.label');
            if (label) {
                label.style.visibility = "visible";
            }
            el.classList.add('green');
            el.classList.remove('boxHover');


            if (counter == num + 1) {
                allBoxes.forEach((myEl) => {
                    myEl.classList.add('green');
                    myEl.classList.remove('boxHover');

                })

                setTimeout(() => {
                    location.reload();
                }, 3000);
            }

        } else {

            allBoxes.forEach((myEl) => {
                myEl.classList.add('red');
                myEl.classList.remove('green');
                myEl.classList.remove('boxHover');
                myEl.style.pointerEvents = "none";
            })

            allLabels.forEach((myEl) => {
                myEl.style.visibility = "visible";
            })

            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    }


}