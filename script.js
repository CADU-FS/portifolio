document.addEventListener("DOMContentLoaded", () => {

  // Tablet Interaction (Flashlight Button)
  const torchBtn = document.getElementById('torchBtn');
  const imageContainer = document.getElementById('dynamicImage');

  if (torchBtn) {
    torchBtn.addEventListener('click', () => {
      // Toggles the 'lit-up' class that lightens or darkens the image in CSS.
      imageContainer.classList.toggle('lit-up');
    });
  }

  /*
    window.addEventListener('mousemove', (e) => {
      if (window.innerWidth > 1024) { 
        let x = e.clientX;
        let y = e.clientY;
      }
    });
  */

});