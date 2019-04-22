import { easing } from './easing';
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

function drawProgressBar(progress) {
  let progressBarWidth = 1200;
  let progressBarHeight = 140;
  let startPos = { x: -progressBarWidth / 2, y: -progressBarHeight / 2 }

  // ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#007aff';
  ctx.fillRect(
    startPos.x,
    startPos.y,
    progressBarWidth * progress,
    progressBarHeight
  );

  ctx.globalCompositeOperation = 'xor';
  ctx.font = "140px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = 'middle';
  ctx.fillText(parseInt(progress * 100) + '%', 0, 0);
}

const dur = 5000;
let startTime = new Date().getTime();
let pass = 0;
let progress = 0;

function tick() {
  let pass = new Date().getTime() - startTime;
  pass = Math.min(pass, dur);
  progress = pass / dur;

  if (progress < 1) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.save();
    ctx.translate(cvs.width / 2, cvs.height / 2);
    drawProgressBar(easing.linear(progress));
    ctx.restore();

    requestAnimationFrame(tick);
  }
}

tick();