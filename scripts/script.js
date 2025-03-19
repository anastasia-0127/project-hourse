'use strict'

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт отработал корректно')
});

// Переменная, которая хранит текущий индекс первой карточки, отображаемой в слайдере. Изначально она равна 0, что означает, что первая карточка будет видна.
let currentIndex = 0; 

//Объявляем переменную slider и сохраняем в нее все элементы на странице с классом gallery__item
const slider = document.querySelectorAll(".gallery__item");

// объявляем переменную prevButton и сохраняем в нее кнопку для перехода к предыдущей группе карточек
const prevButton = document.querySelector(".gallery__left");

// объявляем переменную nextButton и сохраняем в нее кнопку для перехода к следующей группе карточек
const nextButton = document.querySelector(".gallery__right");

//объявлем переменную для хранения количества отображаемых карточек
const visibleCards = 4;

// Вызываем функцию updateSlider() для первоначальной настройки отображения карточек. 
updateSlider();

//Для кнопки «предыдущий» добавляем обработчик события клика по этой кнопке:
prevButton.addEventListener("click", () => {
    // Если индекс у карточки (currentIndex) больше 0, то уменьшаем его на 1, чтобы показать предыдущую карточку.
    if (currentIndex > 0) {
        currentIndex--;
    }
    // Иначе переход к последним карточкам, если мы уже находимся на первой 
    else {
        currentIndex = slider.length - visibleCards;
    }
    //Теперь нужно обновить отображение карточек на экране, вызвав функцию updateSlider:
    updateSlider();
});

// Для кнопки «следующий» добавляем обработчик события клика по этой кнопке:
nextButton.addEventListener("click", () => {
    // Если индекс у карточки (currentIndex) меньше, чем индекс первой карточки в последней группе, то мы можем увеличить currentIndex на 1 и перейти к следующей карточке
    if (currentIndex < slider.length - visibleCards) {
        currentIndex++;
    }
    // Иначе если индекс у карточки (currentIndex) больше 0, то уменьшаем его на 1, чтобы показать предыдущую карточку.
    else {
        currentIndex = 0; // Переход к началу карточек
    }
   //Теперь нужно обновить отображение карточек на экране, вызвав функцию updateSlider:
    updateSlider();
});

// Создаем функцию, которая отвечает за обновление отображения карточек в слайдере
function updateSlider() {
    // Проходим по каждому элементу массива slider с помощью цикла forEach. Внутри функции 2 переменные: item – текущая карточка, а index — его индекс в массиве.
    slider.forEach((item, index) => {
        // Проверяем, нужно ли показывать карточку (находится ли индекс карточки в пределах видимых карточек?)
	// Если индекс карточки находится в пределах видимых карточек:
        if (index >= currentIndex && index < currentIndex + visibleCards) {
            // Показываем карточку
            item.style.display = "block";
        }
        // Иначе скрываем карточку 
        else {
            item.style.display = "none";
        }
    });
}
