//var enemyData = [];
var numEnemies = 10;
var boardWidth = 700;
var boardHeight = 500;
var enemyRadius = 20;

var svg = d3.select('.board').append('svg')
  .attr('width', boardWidth)
  .attr('height', boardHeight)
  .append('g');

var userData = [{x: boardWidth / 2, y: boardHeight / 2}];

var user = d3.select('svg')
  .selectAll('.user').data(userData)
  .enter()
  .append('circle')
  .attr('r', 10)
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('fill', 'white')
  .classed('user', true);

var drag = d3.behavior.drag()
  .on('drag', function(d, i) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
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
  var enemies = d3.select('svg').selectAll('.enemy').data(enemyData);

  // update enemy positions
  enemies.transition()
    .duration(1000)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });

  // adding enemies at location
  enemies.enter()
    .append('circle')
    .attr('r', enemyRadius)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('fill', 'red')
    .classed('enemy', true);

  //remove enemies
  enemies.exit().remove();
};

update();
setInterval(function() {
  update();
  //numEnemies++;
  }, 1000);

// numEnemies++;