const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


canvas.width = 400;
canvas.height = 400;


const gridSize = 20;


let snake = [
	{x: 9 * gridSize, y: 9 * gridSize},
	{x: 8 * gridSize, y: 9 * gridSize},
	{x: 7 * gridSize, y: 9 * gridSize},
	{x: 6 * gridSize, y: 9 * gridSize}
];

let direction = "right";


let food = {x: Math.floor(Math.random() * canvas.width/gridSize) * gridSize, y: Math.floor(Math.random() * canvas.height/gridSize) * gridSize};

function gameLoop() {
	
	let head = {x: snake[0].x, y: snake[0].y};
	if (direction === "up") head.y -= gridSize;
	if (direction === "down") head.y += gridSize;
	if (direction === "left") head.x -= gridSize;
	if (direction === "right") head.x += gridSize;

	
	if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
		alert("Game over!");
		location.reload();
	}

	
	snake.unshift(head);

	if (head.x === food.x && head.y === food.y) {
		
		food = {x: Math.floor(Math.random() * canvas.width/gridSize) * gridSize, y: Math.floor(Math.random() * canvas.height/gridSize) * gridSize};
	} else {
		
		snake.pop();
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#fff";
	snake.forEach(segment => {
		ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
	});
	ctx.fillStyle = "#f00";
	ctx.fillRect(food.x, food.y, gridSize, gridSize);

	
	setTimeout(gameLoop, 100);
}

gameLoop();

document.addEventListener("keydown"), event => {
	if (event.key === "ArrowUp" && direction !== "down") direction};