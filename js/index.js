document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".industry-grid");
  let isDown = false;
  let startX;
  let scrollLeft;

  // Автоматическая прокрутка (если требуется)
  let autoScroll = setInterval(() => {
    if (window.innerWidth < 500) {
      slider.scrollBy({
        left: slider.clientWidth,
        behavior: "smooth",
      });

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0;
      }
    }
  }, 3000); // Прокрутка каждые 3 секунды

  // Прокрутка мышью
  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    clearInterval(autoScroll); // Остановка автоматической прокрутки
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; // Скорость прокрутки
    slider.scrollLeft = scrollLeft - walk;
  });

  // Прокрутка пальцем (для сенсорных экранов)
  slider.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    clearInterval(autoScroll); // Остановка автоматической прокрутки
  });

  slider.addEventListener("touchend", () => {
    isDown = false;
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // Скорость прокрутки
    slider.scrollLeft = scrollLeft - walk;
  });
});
