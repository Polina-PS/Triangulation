var canvas = document.getElementById('cl')
var ctx = canvas.getContext("2d");

const stations = [{
    "id": 1,
    "x": 200,
    "y": 150,
    "r": 120
  },
  {
    "id": 2,
    "x": 200,
    "y": 300,
    "r": 120
  },
  {
    "id": 3,
    "x": 350,
    "y": 300,
    "r": 120
  },
  {
    "id": 4,
    "x": 350,
    "y": 150,
    "r": 120
  }];

const stationIds = [[1, 4], [2, 4], [1, 2, 3, 4]]
let newStations = []
let allIntersections = []

//рисование станций
function triangulation(x, y, r) {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.arc(x, y, r, 0, 2*Math.PI, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.arc(x, y, 10, 0, 2*Math.PI, false);
  ctx.fillStyle="black";
  ctx.stroke();
  ctx.fill();
}

//перебор значений всех станций
function createStations() {
  for (let i = 0; (i+1) <= stations.length; i++) {
    triangulation(stations[i].x, stations[i].y, stations[i].r);
  }
}

//определение массива елементов всех пересечений
function elementsOfIntersection() {
  for (let k = 0; (k+1) <= stationIds.length; k++) {
    for (let m = 0; (m+1) <= stationIds[k].length; m++) {
      let numStation = (stationIds[k][m])-1;
      newStations.push(stations[numStation]);
    }
    ctx.restore();
    drawIntersection(newStations, k);
    ctx.restore();
    newStations = [];
  }
}

//выделение пересечения
function drawIntersection(elements, num) {
  for (let j = 0; (j+1) <= elements.length; j++) {
    ctx.beginPath();
    ctx.arc(elements[j].x, elements[j].y, elements[j].r, 0, Math.PI * 2, false);
    if ((j+1) == elements.length) {
      
      ctx.fillStyle = getColor(num);
      ctx.fill();
      ctx.restore();
    }
    ctx.save();
    ctx.clip();
  }
}

//цвет пересечения от #000 до #fff, повторяется через каждые 16 пересечений
function getColor(num) {
  if ((num%16) < 10) {
    n = num%16;
  }
  else if ((num%16) <= 15) {
    num = num%16 - 10 + 97;
    n = String.fromCharCode(num);
  }
  let color = '#'+n+n+n;

  return color;
}

createStations()
elementsOfIntersection()