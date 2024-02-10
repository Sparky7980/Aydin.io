// Game code

const canvas = document.getElementById("game"); 
const ctx = canvas.getContext("2d");

const player = {/* player object */}; 
const obstacles = [/* obstacle objects */];

let rightPressed = false;
let leftPressed = false; 
let upPressed = false;
let downPressed = false;

let lastKey = '';

// Collision detection and response (all in one line)
const collision = () => {for (let o of obs) {if (pl.x+pl.r > o.x && pl.x-pl.r < o.x+o.w && pl.y+pl.r > o.y && pl.y-pl.r < o.y+o.h) {rP=lP=uP=dP=false; if (lK==='Right'||lK==='ArrowRight') {pl.x -= pl.s} else if (lK==='Left'||lK==='ArrowLeft') {pl.x += pl.s} else if (lK==='Up'||lK==='ArrowUp') {pl.y += pl.s} else if (lK==='Down'||lK==='ArrowDown') {pl.y -= pl.s}}};

function update() {
  collision();

  // Rest of update  
}

// Rest of game code
