document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel-container");
  const track = document.querySelector(".carousel-track");
  const items = document.querySelectorAll(".carousel-item");

  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth;
  const gap = 16; // 1rem gap
  const visibleItems = 2;
  const totalItems = items.length;

  // Función para mover el carrusel
  function moveCarousel() {
    currentIndex = (currentIndex + 1) % (totalItems - visibleItems + 1);
    const offset = currentIndex * (itemWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
  }

  // Iniciar el carrusel automático cada 5 segundos
  let interval = setInterval(moveCarousel, 5000);

  // Pausar el carrusel cuando el usuario interactúa con él
  carousel.addEventListener("mouseenter", () => {
    clearInterval(interval);
  });

  // Reanudar el carrusel cuando el usuario deja de interactuar
  carousel.addEventListener("mouseleave", () => {
    interval = setInterval(moveCarousel, 5000);
  });

  // Manejar el scroll manual
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    carousel.style.cursor = "grabbing";
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.style.cursor = "grab";
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.style.cursor = "grab";
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Ajustar el carrusel al tamaño de la ventana
  function adjustCarousel() {
    const containerWidth = carousel.offsetWidth;
    const newItemWidth = containerWidth / visibleItems - gap;

    items.forEach((item) => {
      item.style.width = `${newItemWidth}px`;
    });

    // Actualizar el ancho del track
    track.style.width = `${(newItemWidth + gap) * totalItems}px`;
  }

  // Ajustar al cargar y al cambiar el tamaño de la ventana
  adjustCarousel();
  window.addEventListener("resize", adjustCarousel);
});
