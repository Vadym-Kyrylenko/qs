let score = 0;
const sizeSquare = 20;
let id;

const generateNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const start = () => {
    cancelScoreAndSquares();
    requestAnimationFrame(animate);
};

const stop = () => {
    cancelAnimationFrame( id );
    squares = [];
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const clickInSquare = (e) => {
    const clickPos = {
        x: e.offsetX,
        y: e.offsetY
    };

    squares.map((item, index) => {
        if (clickPos.x >= item.x && clickPos.x <= item.x + sizeSquare && clickPos.y >= item.y && clickPos.y <= item.y + sizeSquare) {
            squares.splice(index, 1);
            countScore();
        }
    });
};

document.addEventListener('mousedown', clickInSquare);

const newSquare = () => {
    return {
        x: generateNumber(0, 620),
        y: 0,
        speed: generateNumber(1, 3),
        color: getRandomColor()
    };
};

let squares = [newSquare()];

const animate = () => {
    const canvas = document.getElementById('canvas');
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    squares.map((item, index) => {
        ctx.fillStyle = item.color;
        ctx.strokeStyle = item.color;
        ctx.fillRect(item.x, item.y, sizeSquare, sizeSquare);
        if (item.y >= canvasHeight) {
            squares.splice(index, 1);
        } else {
            item.y += item.speed;
        }

    });

    id = requestAnimationFrame(animate);
};

const countScore = () => {
    score++;
    updateScore(score);
};

const cancelScoreAndSquares = () => {
    score = 0;
    updateScore(score);
    squares = [];
};

const updateScore = (score) => {
    document.getElementById('score').innerHTML = score;
};

setInterval(() => {
    squares.push(newSquare());
}, 400);
