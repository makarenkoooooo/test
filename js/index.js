document.addEventListener("DOMContentLoaded", function () {
  // Инициализация Swiper с нужными параметрами
  var swiper = new Swiper(".swiper-container", {
    direction: "horizontal",
    loop: false,
    autoHeight: true, // Автоматическая высота слайдов
    slidesPerView: 1,
    spaceBetween: 0,
    allowTouchMove: false, // Отключаем возможность перелистывания свайпом
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: updateNavigation, // Обновляем навигацию при смене слайда
    },
  });

  // Установка начального состояния при загрузке страницы
  document.querySelector(".dropdown-selected").innerText = "Электродвигатели";
  showCategoryContent("content-electrodvigateli"); // Показать контент для электродвигателей

  // Навигация по главным ссылкам
  document.querySelectorAll(".nav-link").forEach((link, index) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      swiper.slideTo(index); // Переключение на соответствующий слайд
      updateNavigation(); // Обновляем состояние навигации
    });
  });

  // Обработчики кликов по категориям
  document.querySelectorAll(".equipment-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Получаем название категории
      const categoryTitle = this.querySelector(".equipment-title").innerText;

      // Словарь для соответствия названий категорий ID блоков контента
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

      const selectedContentId = categoryMap[categoryTitle];

      // Переход на слайд с каталогом
      swiper.slideTo(1); // Предполагается, что второй слайд - это каталог

      // Устанавливаем выбранный элемент в dropdown
      document.querySelector(".dropdown-selected").innerText = categoryTitle;

      // Отображаем нужный контент
      showCategoryContent(selectedContentId);

      // Обновляем высоту слайда
      swiper.updateAutoHeight();
    });
  });

  // Функция для показа нужного блока контента
  function showCategoryContent(categoryId) {
    // Скрываем все блоки
    document.querySelectorAll(".category-content").forEach((content) => {
      content.classList.remove("active");
    });

    // Показываем выбранный блок
    const selectedContent = document.getElementById(categoryId);
    if (selectedContent) {
      selectedContent.classList.add("active");
    }
  }

  // Обновление навигации при смене слайда
  function updateNavigation() {
    const activeIndex = swiper.activeIndex;
    const navItems = document.querySelectorAll(".nav-link");

    navItems.forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  updateNavigation(); // Инициализация навигации при загрузке страницы

  // Функционал для кнопки "Сотрудничество"
  document
    .querySelector(".toggle-contact-block")
    .addEventListener("click", function (event) {
      event.preventDefault();
      var contactBlock = document.querySelector(".contact-block");
      contactBlock.classList.toggle("visible");
    });

  // Обработчик кликов по лицензиям
  const licenseImages = document.querySelectorAll(".license-image");
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");

  licenseImages.forEach(function (image) {
    image.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImage.src = this.src;
    });
  });

  modal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  swiper.on("slideChange", function () {
    window.scrollTo(0, 0);
    updateNavigation();
  });

  // Селект
  document
    .querySelector(".dropdown-selected")
    .addEventListener("click", function () {
      this.parentElement.classList.toggle("active");
    });

  window.addEventListener("click", function (e) {
    if (!e.target.closest(".custom-dropdown")) {
      document.querySelector(".custom-dropdown").classList.remove("active");
    }
  });

  // Обработчик для выбора из селекта
  document.querySelectorAll(".dropdown-items li").forEach(function (item) {
    item.addEventListener("click", function () {
      const selectedCategory = this.innerText; // Получаем выбранную категорию
      document.querySelector(".dropdown-selected").innerText = selectedCategory; // Обновляем текст в селекте

      // Скрываем выпадающий список после выбора
      this.parentElement.classList.remove("show"); // Скрываем элементы списка
      this.parentElement.parentElement.classList.remove("active"); // Убираем активный класс у родителя

      // Логика для отображения соответствующего контента
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

      showCategoryContent(categoryMap[selectedCategory]); // Показываем соответствующий контент
      swiper.updateAutoHeight(); // Обновляем высоту слайда
    });
  });

  // Копирование номера телефона в буфер обмена при клике
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

  // Добавляем обработчики событий для элементов с номерами телефонов
  document.querySelectorAll(".phone-number").forEach((phone) => {
    phone.addEventListener("click", function () {
      copyPhoneNumber(phone);
    });
  });
});

document.querySelectorAll(".equipment-link.link-product").forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращает выполнение стандартного действия
    event.stopPropagation(); // Останавливает всплытие события
    // Если есть дополнительные действия, которые нужно предотвратить, можно добавить их сюда
  });
});
