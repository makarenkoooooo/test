document.addEventListener("DOMContentLoaded", function () {
  // Инициализация Swiper с нужными параметрами
  var swiper = new Swiper(".swiper-container", {
    direction: "horizontal",
    loop: false,
    autoHeight: true,
    slidesPerView: 1,
    spaceBetween: 0,
    allowTouchMove: false,
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

  // Функция обновления навигации
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

  // Навигация по главным ссылкам
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Предотвращаем стандартное поведение

      const targetId = this.getAttribute("href");
      const slideIndex = this.getAttribute("data-slide");
      if (slideIndex === "0") {
        // Для ссылки "Главная" и "Каталог"
        if (this.textContent === "Главная") {
          // Если нажата ссылка "Главная"
          if (swiper.activeIndex !== 0) {
            // Если активен не первый слайд, переключаемся на первый слайд без прокрутки
            swiper.slideTo(0);
          }
        } else if (this.textContent === "Каталог") {
          // Если нажата ссылка "Каталог"
          if (swiper.activeIndex === 0) {
            // Если уже на первом слайде, просто прокручиваем к секции каталога
            document
              .querySelector("#category")
              .scrollIntoView({ behavior: "smooth" });
          } else {
            // Если на других слайдах, переключаемся на первый слайд и затем прокручиваем к каталогу
            swiper.slideTo(0);
            swiper.once("slideChangeTransitionEnd", function () {
              document
                .querySelector("#category")
                .scrollIntoView({ behavior: "smooth" });
            });
          }
        }
      } else if (slideIndex === "2") {
        // Для ссылки "Контакты" переключаемся на третий слайд
        swiper.slideTo(2);
      }
    });
  });

  // Обработчики кликов по категориям каталога
  document.querySelectorAll(".equipment-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Переход на второй слайд каталога
      swiper.slideTo(1);
      updateNavigation();

      // Получаем название категории из ссылки
      const categoryTitle = this.querySelector(".equipment-title").innerText;

      // Устанавливаем выбранный элемент в селекте
      document.querySelector(".dropdown-selected").innerText = categoryTitle;

      // Показать соответствующий контент
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

      showCategoryContent(categoryMap[categoryTitle]);
      swiper.updateAutoHeight();
    });
  });

  // Обработчики для селекта категорий
  document.querySelectorAll(".dropdown-items li").forEach(function (item) {
    item.addEventListener("click", function () {
      const selectedCategory = this.innerText;
      document.querySelector(".dropdown-selected").innerText = selectedCategory;
      this.parentElement.classList.remove("show"); // Скрываем элементы списка
      this.parentElement.parentElement.classList.remove("active"); // Убираем активный класс у родителя

      // Показать соответствующий контент
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

  // Функция для показа нужного блока контента
  function showCategoryContent(categoryId) {
    document.querySelectorAll(".category-content").forEach((content) => {
      content.classList.remove("active");
    });

    const selectedContent = document.getElementById(categoryId);
    if (selectedContent) {
      selectedContent.classList.add("active");
    }
  }

  updateNavigation(); // Инициализация навигации при загрузке страницы

  // Добавьте другие функции, которые могут быть необходимы

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

// модалка сертификата

document.querySelectorAll(".certificate-lang").forEach(function (element) {
  element.addEventListener("click", function () {
    // Получаем название сертификата (например, RUS или KAZ)
    const lang = this.textContent;

    // Здесь можно задать путь к изображению сертификата в зависимости от языка
    // Например, пусть это будут файлы cert-rus.jpg и cert-kaz.jpg
    const imagePath =
      lang === "RUS"
        ? "./assets/sertificate/sert-1.png"
        : "./assets/sertificate/sert-1.png";

    // Устанавливаем изображение в модальное окно
    document.getElementById("modal-image").src = imagePath;

    // Показываем модальное окно и затемняющий фон
    document.getElementById("modal-overlay").style.display = "block";
    document.getElementById("modal").style.display = "block";
  });
});

// Закрытие модального окна при клике на затемняющий фон
document.getElementById("modal-overlay").addEventListener("click", function () {
  document.getElementById("modal-overlay").style.display = "none";
  document.getElementById("modal").style.display = "none";
});

// форма битрикс

const formBtn = document.querySelector(".customBitrixButton");
const form = document.querySelector(".container-form");
const closeButton = document.querySelector(".close-button");

formBtn.addEventListener("click", function () {
  form.classList.add("active");
});

closeButton.addEventListener("click", function () {
  form.classList.remove("active");
});

function openBitrixForm() {
  const formContainer = document.querySelector(".container-form");
  formContainer.classList.add("active");
}
