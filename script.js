window.onload = () => {
setTimeout(() => {
document.getElementById('loading').style.display = 'none';
}, 1500);
};

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
init();
});

function Particle(x, y, directionX, directionY, size, color) {
this.x = x;
this.y = y;
this.directionX = directionX;
this.directionY = directionY;
this.size = size;
this.color = color;
}

Particle.prototype.draw = function() {
ctx.beginPath();
ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
ctx.fillStyle = 'rgba(255, 200, 0, 0.8)';
ctx.fill();
};

Particle.prototype.update = function() {
if (this.x + this.size > canvas.width || this.x - this.size < 0) {
this.directionX = -this.directionX;
}
if (this.y + this.size > canvas.height || this.y - this.size < 0) {
this.directionY = -this.directionY;
}
this.x += this.directionX;
this.y += this.directionY;
this.draw();
};

function init() {
particlesArray = [];
let numberOfParticles = (canvas.height * canvas.width) / 9000;
for (let i = 0; i < numberOfParticles; i++) {
let size = (Math.random() * 5) + 1;
let x = (Math.random() * (innerWidth - size * 2));
let y = (Math.random() * (innerHeight - size * 2));
let directionX = (Math.random() - 0.5) * 1;
let directionY = (Math.random() - 0.5) * 1;
let color = '#ffcc00';
particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
}
}

function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
for (let i = 0; i < particlesArray.length; i++) {
particlesArray[i].update();
}
requestAnimationFrame(animate);
}

init();
animate();
