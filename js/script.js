  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let currentX = 225;
  let currentY = 540;
  let activeDirections = {left: false, right: false}
  let obstacleArray = [];
  let lives = 3;
  let gameID = null;

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
   startGame();
  }

   // START GAME >> DRAW ROAD
  function drawRoad() {
    const road = new Image();
    road.src = '/images/road.png';
    ctx.drawImage(road, 0, 0, canvas.width, canvas.height);
  }

   // DRAW CAR
  function drawCar() {
    const car = new Image();
    car.src = '/images/car.png';

    ctx.drawImage(car, currentX, currentY, 50, 100);  
   }

   function startGame() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     drawRoad();
     drawCar();

     requestAnimationFrame(startGame);
   }

  }

function gameLoop() {
  gamedID = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawRoad();
    drawCar();

    let rando = Math.random();
    if (rando > 0.94) generateObstacle();

    if (detectCollisions()) {
        lives -= 1;
        currentX = 0;
        currentY = 0;
    }

    // checkForDefeat();
  }, 100);

}

// function checkForDefeat(){
//     if (lives <= 0){
//         clearInterval(gameID);
//         ctx.fillText('You Lose', 200, 120)
//     }
// }

// function safeFromEdges(speed) {
//   if (currentX - speed <= 0 && activeDirections.left) return false;
//   if (currentX + speed >= 500 && activeDirections.right) return false;
//   if (currentY - speed <= 0 && activeDirections.up) return false;
//   if (currentY + speed >= 300 && activeDirections.down) return false;

//   return true;
// }

function generateObstacle() {
  const randomHeight = Math.round(Math.random() * 50 + 5);

  const randomWidth = Math.round(Math.random() * 50 + 25);

  const randomYValue = Math.round(Math.random() * (300 - randomHeight));
  const newObstacle = new Obstacle(
    canvas.width,
    randomYValue,
    randomWidth,
    randomHeight
  );
  obstacleArray.push(newObstacle);
  newObstacle.moveDownForever();
}

function move(speed) {
  if (activeDirections.right) currentX += speed;
  if (activeDirections.left) currentX -=speed;
  console.log(currentX);
}

  document.onkeydown = function(event) {
  const arrows = ['ArrowLeft', 'ArrowRight']
      if (arrows.includes(event.key)) {
          event.preventDefault();
      }
      if (event.key ===  "ArrowLeft") {
          activeDirections.left = true;
      } else if (event.key === "ArrowRight") {
          activeDirections.right = true;
      }
      move(3);
  };
  
  document.onkeyup = function(event) { 
          if (event.key === "ArrowLeft") {
              activeDirections.left = false;
          } else if (event.key === "ArrowRight") {
              activeDirections.right = false;
          }
      };

      gameLoop()
  