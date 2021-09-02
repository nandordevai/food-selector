const rows = 8;
const cols = 8;
let cells = [];
let currentAction = null;
let finished = false;

function initCells() {
    const savedCells = localStorage.getItem('cells');
    if (savedCells && savedCells.length > 0) {
        cells = JSON.parse(savedCells);
    } else {
        const letters = Array.from({ length: cols }, (_, i) => String.fromCharCode(65 + i));
        for (let i = 0; i < rows; i++) {
            letters.forEach((_) => {
                cells.push(`${_}-${i + 1}`);
            });
        }
        cells.sort(() => Math.random() - 0.5);
        localStorage.setItem('initialCells', JSON.stringify(cells));
        localStorage.setItem('cells', JSON.stringify(cells));
    }
}

function showResults() {
    const result = cells.pop();
    if (result === undefined) {
        document.querySelector('.result p').classList.add('hidden');
        document.querySelector('.result h2').innerHTML = 'No more results';
        finished = true;
    } else {
        document.querySelector('.result h2').classList.remove('hidden');
        document.querySelector('.result p').innerHTML = result;
        localStorage.setItem('cells', JSON.stringify(cells));
    }
}

function startAnalizer() {
    document.querySelector('.reader').classList.add('active');
    currentAction = window.setTimeout(() => {
        showResults();
    }, 2000);
}

function endAnalizer() {
    document.querySelector('.reader').classList.remove('active');
    window.clearTimeout(currentAction);
}

document.addEventListener('DOMContentLoaded', () => {
    initCells();
    document.querySelector('.reader').addEventListener('touchstart', () => {
        if (!finished) {
            startAnalizer();
        }
    });
    document.querySelector('.reader').addEventListener('touchend', () => {
        if (!finished) {
            endAnalizer();
        }
    });
});
