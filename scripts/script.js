'use strict';

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт отработал корректно')
});

document.addEventListener("DOMContentLoaded", () => {

    /* 1. Ручная прокрутка элементов Галереи с помощью стрелок*/
    
    const slider = document.querySelectorAll(".gallery__item");     // создаем переменную находя блок по классу

    if (slider) {                                           // проверяем существование элемента в DOM
        console.log('Константа slider существует');
    
        /* 
        *   Алгоритм
        *
        *   1. Начало.
        *   2.1. Проверка условия (навешиваем слушатель событий на кликанье на левую кнопку скролла): если происходит клик на левую кнопку скролла.
        *       2.1.1. Да: Получаем все элементы (изображения) (создание переменной, которая не будет меняться).
        *       2.1.2. Нет: Конец
        *   2.2. Проверка условия (навешиваем слушатель событий на кликанье на правую кнопку скролла): если происходит клик на правую кнопку скролла.
        *       2.2.1. Да: Получаем все элементы (изображения) (создание переменной, которая не будет меняться).
        *       2.2.2. Нет: Конец
        *   3. Проверка условия (проверка массива): массив не пустой.
        *       3.1. Да: Проверка условия: произошел клик по левой кнопке.
        *           3.1.1. Да: Скролл элементов влево
        *           3.1.2. Нет: Проверка условия: произошел клик по правой кнопке скролла.
        *               3.1.2.1. Да: Скролл элементов вправо
        *               3.1.2.2. Нет: Конец
        *       3.2. Нет: Конец
        *   4. Конец
        * 
        *   Блок-схема: /images/block_schema.gallery.png
        */

// Переменная, которая хранит текущий индекс первой карточки, отображаемой в слайдере. Изначально она равна 0, что означает, что первая карточка будет видна.
let currentIndex = 0; 

// объявляем переменную prevButton и сохраняем в нее кнопку для перехода к предыдущей группе карточек
const prevButton = document.querySelector(".gallery__button-left-img");

// объявляем переменную nextButton и сохраняем в нее кнопку для перехода к следующей группе карточек
const nextButton = document.querySelector(".gallery__button-right-img");

//объявлем переменную для хранения количества отображаемых карточек
const visibleCards = 3;

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
    }
});

document.addEventListener('DOMContentLoaded', () => {

    /* 2. Исключение накладывания контента на хедер при скроле/прокрутке страницы */

    const header = document.querySelector('.header');       // создаем переменную находя блок по классу

    if (header) {                                           // проверяем существование элемента в DOM
        console.log('Константа header существует');

        /* 
        *   Алгоритм
        *
        *   1. Начало.
        *   2. Получаем высоту блока/элемента (создание переменной, которая не будет меняться).
        *   3. Проверка условия (навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку): если страница прокручивается.
        *       3.1. Да: Получаем значение насколько прокрутили страницу (создание переменной, которая будет меняться).
        *           3.1.1 Проверка условия (сравниваем высоту элемента и значение прокрученной страницы): если расстояние от верха страницы больше высоты элемента
        *               3.1.1.1. Да: устанавливаем класс модификатора на элемент
        *               3.1.1.2. Нет (если расстояние от верха экрана меньше высоты элемента): удаляем класс модификатора у элемента
        *       3.2. Нет: Конец
        *   4. Конец
        * 
        *   Блок-схема: /images/block-schema.png
        */

        const heightHeader = header.offsetHeight;           // определяем высоту блока, включая внутренние отступы

        document.addEventListener('scroll', () => {         // навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку

            console.log('Страница скролится');

            let scrollPageY = this.scrollY;                 // получаем значение насколько прокрутили страницу

            if (scrollPageY > heightHeader) {               // условие: если расстояние от верха страницы больше высоты элемента
                header.classList.add('header--scroll')      // устанавливаем класс модификатора на элемент
            } else {
                header.classList.remove('header--scroll')   // удаляем класс модификатора у элемента
            }

        })
    }
});

