function timer (dedline) {
    // Функция устанавливает значение в таймер и обеспечивает обратный отсчет
    const setIntervalOnPage = function(){
        const days = document.querySelector("#days"),
              hours = document.querySelector("#hours"),
              minutes = document.querySelector("#minutes"),
              seconds = document.querySelector("#seconds");

        // Дорисовывает в число 0 если оно меньше 10
        function getZiro(data){
            if(data<10){
                return `0${data}`;
            } else {
                return data;
            }
        }
        // Рассчитывает значение дней, часов минут и секунд которые надо поместить в спаны в верстке внутри таймера
        const getTimeInterval = function (data) {
            let days, hours, minutes, seconds;
            const interval = Date.parse(data) - (new Date());
            if(interval <= 0){
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            } else {
                days = Math.floor(interval/(1000*60*60*24));
                hours = Math.floor((interval%(1000*60*60*24)/(1000*60*60)));
                minutes = Math.floor((interval%(1000*60*60*24)%(1000*60*60))/(1000*60));
                seconds = Math.floor(((interval%(1000*60*60*24)%(1000*60*60))%(1000*60))/1000);
            }
            return {
                total: interval,
                days: getZiro(days),
                hours: getZiro(hours),
                minutes: getZiro(minutes),
                seconds: getZiro(seconds)
            };
        };
        // Первоначальное заполнение спанов в таймере
        changeDataFirst();
        const timer = setInterval(changeData, 1000);

        // Функция первоначального заполнения спанов в таймере
        function changeDataFirst(){
            const data = getTimeInterval(dedline);
            days.innerHTML = data.days;
            hours.innerHTML = data.hours;
            minutes.innerHTML = data.minutes;
            seconds.innerHTML = data.seconds;
        }
        // Функция которую вызавает сет интервал, обновляет данные в таймере и останавливает таймер когда нужно
        function changeData(){
            const data = getTimeInterval(dedline);
            if(data.total <= 0 ){
                clearInterval(timer);
            }
            days.innerHTML = data.days;
            hours.innerHTML = data.hours;
            minutes.innerHTML = data.minutes;
            seconds.innerHTML = data.seconds;
        }
    };
    setIntervalOnPage();
}
export default timer;