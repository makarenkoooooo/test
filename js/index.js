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
});

// модалка сертификата

function openModal(certNumber, lang) {
  let imagesContainer = document.getElementById("certificateImages");
  imagesContainer.innerHTML = ""; // Очищаем предыдущие изображения

  let images = [];

  if (certNumber === "9001") {
    if (lang === "rus") {
      images = ["Сертификат-9001-рус-1.png", "Сертификат-9001-рус-2.png"];
    } else if (lang === "kaz") {
      images = ["Сертификат-9001-каз-1.png", "Сертификат-9001-каз-2.png"];
    }
  } else if (certNumber === "14001") {
    if (lang === "rus") {
      images = ["Сертификат-14001-рус-1.png", "Сертификат-14001-рус-2.png"];
    } else if (lang === "kaz") {
      images = ["Сертификат-14001-каз-1.png", "Сертификат-14001-каз-2.png"];
    }
  } else if (certNumber === "45001") {
    if (lang === "rus") {
      images = ["Сертификат-45001-рус-1.png", "Сертификат-45001-рус-2.png"];
    } else if (lang === "kaz") {
      images = ["Сертификат-45001-каз-1.png", "Сертификат-45001-каз-2.png"];
    }
  } else if (certNumber === "Ozen") {
    if (lang === "rus") {
      images = ["ozen.png"];
    }
  } else if (certNumber === "ManTrade") {
    if (lang === "rus") {
      images = ["ТОО-Man-Trade-1.png"];
    }
  } else if (certNumber === "Samson") {
    if (lang === "rus") {
      images = ["Samson.png"];
    }
  }

  images.forEach((image) => {
    let imgElement = document.createElement("img");
    imgElement.src = "./assets/sertificate/" + image;
    imagesContainer.appendChild(imgElement);
  });

  document.getElementById("certificateModal").style.display = "block";
}

function closeModal() {
  document.getElementById("certificateModal").style.display = "none";
}

window.onclick = function (event) {
  let modal = document.getElementById("certificateModal");
  if (event.target === modal) {
    closeModal();
  }
};

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

document
  .querySelector(".dropdown-selected")
  .addEventListener("click", function () {
    console.log("Dropdown clicked");
    this.parentElement.classList.toggle("active");
  });
