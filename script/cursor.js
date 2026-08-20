const cursor = document.getElementById('flame-cursor');
const cursorLighting = document.getElementById('flame-lighting');
const imageMask = document.getElementById('svg-image-mask');

const responseFlame = await fetch('../assets/flame.svg');
const responseFlameLighting = await fetch('../assets/flame-lighting.svg');
const responseFlameMask = await fetch('../assets/flame-mask.svg');

const flameSvg = await responseFlame.text();
const flameLightingSvg = await responseFlameLighting.text();
const flameMaskSvg = await responseFlameMask.text();

cursor.innerHTML = flameSvg;
cursorLighting.innerHTML = flameLightingSvg;
imageMask.innerHTML = flameMaskSvg;

const flameGroup = document.getElementById('flame-group');
const lightingGroup = document.getElementById('lighting-group');
const maskMover = document.getElementById('mask-mover');
const dynamicImage = document.getElementById('dynamicImage');

let mouseX = 0, mouseY = 0;
let flameCurrentX = 0, flameCurrentY = 0;
let prevX = 0, prevY = 0;
let currentTiltFlameX = 0, currentTiltFlameY = 0;
let currentTiltMaskX = 0, currentTiltMaskY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  flameCurrentX += (mouseX - flameCurrentX) * 0.2;
  flameCurrentY += (mouseY - flameCurrentY) * 0.2;

  cursor.style.left = `${flameCurrentX}px`;
  cursor.style.top = `${flameCurrentY}px`;
  cursorLighting.style.left = `${flameCurrentX}px`;
  cursorLighting.style.top = `${flameCurrentY}px`;

  const velocityX = mouseX - prevX;
  const velocityY = mouseY - prevY;
  prevX = mouseX;
  prevY = mouseY;

  const targetTiltX = Math.max(-65, Math.min(65, velocityX * -10.8));
  const targetTiltY = Math.max(-35, Math.min(35, velocityY * -10.8));

  const diffX = (targetTiltX - currentTiltFlameX);
  const diffY = (targetTiltY - currentTiltFlameY);

  const EPSILON = 0.01;

  if (Math.abs(diffX) > EPSILON || Math.abs(diffY) > EPSILON) {
  
    currentTiltFlameX += diffX * 0.1;
    currentTiltFlameY += diffY * 0.9;
    currentTiltMaskX += diffX * 0.1;
    currentTiltMaskY += diffY * 0.1;

    const distortionStringFlame = `rotate(${currentTiltFlameX}deg) skew(${currentTiltFlameX * 0.5}deg) scaleX(${1 - ((currentTiltFlameY * 0.5) / 100 * -1)}) scaleY(${1 - currentTiltFlameY / 100})`;

    const distortionStringMask = `rotate(${currentTiltMaskX}deg) skew(${currentTiltMaskX * 0.5}deg) scaleX(${1 - ((currentTiltMaskY * 0.5) / 100 * -1)}) scaleY(${1 - currentTiltMaskY * 0.7 / 100})`;

    const distortionStringMover = `rotate(${currentTiltMaskX * 0.5}deg) scaleX(${1 - ((currentTiltMaskY * 0.5) / 100 * -1)}) scaleY(${1 - currentTiltMaskY * 2 / 100})`;
    
    flameGroup.style.transform = distortionStringFlame;
    lightingGroup.style.transform = distortionStringMover;

    if (dynamicImage && maskMover) {
      const rect = dynamicImage.getBoundingClientRect();
      
      const maskX = flameCurrentX - rect.left;
      const maskY = flameCurrentY - rect.top - 15;

      maskMover.style.transform = `translate(${maskX}px, ${maskY}px) ${distortionStringMask}`;
    }

  } else {
    if (currentTiltMaskX !== targetTiltX || currentTiltMaskY !== targetTiltY) {
      currentTiltFlameX = targetTiltX;
      currentTiltFlameY = targetTiltY;
      currentTiltMaskX = targetTiltX;
      currentTiltMaskY = targetTiltY;
      
      const distortionStringFlame = `rotate(${currentTiltFlameX}deg) skew(${currentTiltFlameX * 0.5}deg) scaleX(${1 - ((currentTiltFlameY * 0.5) / 100 * -1)}) scaleY(${1 - currentTiltFlameY / 100})`;

      const distortionStringMask = `rotate(${currentTiltMaskX}deg) skew(${currentTiltMaskX * 0.5}deg) scaleX(${1 - ((currentTiltMaskY * 0.5) / 100 * -1)}) scaleY(${1 - currentTiltMaskY * 0.7 / 100})`;

      const distortionStringMover = `rotate(${currentTiltMaskX * 0.6}deg) scaleX(${1 - ((currentTiltMaskY * 0.3) / 100 * -1)}) scaleY(${1 - currentTiltMaskY * 0.7 / 100})`;
      
      flameGroup.style.transform = distortionStringFlame;
      lightingGroup.style.transform = distortionStringMover;

      if (dynamicImage && maskMover) {
        const rect = dynamicImage.getBoundingClientRect();
        
        const maskX = flameCurrentX - rect.left;
        const maskY = flameCurrentY - rect.top - 15;

        maskMover.style.transform = `translate(${maskX}px, ${maskY}px) ${distortionStringMask}`;
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();