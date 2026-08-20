document.addEventListener("DOMContentLoaded", () => {
  const torchBtn = document.getElementById('torchBtn');
  const imageContainer = document.getElementById('dynamicImage');

  if (torchBtn) {
    torchBtn.addEventListener('click', () => {
      imageContainer.classList.toggle('lit-up');
      torchBtn.classList.toggle('lit-up');
    });
  }
});