function cards () {
    const dataObj = {
        menu: [
          {
            img: "img/tabs/vegy.jpg",
            altimg: "vegy",
            title: "Menu 'Fitness'",
            descr: "The 'Fitness' menu is a new approach to cooking: more fresh vegetables and fruits. Product of active and healthy people. This is a brand new product with the best price and high quality!",
            price: 20
          },
          {
            img: "img/tabs/post.jpg",
            altimg: "post",
            title: "Menu 'Lenten'",
            descr: "The 'Lenten' menu is a careful selection of ingredients: no animal products, milk from almonds, oats, coconut or buckwheat, the right amount of protein from tofu and imported vegetarian steaks.",
            price: 25
          },
          {
            img: "img/tabs/elite.jpg",
            altimg: "elite",
            title: "Menu 'Premium'",
            descr: "In the 'Premium' menu, we use not only beautiful packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - a restaurant menu without going to a restaurant!",
            price: 40
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
                    <div class="menu__item-total"><span>${this.price}</span> usd/day</div>
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