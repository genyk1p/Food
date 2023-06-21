function cards () {
    const dataObj = {
        menu: [
          {
            img: "img/tabs/vegy.jpg",
            altimg: "vegy",
            title: "Меню 'Фитнес'",
            descr: "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
            price: 500
          },
          {
            img: "img/tabs/post.jpg",
            altimg: "post",
            title: "Меню 'Постное'",
            descr: "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
            price: 600
          },
          {
            img: "img/tabs/elite.jpg",
            altimg: "elite",
            title: "Меню 'Премиум'",
            descr: "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
            price: 900
          }
        ],
        requests: []
      }
    // Динамически формируем карточки меню
    const menuWraper = document.querySelector(".menu__field .container");
    class Menu {
        constructor(img, alt, h3, content, price, wraper) {
            this.img = img;
            this.alt = alt;
            this.h3 = h3;
            this.content = content;
            this.price = price;
            this.wraper = wraper;
        }
        render(){
            const div = document.createElement("div");
            div.classList.add("menu__item");
            div.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.h3}</h3>
                <div class="menu__item-descr">${this.content}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.wraper.append(div);
        }
    }
    function createMenu(method = 'local'){
        if(method === 'fetch'){
            menuWraper.innerHTML = '';
            fetch("http://localhost:3000/menu")
            .then(data => data.json())
            .then(data =>{
            data.forEach(tab =>{
                new Menu(tab.img, tab.altimg, tab.title, tab.descr, tab.price, menuWraper).render();
            });
        });
        } 
        else if (method === 'local') {
            menuWraper.innerHTML = '';
            dataObj.menu.forEach(tab =>{
                new Menu(tab.img, tab.altimg, tab.title, tab.descr, tab.price, menuWraper).render();
            })
        }
    }
    createMenu('local');
}
export default cards;