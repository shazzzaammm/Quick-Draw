class MouseStroke {
  constructor(x, y, w, c) {
    this.history = [{ x: x, y: y }];
    this.w = w;
    this.c = c;
  }
  addPoint(x, y) {
    this.history.push({ x: x, y: y });
  }

  display() {
    noFill();
    stroke(this.c.r, this.c.g, this.c.b);
    strokeWeight(this.w);
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      vertex(this.history[i].x, this.history[i].y);
    }
    endShape();
  }
}

class GameState {
  constructor() {
    this.choosing = true;
    this.drawing = false;
    this.ending = false;
    this.endTimer = 60 * 5;
    this.drawTimer = 60 * 20;
  }
}

let drawHistory = [];
const lineWidth = 10;
const color = { r: 0, g: 0, b: 0 };
let state = new GameState();
const drawOptions = [
  "Apple",
  "Airplane",
  "Alarm Clock",
  "Ambulance",
  "Bat",
  "Baseball",
  "Cake",
  "Calculator",
  "Camera",
  "Castle",
  "Cat",
  "Cloud",
  "Eye",
  "Fish",
  "Grapes",
  "Laptop",
  "Paintbrush",
  "Pineapple",
  "Rainbow",
  "Strawberry",
  "Sun",
  "Star",
  "Skull",
  "Table",
  "Triangle",
];
let topic;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  reset();
}

function draw() {
  if (state.drawing && state.drawTimer > 0) {
    background(230);
    drawHistory.forEach((n) => {
      n.display();
    });
    noStroke();
    fill(0);
    textSize(width / 30);
    text(`${topic} ${floor(state.drawTimer / 60)}`, width / 2, width / 30);
    state.drawTimer--;
  } else if (state.drawing && state.drawTimer <= 0) {
    startEnding();
  } else if (state.choosing) {
    background(255);
    fill(0);
    stroke(0);
    strokeWeight(1);
    textSize(width / 20);
    textAlign(CENTER, CENTER);
    text(`You will be drawing a ${topic}`, width / 2, height / 2);
    textSize(width / 30);
    text(`Click to start`, width / 2, (height / 4) * 3);
  } else if (state.ending && state.endTimer > 0) {
    background(220);
    drawHistory.forEach((n) => {
      n.display();
    });
    state.endTimer--;
  } else if (state.endTimer <= 0) {
    reset();
  }
}

function mouseDragged() {
  if (state.drawing)
    drawHistory[drawHistory.length - 1].addPoint(mouseX, mouseY);
}

function mousePressed() {
  if (state.drawing) {
    drawHistory.push(new MouseStroke(mouseX, mouseY, lineWidth, color));
  } else if (state.choosing) {
    state.choosing = false;
    state.drawing = true;
  }
}

function mouseReleased() {
  if (state.drawing && drawHistory[drawHistory.length - 1].history.length < 2) {
    drawHistory.pop();
  }
}

function keyPressed() {
  if (state.drawing && keyIsDown(17) && keyIsDown(90)) {
    drawHistory.pop();
  }
  if (state.drawing && keyIsDown(32)) {
    startEnding();
  }
}

function reset() {
  state = new GameState();
  topic = drawOptions[Math.floor(Math.random() * drawOptions.length)];
  drawHistory = [];
}

function startEnding() {
  state.drawing = false;
  state.ending = true;
}
