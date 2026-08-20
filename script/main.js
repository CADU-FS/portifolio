document.addEventListener("DOMContentLoaded", () => loadScript(window.matchMedia('(max-width: 1024px)')));

const screenSize = window.matchMedia('(max-width: 1024px)');
screenSize.addEventListener('change', () => loadScript(window.matchMedia('(max-width: 1024px)')));

async function loadScript(screenSize) {
  if (screenSize.matches) {
    await import('./script.js');
    console.log('tablet')
  } else {
    await import('./cursor.js');
    console.log('pc')
  }
}