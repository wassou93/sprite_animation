let playerState = 'idle';
const dropDown = document.getElementById('animations');
dropDown.addEventListener('change', function(e) {
    playerState = e.target.value;
});

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = './resources/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;

let spriteAnimations = {};
const spriteStates = [
    {
        name: 'idle',
        length: 7,
    },
    {
        name: 'jump',
        length: 7,
    },
    {
        name: 'fall',
        length: 7,
    },
    {
        name: 'run',
        length: 9,
    },
    {
        name: 'dizzy',
        length: 11,
    },
    {
        name: 'sit',
        length: 5,
    },
    {
        name: 'roll',
        length: 7,
    },
    {
        name: 'bite',
        length: 7,
    },
    {
        name: 'ko',
        length: 12,
    },
    {
        name: 'gethit',
        length: 4,
    },
];
spriteStates.forEach((state, index) => {
    
    let animation = {
        loc: [],
    };

    for (let j = 0; j < state.length; ++j) {
        const location = {positionX: j * spriteWidth, positionY: index * spriteHeight};
        animation.loc.push(location);
    }

    spriteAnimations[state.name] = animation;
});

console.log(spriteAnimations);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    frameX = position * spriteWidth;
    frameY = spriteAnimations[playerState].loc[position].positionY;
    ctx.drawImage(playerImage, frameX, frameY, 
        spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        
    gameFrame ++;
    requestAnimationFrame(animate);
}

// Start the animation
animate();
