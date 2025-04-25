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

    /*4. Появление модального окна Оставить заявку*/

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

    //Объявляем переменную closeModalButton и сохраняем в нее кнопку c классом popup__close
    const closeModalButton = document.querySelector(".popup__close");
    //Для кнопки «Закрыть» добавляем обработчик события клика по этой кнопке:
    closeModalButton.addEventListener("click", () => {
    
        // Добавляем атрибут hidden у модального окна modalApplication и модальное окно становится невидимым
        modalApplication.setAttribute("hidden", true);
    });

    // Отправка данных при заявке

    modalApplication.addEventListener('submit', event => {
        event.preventDefault(); // Предотвращаем отправку формы
            
        const name = modalApplication.querySelector('#name').value;
        const phone = modalApplication.querySelector('#telephone').value;
    
        const errorMessage = modalApplication.querySelector('.error-message');
    
        if (phone.length > 12) {
            errorMessage.textContent = 'Неправильно набран номер';
            errorMessage.style.color = 'red';
            return;
        }

        // Отправка данных на сервер
        errorMessage.textContent = 'Заявка отправлена!';
        errorMessage.style.color = 'green';
            
        // Запишем Имя
        window.localStorage.setItem("#name", name);

        // Запишем Номер
        window.localStorage.setItem("#telephone", phone);
    });
};
});

