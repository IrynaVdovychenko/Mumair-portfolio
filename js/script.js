"use strict"

/* -----------------Зміна орієнтації екрану---------------------- */

const box = document.querySelector('.introduction__container');

const observer = new ResizeObserver(entries => {
  for (let entry of entries) {
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;

    if (width < height) {
      box.classList.add('introduction__container_vertical');
    } else {
        box.classList.remove('introduction__container_vertical');
    }
  }
});

observer.observe(box);

/* -----------------Зміна орієнтації екрану---------------------- */

/* -----------------Меню Бургер---------------------- */

const iconMenu = document.querySelector('.header__icon');
const headerContainer = iconMenu.closest('.header__container');
if (iconMenu) {
    iconMenu.addEventListener('click', function(event) {
        if(headerContainer){
            headerContainer.classList.toggle('_open');
			document.body.classList.toggle('_lock');
        }
    });
}; 

/* -----------------Меню Бургер---------------------- */

/* ---------------Прокрутка до розділу--------------- */

const menuLinks = document.querySelectorAll('[class$="__link"][data-goto]');
console.log(menuLinks);
if (menuLinks.length >0) {
    console.log('Так');
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', function (e) {
            const link = e.target;
            console.log(link);
            const target = document.querySelector(link.dataset.goto);
            console.log(link.dataset.goto);
            console.log(target);
            if (link.dataset.goto && document.querySelector(link.dataset.goto)){
                const gotoBlock = document.querySelector(link.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
                console.log(gotoBlock);
                console.log(gotoBlockValue);
                //Закриття меню Бургер
                if(headerContainer.classList.contains('_open')) {
                    document.body.classList.remove('_lock');
                    headerContainer.classList.remove('_open');
                }

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        });
    });
};

/* ---------------Прокрутка до розділу--------------- */

/* ---------------Перемикач теми--------------- */

const checkboxTheme = document.querySelector('#checkboxTheme');
const body = document.body;
const currentTheme = body.getAttribute("data-theme") || "light";
let newTheme = !currentTheme;
if(checkboxTheme) {
    checkboxTheme.addEventListener('change', e => {
        if(checkboxTheme.checked) {
            newTheme = 'dark';
            body.setAttribute("data-theme", newTheme);
            
        } else {
            newTheme = 'light';
            body.setAttribute("data-theme", newTheme);
        }
        localStorage.setItem("theme", newTheme); // зберігаємо тему
    });
}

// Автоматичне встановлення теми при завантаженні
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.setAttribute("data-theme", savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.setAttribute("data-theme", 'dark');
        } else {
            body.setAttribute("data-theme", 'light');
        }
    }
    if (body.getAttribute("data-theme")==='dark') {
        console.log ('Тема темна');
        checkboxTheme.checked = true;
    };
  });

/* ---------------Перемикач теми--------------- */

/*------------ Додавання класу _touch для HTML, якщо браузер мобільний ----------------- */
/* Перевірка мобільного браузера */
let isMobile = { 
    Android: function () { return navigator.userAgent.match(/Android/i); }, 
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, 
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, 
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, 
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, 
};
isMobile.any = function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); };
function addTouchClass() {
// Додавання класу _touch для HTML, якщо браузер мобільний
	if (isMobile.any()) document.documentElement.classList.add('_touch');
}
addTouchClass();

/*------------ Додавання класу _touch для HTML, якщо браузер мобільный ----------------- */

/* ---------Урахування плаваючої панелі на мобильних пристроях при 100vh -------------------*/
function fullVHfix() {
	const fullScreens = document.querySelectorAll('[data-fullscreen]');
	if (fullScreens.length && isMobile.any()) {
		window.addEventListener('resize', fixHeight);
		function fixHeight() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
		fixHeight();
	}
}

/* ---------Урахування плаваючої панелі на мобильних пристроях при 100vh -------------------*/

/* ---------Progress bar-------------*/
const levels = document.querySelectorAll('.progress__item[data-level]');
console.log(levels);
if (levels.length >0) {
    levels.forEach(level => {
        const levelValue = level.dataset.level;
        console.log(levelValue);
        level.style.setProperty('--before-width', levelValue+'%');
        level.style.setProperty('--after-left', levelValue+'%');
    });};

/* ---------Progress bar-------------*/

/*-----------Робота за галереєю------------------*/

/*Підключення плагінів*/
const lgZoom = window.lgZoom;
const lgThumbnail = window.lgThumbnail;