document.addEventListener("DOMContentLoaded", () => {

    /*3. Скролинг страницы к верху*/

    const scrollUpButton = document.querySelector('.scroll-up');

    /* Алгоритм

    *  1. Начало.
    *  2. Проверка условия(навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку): если страница прокручивается.
    *   2.1. Да: Получаем все координаты по высоте(создание переменной, которая не будет меняться)
    *   2.2. Нет: Конец
    *  3. Проверка условия (Проверяем текущие координаты больше чем видимая часть окна браузера)
    *   3.1. Да: Добавляем 'scroll-up--show' 
    *   3.2. Нет: Удаляем 'scroll-up--show'
    * 4. Проверка условия (навешиваем слушатель событий на кликанье на кнопку скролла): если происходит клик на кнопку скролла.
    *   4.1. Да: Плавная прокрутка наверх страницы.
    *   4.2. Нет: Конец
    *  5. Конец 
    * 
    * Блок-схема: /images/Block-schema.scroll.png
    */

    if (scrollUpButton) {
        const windowHeight = document.documentElement.clientHeight; // Определяем высоту видимой части окна браузера

        // Показать кнопку при прокрутке вниз на высоту экрана
        document.addEventListener('scroll', () => {
            let scrollPageY = this.scrollY;

            if (scrollPageY >= windowHeight) {
                scrollUpButton.classList.add('scroll-up--show');
            } else {
                scrollUpButton.classList.remove('scroll-up--show');
            }
        });

        // Плавная прокрутка наверх при нажатии на кнопку
        scrollUpButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    /*4. Появление модальных окон*/

    //Объявляем переменную welcоmeButtonModal и сохраняем в нее кнопку c классом promo__button
    const welcоmeButtonModal = document.querySelector(".promo__button");
    
    //объявляем переменную modalApplication и сохраняем в нее модальное окно, которое хотим увидеть
    const modalApplication = document.querySelector(".popup__wrap");
    
    //Если есть такая кнопка и модальное окно
    if (welcоmeButtonModal && modalApplication) {
        console.log('Константа welcоmeButtonModal и modalApplication существует');
    //Для кнопки «Записаться на курс» добавляем обработчик события клика по этой кнопке:
        welcоmeButtonModal.addEventListener("click", () => {
    // удаляем атрибут hidden у модального окна modalApplication и модальное окно становится видимым
          modalApplication.removeAttribute("hidden");
        });
    
    // добавляем обработчик события при клике вне области формы. Тогда каждый раз, когда пользователь кликает где-либо на фоне вокруг появившейся формы, будет вызываться функция,
    window.addEventListener("click", (event) => {
    // проверяем, был ли клик на фоне модального окна
        if (event.target === modalApplication) {
    //если условие выполняется, добавляем атрибут hidden у модального окна modalApplication и модальное окно становится невидимым
            modalApplication.setAttribute("hidden", true)
        }
    });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    /*5. Формирование массива из частей определенных элементов блока и вывод их с помощью скрипта*/

    //Объявляем переменную ReviewsContainer и сохраняем в нее элементы reviews
    const ReviewsContainer = document.querySelector(".reviews");

    //проверяем существует ли элемент ReviewsContainer, если он существует
    if (ReviewsContainer) {

    //то создаем массив dataTitleReviews, который содержит строки с именами авторов отзывов.
        const dataTitleReviews = [
            "Елизавета Меньшикова",
            "Ирина Лебедева",
        ];

    //Объявляем переменную titleReviews и сохраняем в нее все элементы на странице с классом reviews__user-name.
        const titleReviews =
            ReviewsContainer.querySelectorAll(".reviews__user-name");

    //Проходим по каждому элементу массива titleReviews с помощью цикла forEach. Внутри функции 2 переменные: item – текущий заголовок, а index — его индекс в массиве.
        titleReviews.forEach((item, index) => {

    //здесь обновляем значение текущего заголовка (textContent) на новое значение из массива dataTitleReviews, используя индекс текущего заголовка.
            item.textContent = dataTitleReviews[index];
            });
    }
});