document.addEventListener('DOMContentLoaded', () => {

    /*5. Формирование массива из частей определенных элементов блока и вывод их с помощью скрипта*/

    //Объявляем переменную ReviewsContainer и сохраняем в нее элементы reviews
    const ReviewsContainer = document.querySelector(".reviews");

    //проверяем существует ли элемент ReviewsContainer, если он существует
    if (ReviewsContainer) {

    //то создаем массив dataTitleReviews, который содержит строки с именами авторов отзывов.
        const dataTitleReviews = ["Елизавета Меньшикова","Ирина Лебедева",];

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

document.addEventListener('DOMContentLoaded', () => {

    /*6. Появление модального окна Бронирование через кнопку в header и footer*/

    //Объявляем переменную headerButtonModal и сохраняем в нее кнопку c классом header__item-button
    const headerButtonModal = document.querySelector(".header__item-button");

    //Объявляем переменную footerButtonModal и сохраняем в нее кнопку c классом footer__item-button
    const footerButtonModal = document.querySelector(".footer__item-button");
    
    //объявляем переменную modalBooking и сохраняем в нее модальное окно, которое хотим увидеть
    const modalBooking = document.querySelector(".booking__wrap");
    
    //Если есть такая кнопка c классом header__item-button и модальное окно
    if (headerButtonModal && modalBooking) {
        console.log('Константа headerButtonModal и modalBooking существует');

        //Для кнопки «Бронирование» добавляем обработчик события клика по этой кнопке:
         headerButtonModal.addEventListener("click", () => {
        // удаляем атрибут hidden у модального окна modalBooking и модальное окно становится видимым
              modalBooking.removeAttribute("hidden");
            });

    //Если есть такая кнопка c классом footer__item-button и модальное окно
    if (footerButtonModal && modalBooking) {
        console.log('Константа footerButtonModal и modalBooking существует');

        //Для кнопки «Бронирование» добавляем обработчик события клика по этой кнопке:
            footerButtonModal.addEventListener("click", () => {
        // удаляем атрибут hidden у модального окна modalBooking и модальное окно становится видимым
            modalBooking.removeAttribute("hidden");
            });
    
    // добавляем обработчик события при клике вне области формы. Тогда каждый раз, когда пользователь кликает где-либо на фоне вокруг появившейся формы, будет вызываться функция,
    window.addEventListener("click", (event) => {
    // проверяем, был ли клик на фоне модального окна
        if (event.target === modalBooking) {
    //если условие выполняется, добавляем атрибут hidden у модального окна modalBooking и модальное окно становится невидимым
            modalBooking.setAttribute("hidden", true)
        }
    });

    //Объявляем переменную closeModalButton и сохраняем в нее кнопку c классом booking__close
    const closeModalButton = document.querySelector(".booking__close");
    //Для кнопки «Закрыть» добавляем обработчик события клика по этой кнопке:
    closeModalButton.addEventListener("click", () => {

    // Добавляем атрибут hidden у модального окна modalBooking и модальное окно становится невидимым
        modalBooking.setAttribute("hidden", true);
    });

    // Отправка данных при бронировании

    modalBooking.addEventListener('submit', event => {
        event.preventDefault(); // Предотвращаем отправку формы
            
        const name = modalBooking.querySelector('#username').value;
        const phone = modalBooking.querySelector('#phone').value;
        const number = modalBooking.querySelector('#number').value;
    
        const errorMessage = modalBooking.querySelector('.error-message');
    
        if (phone.length > 12) {
            errorMessage.textContent = 'Неправильно набран номер';
            errorMessage.style.color = 'red';
            return;
        }

        if (number.length > 2 ) {
            errorMessage.textContent = 'Максимальное число 10 человек';
            errorMessage.style.color = 'red';
            return;
        }

        // Отправка данных на сервер
        errorMessage.textContent = 'Бронирование прошло успешно!';
        errorMessage.style.color = 'green';
            
        // Запишем Имя
        window.localStorage.setItem("#username", name);

        // Запишем Номер
        window.localStorage.setItem("#phone", phone);
    });
    };
    };
});

    /*8. Формирование объекта из элементов раздела и вывод блока динамически*/

    //Объявляем переменную cardsAdvantages и сохраняем в нее элемент с классом advantages

    /*Данный код реализован ниже с помощью загрузки данных с сервера

    const cardsAdvantages = document.querySelector('.advantages');

    // Если такой элемент существует
    if (cardsAdvantages) {
    //Объявляем переменную advantagesList и сохраняем в нее элемент с классом advantages__list, чтобы мы могли добавить новые элементы
        const advantagesList = cardsAdvantages.querySelector('.advantages__list');

    //Создаем объект cardsPriceData, которая содержит данные для трех карточки.
        const cardsAdvantagesData = {
    // каждая ссылка содержит icon (иконка), iconAlt (описание иконки), iconWidth(ширина иконки), iconHigth (высота иконки), title (преимущество), description (описание).
        advantages1: {
            icon: 'images/level.svg',
            iconAlt: 'Иконка шлема',
            iconWidth: 45,
            iconHigth: 45,
            title:'Увлекательные экскурсии',
            description:'У нас имеются маршруты разной сложности, как для новичков, так и для всадников, которые уверенно держатся в седле.'
        },
        advantages2: {
            icon: 'images/instructor.svg',
            iconAlt: 'Иконка инструктора',
            iconWidth: 45,
            iconHigth: 45,
            title:'Опытные инструктора',
            description:'Инструкторы очень подробно объяснят всадникам, как вести себя с лошадью, как управлять ею, научат ездить на разных аллюрах.'
        },
        advantages3: {
            icon: 'images/tree.svg',
            iconAlt: 'Иконка дерева',
            iconWidth: 45,
            iconHigth: 45,
            title:'Живописные пейзажи',
            description:'Маршруты проходят по лесной зоне: вы познакомитесь с природой парка, посетите различные исторические и природные объекты.'
        }
    }
    //Создаем функцию createCard, которая будет добавлять карточку. Внутри функции 6 переменных.
    const createCard = (icon, iconAlt, iconWidth, iconHigth, title, description) => {
        // Создаем переменную  card, которая будет содержать HTML-код карточки и вставляем туда 6 переменных
        const card = `
        <li class="advantages__item">
            <img class="advantages__icon" src="${icon}" alt="${iconAlt}" width="${iconWidth}" height="${iconHigth}">
            <h3 class="advantages__title">${title}</h3>
            <p class="advantages__description">${description}</p>
        </li>
    `;
        //  Возвращаем значение переменной card
        return card;
    }
    // Создаем цикл for и проходим по всем элементам объекта cardsAdvantagesData.
    for (const cardKey in cardsAdvantagesData) {
        //Получаем данные одной карточки из объекта cardsAdvantagesData 
        const card = cardsAdvantagesData[cardKey];
        //создаем переменную cardElement и вызываем функцию createLink, куда передаем (то, из чего будет состоять карточка).
        const cardElement = createCard(card.icon, card.iconAlt, card.iconWidth, card.iconHigth, card.title, card.description);
        // с помощью метода insertAdjacentHTML добавляем созданный HTML-код в конец списка advantagesList.
        advantagesList.insertAdjacentHTML('beforeend', cardElement);
    }
    }
})*/

document.addEventListener('DOMContentLoaded', () => {

    /* 9. Динамическая галерея изображений, загрузка данных с сервера.*/

    //Объявляем переменную cardsAdvantages и сохраняем в нее элемент с классом advantages
    const cardsAdvantages = document.querySelector('.advantages');

    // Если такой элемент существует
    if (cardsAdvantages) {
    //Объявляем переменную advantagesList и сохраняем в нее элемент с классом advantages__list, чтобы мы могли добавить новые элементы
        const advantagesList = cardsAdvantages.querySelector('.advantages__list');

    // Пример URL для получения данных с сервера
    const apiUrl = 'data.json';

    // Функция для создания карточки
    const createCard = (icon, iconAlt, iconWidth, iconHigth, title, description) => {

        // Создаем переменную  card, которая будет содержать HTML-код карточки и вставляем туда 6 переменных
        const card = `
        <li class="advantages__item">
            <img class="advantages__icon" src="${icon}" alt="${iconAlt}" width="${iconWidth}" height="${iconHigth}">
            <h3 class="advantages__title">${title}</h3>
            <p class="advantages__description">${description}</p>
        </li>
    `;
        return card;
    };

    // Загрузка данных с сервера
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Данные
                console.log(typeof data); // Тип полученных данных

                data.forEach(item => {
                    const cardElement = createCard(item.icon, item.iconAlt, item.iconWidth, item.iconHigth, item.title, item.description);
                    advantagesList.insertAdjacentHTML('beforeend', cardElement);
                });

            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }
})

document.addEventListener('DOMContentLoaded', () => {

    /* 10. Прелоадер*/

    const preloader = document.querySelector(".preloader");
    const content = document.querySelector(".content");
    if (preloader && content) {
        setTimeout(() => {

            // Скрываем прелоадер
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
    
            // Показываем контент
            content.style.display = "block";
    
            // Удаляем элемент из DOM
            preloader.remove();

        }, 3000); // Задержка 3 секунды
    }
    })