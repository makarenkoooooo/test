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

// кнопка контактов выплывающая

document
  .querySelector(".toggle-contact-block")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    var contactBlock = document.querySelector(".contact-block");
    contactBlock.classList.toggle("visible"); // Переключаем класс visible
  });

// Функция для копирования текста конкретного номера телефона в буфер обмена
function copyPhoneNumber(element) {
  var phoneNumber = element.textContent; // Получаем текст номера телефона
  navigator.clipboard.writeText(phoneNumber).then(
    function () {
      alert("Номер скопирован: " + phoneNumber); // Показываем уведомление об успешном копировании
    },
    function (err) {
      console.error("Ошибка при копировании текста: ", err); // Показываем ошибку в случае неудачи
    }
  );
}

// select

// Обработчики событий для меню
document.querySelectorAll(".nav-link").forEach((link, index) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение ссылок
    swiper.slideTo(index); // Переключаемся на соответствующий слайд
  });
});

document
  .querySelector(".dropdown-selected")
  .addEventListener("click", function () {
    this.parentElement.classList.toggle("active");
  });

document.querySelectorAll(".dropdown-items li").forEach(function (item) {
  item.addEventListener("click", function () {
    document.querySelector(".dropdown-selected").innerText = this.innerText;
    this.parentElement.parentElement.classList.remove("active");
  });
});

// Закрытие списка при клике вне его
window.addEventListener("click", function (e) {
  if (!e.target.closest(".custom-dropdown")) {
    document.querySelector(".custom-dropdown").classList.remove("active");
  }
});

// category

// Функция для показа нужного блока контента
function showCategoryContent(categoryId) {
  // Скрываем все блоки
  document.querySelectorAll(".category-content").forEach(function (content) {
    content.classList.remove("active");
  });

  // Показываем выбранный блок
  const selectedContent = document.getElementById(categoryId);
  if (selectedContent) {
    selectedContent.classList.add("active");
  }
}

// Устанавливаем начальное значение при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  showCategoryContent("content-electrodvigateli"); // Изначально показываем Электродвигатели
});

// Обработчик события клика на выбранный элемент
document
  .querySelector(".dropdown-selected")
  .addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("show"); // Показать/скрыть элементы списка
  });

// Обработчик выбора элемента из списка
document.querySelectorAll(".dropdown-items li").forEach(function (item) {
  item.addEventListener("click", function () {
    const selectedCategory = this.innerText; // Получаем выбранную категорию
    document.querySelector(".dropdown-selected").innerText = selectedCategory; // Обновляем текст в селекте
    this.parentElement.classList.remove("show"); // Скрываем список

    // Обновляем контент в зависимости от выбранной категории
    const categoryMap = {
      Электродвигатели: "content-electrodvigateli",
      "Частотные преобразователи": "content-chastotnye-preobrazovateli",
      "Фильтровальное оборудование": "content-filtr-oborudovanie",
      "Насосные оборудования": "content-nasosnye-oborudovaniya",
      "Силовая автоматика": "content-silovaya-avtomatika",
      "Конвейерное оборудование": "content-konveyernoe-oborudovanie",
      Газоочистка: "content-gazoochistka",
      Гидроцилиндры: "content-gidrotsilindry",
      Флотация: "content-flotaciya",
      Металлопрокат: "content-metalloprokat",
    };

    showCategoryContent(categoryMap[selectedCategory]);

    swiper.updateAutoHeight();
  });
});

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    swiper.slideTo(index); // Переключаемся на соответствующий слайд

    // Удаляем класс активного состояния у всех ссылок
    navLinks.forEach((link) => link.classList.remove("active"));

    // Добавляем класс активного состояния к текущей ссылке
    link.classList.add("active");
  });
});

swiper.on("slideChange", () => {
  navLinks.forEach((link) => link.classList.remove("active"));
  navLinks[swiper.activeIndex].classList.add("active");
});

// Закрытие списка при клике вне его
window.addEventListener("click", function (e) {
  if (!e.target.closest(".custom-dropdown")) {
    document.querySelector(".dropdown-items").classList.remove("show");
  }
});

function setupDropdownListeners() {
  const dropdownItems = document.querySelectorAll(".dropdown-items li");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Ваш код для отображения связанного контента
    });
  });
}

// Вызовите эту функцию при каждом изменении контента
setupDropdownListeners();