const galleries = document.querySelectorAll('.project__open-gallery');
console.log(galleries);
if(galleries){
    galleries.forEach(gallery => {
        gallery.addEventListener('click', e => {
            const openGallery = e.target;
            console.log(e.target);
            console.log(openGallery);
            const parent = gallery.closest('.project__img-ibg');
            const galleryImages = parent.querySelectorAll('.project__gallery-data > div');
            const galleryItems = [];
            console.log(galleryImages);
            if(galleryImages) {
                galleryImages.forEach(item => {
                    galleryItems.push({
                        src: item.dataset.src,
                        thumb: item.dataset.thumb,
                    });
                    console.log(galleryItems);
                });
            };
            const container = document.createElement('div');
            document.body.appendChild(container);
          
            const instance = lightGallery(container, {
              dynamic: true,
              dynamicEl: galleryItems,
              plugins: [lgZoom, lgThumbnail],
              licenseKey: '36F894EE-2564-49AA-B6E3-EC2755E73DB6',
              thumbnail: true,
              speed: 500,
              onCloseAfter: () => {
                container.remove(); // Видаляємо елемент після закриття
            }
            });

             // Слухаємо подію закриття напряму
             container.addEventListener('lgAfterClose', () => {
                instance.destroy();      // Повністю знищити екземпляр
                container.remove();      // Видалити контейнер з DOM
            });

            instance.openGallery();
        });
    });
};
/*-----------Робота за галереєю------------------*/

/*--------- Таби-------------*/
function getHash() {
	if (location.hash) { return location.hash.replace('#', ''); };
};

function tabs() {
	const tabs = document.querySelectorAll('[data-tabs]');
	let tabsActiveHash = [];

	if (tabs.length > 0) {
		const hash = getHash();
		if (hash && hash.startsWith('tab-')) {
			tabsActiveHash = hash.replace('tab-', '').split('-');
		}
		tabs.forEach((tabsBlock, index) => {
			tabsBlock.classList.add('_tab-init');
			tabsBlock.setAttribute('data-tabs-index', index);
			tabsBlock.addEventListener("click", setTabsAction);
			initTabs(tabsBlock);
		});
	}
	// Установка позиций заголовков
	function setTitlePosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaItem => {
			tabsMediaItem = tabsMediaItem.item;
			let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
			let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
			let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
			let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
			tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
			tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
			tabsContentItems.forEach((tabsContentItem, index) => {
				if (matchMedia.matches) {
					tabsContent.append(tabsTitleItems[index]);
					tabsContent.append(tabsContentItem);
					tabsMediaItem.classList.add('_tab-spoller');
				} else {
					tabsTitles.append(tabsTitleItems[index]);
					tabsMediaItem.classList.remove('_tab-spoller');
				}
			});
		});
	}
	// Работа с контентом
	function initTabs(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

		if (tabsActiveHashBlock) {
			const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
			tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
		}
		if (tabsContent.length) {
			tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsContent.forEach((tabsContentItem, index) => {
				tabsTitles[index].setAttribute('data-tabs-title', '');
				tabsContentItem.setAttribute('data-tabs-item', '');

				if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
					tabsTitles[index].classList.add('_tab-active');
				}
				tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
			});
		}
	}
	function setTabsStatus(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		function isTabsAnamate(tabsBlock) {
			if (tabsBlock.hasAttribute('data-tabs-animate')) {
				return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
			}
		}
		const tabsBlockAnimate = isTabsAnamate(tabsBlock);
		if (tabsContent.length > 0) {
			const isHash = tabsBlock.hasAttribute('data-tabs-hash');
			tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsContent.forEach((tabsContentItem, index) => {
				if (tabsTitles[index].classList.contains('_tab-active')) {
					if (tabsBlockAnimate) {
						_slideDown(tabsContentItem, tabsBlockAnimate);
					} else {
						tabsContentItem.hidden = false;
					}
					if (isHash && !tabsContentItem.closest('.popup')) {
						setHash(`tab-${tabsBlockIndex}-${index}`);
					}
				} else {
					if (tabsBlockAnimate) {
						_slideUp(tabsContentItem, tabsBlockAnimate);
					} else {
						tabsContentItem.hidden = true;
					}
				}
			});
		}
	}
	function setTabsAction(e) {
		const el = e.target;
		if (el.closest('[data-tabs-title]')) {
			const tabTitle = el.closest('[data-tabs-title]');
			const tabsBlock = tabTitle.closest('[data-tabs]');
			if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
				let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
				tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
				//tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
                if (tabActiveTitle.length) {
                    tabActiveTitle[0].classList.remove('_tab-active');
                    tabActiveTitle[0].classList.remove('button_orange');
                    tabActiveTitle[0].classList.add('button_grey');
                }
				tabTitle.classList.add('_tab-active');
                tabTitle.classList.add('button_orange');
                tabTitle.classList.remove('button_grey');
				setTabsStatus(tabsBlock);
			}
			e.preventDefault();
		}
	}
}
tabs();

/*--------- Таби-------------*/

/*--------- Swiper-------------*/

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    speed: 500,
    spaceBetween: 100,
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      dynamicMainBullets: 1
    },
  });

/*--------- Swiper-------------*/

const submitContact = document.querySelector(".contact__submit");
if(submitContact) {
    submitContact.addEventListener("click", e => {
        e.preventDefault();
    });
}