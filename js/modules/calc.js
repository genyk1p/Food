function calc () {
    // Калькулятор
    let gender = "famail",
        rate = 1.375,
        height, age, weight, calories;

    // Получаем данные из локального храниища или записываем их туда если их там нет
    if (localStorage.getItem("gender")){
        gender = localStorage.getItem("gender");
    } else {
        localStorage.setItem("gender", "famail");
    }
    if (localStorage.getItem("rate")){
        rate = localStorage.getItem("rate");
    } else {
        localStorage.setItem("rate", 1.375);
    }
    // Функция установки класов активности калькулятора исходя из того что лежит в локал сторедж
    function setActiveClass(selector){
        document.querySelectorAll(selector).forEach(element =>{
            element.classList.remove("calculating__choose-item_active");
            if (element.id === gender){
                element.classList.add("calculating__choose-item_active");
            }
            if (element.getAttribute("data-ratio") == rate){
                element.classList.add("calculating__choose-item_active");
            }
        });
    }
    // Функция рассчитывет количество калорий и постит их в калькулятор
    function calcCalories(){
        if(!height || !age ||!weight){
            calories = "_____";
        } else {
            if(gender === "famail"){
                calories = Math.round(rate*(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)));
            } else {
                calories = Math.round(rate*(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)));
            }
        }
        document.querySelector(".calculating__result span").innerHTML = calories;
    }
    // Функция собирает данные которые ввел пользователь в калькулятор и пересчитывает колво калорий
    function getData (selector){
        const elements = document.querySelectorAll(selector);
        if (selector === ".calculating__choose_medium input") {
            elements.forEach(element =>{
                element.addEventListener("input", ()=>{
                    if (element.value.match(/\D/g)){
                        element.style.border = "1px red solid";
                    } else {
                        element.style.border = "none";
                    }
                    switch(element.id){
                        case "height": height =  +element.value;
                            break;
                        case "weight": weight =  +element.value;
                            break;
                        case "age": age = +element.value;
                            break;
                    }
                    calcCalories();
                });
            });
        } else if(selector === ".calculating__choose_big div" || selector === "#gender div"){
            elements.forEach(element =>{
                element.addEventListener("click", ()=>{
                    document.querySelectorAll(selector).forEach(e =>{
                        e.classList.remove("calculating__choose-item_active");
                    });
                    element.classList.add("calculating__choose-item_active");
                    switch(element.id){
                        case "famail": gender = "famail";
                        break;
                        case "mail": gender = "mail";
                        break;
                        case "low": rate = 1.2;
                        break;
                        case "small": rate = 1.375;
                        break;
                        case "medium": rate = 1.55;
                        break;
                        case "high": rate = 1.725;
                        break;
                    }
                    localStorage.setItem("gender", gender);
                    localStorage.setItem("rate", rate);
                    calcCalories();
                });
            });
        }
    }
    setActiveClass("#gender div");
    setActiveClass(".calculating__choose_big div");
    calcCalories();
    getData(".calculating__choose_medium input");
    getData(".calculating__choose_big div");
    getData("#gender div");
}
export default  calc;