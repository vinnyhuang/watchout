//var enemyData = [];
var numEnemies = 10;
var boardWidth = 700;
var boardHeight = 500;
var enemyRadius = 20;
var userRadius = 10;
var collision = false;
var rotation = 0;

// Scoreboard
var collisionCount = 0;
var highScore = 0;
var currentScore = 0;


var svg = d3.select('.board').append('svg')
  .attr('width', boardWidth)
  .attr('height', boardHeight)
  .append('defs')
  .append('pattern')
  .attr('id', 'shuriken')
  .attr('width', 40)
  .attr('height', 40)
  .append('image')
  //.attr('x', 0)
  //.attr('y', 0)
  .attr('width', 40)
  .attr('height', 40)
  .attr('xlink:href', 'spinningShuriken.gif-c200');
  //.attr('xlink:href', 'Shuriken2.png');
  //.attr('xlink:href', 'asteroid.png');
  
d3.select('svg').append('g');

var userData = [{x: boardWidth / 2, y: boardHeight / 2}];

var user = d3.select('svg')
  .selectAll('.user').data(userData)
  .enter()
  .append('circle')
  .attr('r', userRadius)
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('fill', 'blue')
  .classed('user', true);

var drag = d3.behavior.drag()
  .on('drag', function(d, i) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    if (d.x < userRadius) {
      d.x = userRadius;
    } else if (d.x > boardWidth - userRadius) {
      d.x = boardWidth - userRadius;
    }
    if (d.y < userRadius) {
      d.y = userRadius;
    } else if (d.y > boardHeight - userRadius) {
      d.y = boardHeight - userRadius;
    }

    d3.select(this).attr('cx', d.x)
    .attr('cy', d.y);
  });

d3.select('.user').call(drag);

var update = function() {
  // generate new enemy location data by random
  enemyData = [];
  for (var i = 0; i < numEnemies; i++) {
    enemyData[i] = ({
      x: (Math.random() * (boardWidth - 2 * enemyRadius) + enemyRadius) + 'px',
      y: (Math.random() * (boardHeight - 2 * enemyRadius) + enemyRadius) + 'px'
    });
  }

  // creating the updateSelection
  var enemies = d3.select('g').selectAll('.enemy').data(enemyData);

  // update enemy positions
  enemies.transition()
    .duration(1000)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
  // In order to rotate, use transform: translate + rotate.


  // adding enemies at location
  enemies.enter()
    .append('circle')
    .attr('r', enemyRadius)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    //.attr('fill', 'red')
    .attr('fill', 'url(#shuriken)')
    .classed('enemy', true);

  //remove enemies
  enemies.exit().remove();
};

update();

setInterval(function() {
  update();
  //numEnemies++;
}, 1000);


setInterval(function() {
  currentScore++;
  d3.select('.current').select('span')
    .text(currentScore);
  //numEnemies = 10 + Math.floor(currentScore / 100);
}, 100);
// numEnemies++;

var checkCollision = function() {
  //var before = collision;
  var hasCollision = false;
  var userX = d3.select('.user').datum().x;
  var userY = d3.select('.user').datum().y;
// animVal - animated value
// reference value
  var enemies = d3.select('svg').selectAll('.enemy');

  for (var i = 0; i < numEnemies; i++) {
    var enemyX = enemies[0][i].cx.animVal.value;
    var enemyY = enemies[0][i].cy.animVal.value;

    var dist = Math.pow(Math.pow(enemyY - userY, 2) + Math.pow(enemyX - userX, 2), 0.5); 
    //pythagorean theorem to find distance

    if (dist < enemyRadius + userRadius) {
      hasCollision = true;
    }
  }

  if (hasCollision && !collision) {
    console.log('you lose');
    collision = true;
    collisionCount++;
    if (highScore < currentScore) {
      highScore = currentScore;
    }
    currentScore = 0;
    d3.select('.highscore').select('span')
      .text(highScore);
    d3.select('.current').select('span')
      .text(currentScore);
    d3.select('.collisions').select('span')
      .text(collisionCount);
    d3.select('.board')
      .style('background-color', 'red');
  } else if (!hasCollision && collision) {
    collision = false;
    d3.select('.board')
      .style('background-color', '#FBEC5D');
  }
};

setInterval(checkCollision, 30);

/*setInterval(function() {
  d3.select('svg').selectAll('.enemy')
    .style('transform-origin', function(d) {
      return '' + this.cx.animVal.value + ' ' + this.cy.animVal.value;
    });
}, 200);*/
