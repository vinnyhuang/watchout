// start slingin' some d3 here.

//var boardWidth and height

var enemyData = [];
var numEnemies = 4;
var boardWidth = 700;
var boardHeight = 500;
var enemyRadius = 50;

for (var i = 0; i < numEnemies; i++) {
  enemyData.push({x: (Math.random() * (boardWidth - 2 * enemyRadius) + enemyRadius) + 'px',
                  y: (Math.random() * (boardHeight - 2 * enemyRadius) + enemyRadius) + 'px'});
}

var svg = d3.select('.board').append('svg')
  .attr('width', boardWidth)
  .attr('height', boardHeight)
  .append('g');

var enemies = d3.select('svg').selectAll('circle').data(enemyData);
enemies.enter()
  .append('circle')
  .attr('r', enemyRadius)
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('fill', 'red');