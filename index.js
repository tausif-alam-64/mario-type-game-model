const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const gravity = 1;
let scrollOfset = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor() {
    this.position = { x: 100, y: 100 };
    this.velocity = { x: 0, y: 0 };
    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

const platformImage = new Image();
platformImage.src = "./assets/platform.png"
class Platform {
  constructor({ x, y }) {
    this.position = { x, y };
    this.width = 200;
    this.height = 50;
  }
  
  draw() {
    c.drawImage(platformImage,this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();

function generateRandomBlock(count) {
  const blocks = [];
  let lastX = 200;

  for (let i = 0; i < count; i++) {
    const gap = Math.random() * 200 + 100;
    const width = Math.random() * 150 + 100;
    const height = 20;
    const y = Math.random() * (canvas.height - 300) + 100;
    blocks.push(new Platform({ x: lastX, y, width, height }));
    lastX += width + gap;
  }

  return blocks;
}

const platforms = generateRandomBlock(43);



const keys = {
  right: { pressed: false },
  left: { pressed: false }
};

const background = new Image();
background.src = "./assets/background.png"

const hillsImage = new Image();
hillsImage.src = "./assets/hills.png";

const groundImage = new Image();
groundImage.src = "./assets/groundImage.png";

const groundHeight = 80;

let hillsX = 0;

function animate() {
  requestAnimationFrame(animate);

  c.drawImage(background,0,0,canvas.width, canvas.height);
  c.drawImage(hillsImage, hillsX, canvas.height - 700, canvas.width * 7, 800);
  c.drawImage(hillsImage, hillsX + canvas.width, canvas.height - 700, canvas.width  * 7, 800);

  for (let x = hillsX % canvas.width; x < canvas.width; x += canvas.width){
    c.drawImage(groundImage, x, canvas.height - groundHeight, canvas.width, groundHeight);
  }
  if(keys.right.pressed) hillsX -= 1;
  if(keys.left.pressed) hillsX += 1;

  if(hillsX <= -canvas.width) hillsX = 0;
  // c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((platform) => platform.draw());

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOfset += 5;
      platforms.forEach((platform) => (platform.position.x -= 5));
    } else if (keys.left.pressed) {
      scrollOfset -= 5;
      platforms.forEach((platform) => (platform.position.x += 5));
    }
    if (scrollOfset > 2000) {
      console.log("You win");
    }
  }


  if (!keys.right.pressed && !keys.left.pressed) {
    player.velocity.x = 0;
  }

  if(player.position.y + player.height >= canvas.height - groundHeight){
    player.velocity.y = 0;
    player.position.y = canvas.height - groundHeight - player.height;
  }

  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
}

animate();

window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65: // 'A'
    case 37: // Left Arrow
      console.log("left");
      keys.left.pressed = true;
      break;
    
    case 68: // 'D'
    case 39: // Right Arrow
      console.log("right");
      keys.right.pressed = true;
      break;
    
    case 87: // 'W'
    case 38: // Up Arrow
    case 32: // Spacebar
      console.log("up");
      
        player.velocity.y = -20;
      
      break;
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65: // 'A'
    case 37: // Left Arrow
      console.log("left released");
      keys.left.pressed = false;
      break;

    case 68: // 'D'
    case 39: // Right Arrow
      console.log("right released");
      keys.right.pressed = false;
      break;

    case 87: // 'W'
    case 38: // Up Arrow
    case 32: // Spacebar
      console.log("jump key released");
      break;
  }
});
