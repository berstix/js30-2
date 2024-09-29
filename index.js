let quotes = [];
let currentLanguage = 'en'; // Текущий язык по умолчанию
let currentAuthor = 'authorEn'; // Текущий автор по умолчанию

// Функция для загрузки данных из JSON-файла
function loadQuotes() {
  return fetch('quotes.json') // Загружаем JSON-файл
    .then(response => response.json()) // Преобразуем его в объект
    .then(data => {
      quotes = data; // Сохраняем массив цитат
      updateQuote(); // Показываем первую случайную цитату после загрузки
    })
    .catch(error => console.error('Ошибка при загрузке цитат:', error));
}

// Функция для получения случайной цитаты
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// Функция для обновления цитаты, картинки и фона
function updateQuote() {
  const quoteObj = getRandomQuote();
  
  // Обновляем текст цитаты и автора в зависимости от выбранного языка
  document.getElementById('quote').textContent = quoteObj[currentLanguage];
  document.getElementById('author').textContent = quoteObj[currentAuthor];

  // Анимация смены изображения
  const imageElement = document.getElementById('quote-image');
  imageElement.style.opacity = 0; // Сначала делаем картинку прозрачной

  setTimeout(() => {
    imageElement.src = quoteObj.image; // Меняем источник картинки
    imageElement.style.opacity = 1; // Возвращаем картинку
  }, 200); // Время ожидания до смены картинки

  // Меняем цвет фона
  document.body.style.backgroundColor = quoteObj.bgColor; 
}

// Функция для изменения языка
function changeLanguage(event) {
  currentLanguage = event.target.value;

  // Также меняем автора в зависимости от выбранного языка
  if (currentLanguage === 'en') {
    currentAuthor = 'authorEn';
  } else if (currentLanguage === 'ru') {
    currentAuthor = 'authorRu';
  }
  updateQuote(); // Обновляем цитату и автора при смене языка
}

// Обработчик для кнопки смены цитаты
document.getElementById('change-quote').addEventListener('click', updateQuote);

// Обработчик для смены языка
document.getElementById('language-selector').addEventListener('change', changeLanguage);

// При загрузке страницы загружаем цитаты из JSON
window.onload = loadQuotes;