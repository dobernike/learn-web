'use strict';

var ScreenSize = {
    WIDTH: 800,
    HEIGHT: 600
};

var getRandomValue = function (min, max) {
    return Math.random() * (max - min) + min;
};

var Raindrop = function () {
    this._reset();
};

Raindrop.prototype.render = function (ctx) {
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.size, this.y - this.size);
    ctx.closePath();
    ctx.stroke();
};

Raindrop.prototype.update = function () {
    this.x += this.hVelocity;
    this.y += this.velocity;

    if (this.isOffscreen()) {
        this._reset();
    }
}

Raindrop.prototype.isOffscreen = function () {
    return this.y > ScreenSize.HEIGHT + this.size ||
        this.x > ScreenSize.WIDTH + this.size ||
        this.x < -this.size;
}

Raindrop.prototype._reset = function () {
    this.size = getRandomValue(1, 6);

    this.x = getRandomValue(-ScreenSize.WIDTH * 0.3, ScreenSize.WIDTH * 1.6);
    this.y = getRandomValue(0, ScreenSize.HEIGHT);

    this.velocity = this.size;
    this.hVelocity = -this.size / 3;
};

var Cucumber = function () {
    Raindrop.call(this);
}

Cucumber.prototype = Object.create(Raindrop.prototype);

Cucumber.prototype.render = function (ctx) {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size, this.size * 3, this.angle, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

Cucumber.prototype.update = function () {
    Raindrop.prototype.update.call(this);
    this.angle += 0.01;
}

Cucumber.prototype._reset = function () {
    Raindrop.prototype._reset.call(this);
    this.angle = getRandomValue(0, Math.PI * 2);
}

var cleanupFrame = function (ctx) {
    ctx.clearRect(0, 0, ScreenSize.WIDTH, ScreenSize.HEIGHT);
};

var renderFrame = function (ctx, raindrops) {
    cleanupFrame(ctx);

    raindrops.forEach(function (it) {
        it.render(ctx);
        it.update();
    });

    requestAnimationFrame(renderFrame.bind(null, ctx, raindrops));
};

var setup = function () {
    var DROPS = 600;
    var CUCUMBER_RATIO = 0.2;
    var canvas = document.querySelector('#playground');
    var ctx = canvas.getContext('2d');

    canvas.width = ScreenSize.WIDTH;
    canvas.height = ScreenSize.HEIGHT;

    var raindrops = new Array(DROPS)
        .fill('')
        .map(function () {
            return new Raindrop();
        })
        .concat(new Array(DROPS * CUCUMBER_RATIO)
            .fill('')
            .map(function () {
                return new Cucumber();
            })
        );
    renderFrame(ctx, raindrops);
};

setup();