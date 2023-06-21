function tabs () {
    const fitnesCangeWraper = document.querySelector(".tabheader__items"),
          tabs = document.querySelectorAll(".tabheader__item");

    // Функция удаляет клас группы элементов
    const removeClass = function (secclass, delclass){
        const elements = document.querySelectorAll(`.${secclass}`);
        elements.forEach(item => {
            if(item.classList.contains(delclass)) {
                item.classList.remove(delclass);
            }
        });
    };
    // Функция скрывает и отображает нужные табы
    const refreshBigTabs = function(id=0){
        if(id === 0){
            document.querySelectorAll(".tabcontent").forEach((tab, i) =>{
                tab.classList.add("hide");
                if(i===0){
                    tab.classList.remove("hide");
                }
            });
        } else {
            document.querySelectorAll(".tabcontent").forEach((tab, i) =>{
                if(!tab.classList.contains("hide")){
                    tab.classList.add("hide");
                }
                if(i === id){
                    tab.classList.remove("hide");
                    if(!tab.classList.contains("faidIn")){
                        tab.classList.add("faidIn");
                    }
                }
            });
        }
    };
    // Обработчик события на кнопках тамбов, меняет активную кнопку и вызывает функции пересовывания табов
    fitnesCangeWraper.addEventListener("click", e =>{
        if (e.target && !e.target.classList.contains("tabheader__item_active")){
            removeClass("tabheader__item", "tabheader__item_active");
            e.target.classList.add("tabheader__item_active");
        }

        let index;
        tabs.forEach((item,i) =>{
            if (item.classList.contains("tabheader__item_active")){
                index = i;
            }
        });
        refreshBigTabs(index);
    });
    refreshBigTabs(0);
}
export default tabs;