const canvas = document.getElementById('canvas');
const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');

function clock() {
  const now = new Date();
  const ctx = canvas.getContext('2d');

  // Setup canvas
  ctx.save(); // save the default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // Put 0,0 in the middle
  ctx.rotate(-Math.PI / 2); // Rotate clock -90deg

  // Set default styles
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#f4f4f4';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // console.log(faceColor.value);

  // Draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.fillStyle = faceColor.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // Draw hour lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Draw minute lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // Get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // console.log(`${hr}:${min}:${sec}`);

  // Draw hour hand
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Draw min hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.restore();

  // Draw sec hand
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = secondHandColor.value;
  ctx.fillStyle = secondHandColor.value;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // restore default state

  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

document.getElementById('restore-btn').addEventListener('click', () => {
  localStorage.clear();
});

document.getElementById('save-btn').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'clock.png';
  link.href = dataURL;
  link.click();
});

// localStorage.clear();
window.addEventListener('load', (event) => {
  let currentFaceColor = localStorage.getItem('newFaceColor')
    ? localStorage.getItem('newFaceColor')
    : '#f4f4f4';
  faceColor.value = currentFaceColor;

  let currentBorderColor = localStorage.getItem('newBorderColor')
    ? localStorage.getItem('newBorderColor')
    : '#800000';
  borderColor.value = currentBorderColor;

  let currentLineColor = localStorage.getItem('newLineColor')
    ? localStorage.getItem('newLineColor')
    : '#000000';
  lineColor.value = currentLineColor;

  let currentLargeHandColor = localStorage.getItem('newLargeHandColor')
    ? localStorage.getItem('newLargeHandColor')
    : '#800000';
  largeHandColor.value = currentLargeHandColor;

  let currentSecondHandColor = localStorage.getItem('newSecondHandColor')
    ? localStorage.getItem('newSecondHandColor')
    : '#FF7F50';
  secondHandColor.value = currentSecondHandColor;
});

function setColor() {
  let setFaceColor = document.querySelector('#face-color').value;
  let setBorderColor = document.querySelector('#border-color').value;
  let setLineColor = document.querySelector('#line-color').value;
  let setLargeHandColor = document.querySelector('#large-hand-color').value;
  let setSecondHandColor = document.querySelector('#second-hand-color').value;

  localStorage.setItem('newFaceColor', setFaceColor);
  localStorage.setItem('newBorderColor', setBorderColor);
  localStorage.setItem('newLineColor', setLineColor);
  localStorage.setItem('newLargeHandColor', setLargeHandColor);
  localStorage.setItem('newSecondHandColor', setSecondHandColor);
}
