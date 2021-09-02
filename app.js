const rows = 8;
const cols = 8;
let cells = [];
let currentAction = null;

function initCells() {
    const savedCells = localStorage.getItem('cells');
    if (savedCells) {
        cells = JSON.parse(savedCells);
    } else {
        const letters = Array.from({ length: cols }, (_, i) => String.fromCharCode(65 + i));
        for (let i = 0; i < rows; i++) {
            letters.forEach((_) => {
                cells.push(`${_}-${i + 1}`);
            });
        }
        cells.sort(() => Math.random() - 0.5);
        localStorage.setItem('cells', JSON.stringify(cells));
    }
}

function showResults() {
    const result = cells.pop();
    if (result === undefined) {
        // end
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
    }, 1000);
}

function endAnalizer() {
    document.querySelector('.reader').classList.remove('active');
    window.clearTimeout(currentAction);
}

document.addEventListener('DOMContentLoaded', () => {
    initCells();
    document.querySelector('.reader').addEventListener('touchstart', () => {
        startAnalizer();
    });
    document.querySelector('.reader').addEventListener('touchend', () => {
        endAnalizer();
    });
});
