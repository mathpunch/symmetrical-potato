const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    color: 'red'
};

let bots = [];
const botCount = 5; // Number of bots

// Create bots
for (let i = 0; i < botCount; i++) {
    bots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20,
        color: 'blue',
        speed: 1 + Math.random() * 2 // Random speed for each bot
    });
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawBots() {
    bots.forEach(bot => {
        ctx.fillStyle = bot.color;
        ctx.fillRect(bot.x, bot.y, bot.size, bot.size);
    });
}

function updateBots() {
    bots.forEach(bot => {
        // Simple AI behavior: move towards the player
        if (bot.x < player.x) {
            bot.x += bot.speed;
        } else {
            bot.x -= bot.speed;
        }

        if (bot.y < player.y) {
            bot.y += bot.speed;
        } else {
            bot.y -= bot.speed;
        }

        // Keep bots within canvas bounds
        if (bot.x < 0) bot.x = 0;
        if (bot.x > canvas.width - bot.size) bot.x = canvas.width - bot.size;
        if (bot.y < 0) bot.y = 0;
        if (bot.y > canvas.height - bot.size) bot.y = canvas.height - bot.size;
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBots();
    updateBots();
    requestAnimationFrame(update);
}

update();
