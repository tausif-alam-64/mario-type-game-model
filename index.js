
 const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const gravity =1;
let scrollOfset = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
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

class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = 20;
  }
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
const player = new Player();
const platforms = [
  new Platform({ x: 300, y: 500,}),
  new Platform({ x: 500, y: 200 }),
  new Platform({ x: 700, y: 300 }),
  new Platform({ x: 900, y: 600 }),
  new Platform({ x: 1000, y: 900 }),
  new Platform({ x: 1200, y: 500,}),
  new Platform({ x: 1500, y: 200 }),
  new Platform({ x: 1700, y: 300 }),
  new Platform({ x: 1900, y: 600 }),
  new Platform({ x: 2500, y: 900 }),
  new Platform({ x: 2800, y: 500,}),
  new Platform({ x: 3100, y: 200 }),
  new Platform({ x: 4000, y: 300 }),
  new Platform({ x: 4200, y: 600 }),
  new Platform({ x: 47000, y: 900 }),
  new Platform({ x: 5000, y: 500,}),
  new Platform({ x: 5300, y: 200 }),
  new Platform({ x: 5400, y: 300 }),
  new Platform({ x: 6000, y: 600 }),
  new Platform({ x: 6100, y: 900 }),
  new Platform({ x: 7000, y: 500,}),
  new Platform({ x: 7200, y: 200 }),
  new Platform({ x: 7400, y: 300 }),
  new Platform({ x: 8000, y: 600 }),
  new Platform({ x: 8900, y: 900 }),
  new Platform({ x: 9400, y: 500,}),
  new Platform({ x: 9800, y: 200 }),
  new Platform({ x: 10000, y: 300 }),
  new Platform({ x: 10400, y: 600 }),
  new Platform({ x: 10500, y: 900 }),
  new Platform({ x: 10700, y: 500,}),
  new Platform({ x: 11000, y: 200 }),
  new Platform({ x: 11200, y: 300 }),
  new Platform({ x: 11400, y: 600 }),
  new Platform({ x: 11900, y: 900 }),
];
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((platform) => {
    platform.draw();
  });

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        scrollOfset += 5
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      platforms.forEach((platform) => {
        scrollOfset -= 5
        platform.position.x += 5
      });
    }
    if(scrollOfset > 2000){
        console.log("You win")
    }
  }
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=platform.position.y &&player.position.x + player.width >= platform.position.x &&player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
};

animate();

window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
});
window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
}); 

