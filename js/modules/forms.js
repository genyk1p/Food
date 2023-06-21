import {Modal} from "./modal";
import {postDataToDb} from "../services/services";

function forms (){
    const status = {
        loading: "img/form/spinner.svg",
        done: "Запрос успешно выполнен",
        error: "Чтото пошло не так"
        };
    // Меняем поведение формы, навешиваем обработчик и конструируем Ajax запрос на сервер
    function changeformsBehavor(){
        document.addEventListener("click", (e)=>{
            if(e.target && e.target.innerHTML === "Перезвонить мне"){
                const arr = [];
                e.target.parentElement.querySelectorAll("input").forEach(input =>{
                    arr.push(input.value);
                    if (input.value === ""){
                        input.style.border = "1px red solid";
                    }
                });
                if (!arr.includes("")){
                    e.preventDefault();
                    formDataSend(e.target.parentElement);
                }
            }    
        });
        function formDataSend(form){
            const statusMessage = document.createElement("img");
            statusMessage.classList.add("status__mesage");
            statusMessage.src = status.loading;
            form.insertAdjacentElement("afterend", statusMessage);
            const formData = new FormData(form);
            const formJson = JSON.stringify(Object.fromEntries(formData.entries()));
            postDataToDb("http://localhost:3000/requests", formJson)
            .then((data) =>{
                if(document.querySelector(".modal")){
                    document.querySelector(".modal").remove();
                }
                console.log("+++");
                const newModal = new Modal("", false, status.done);
                newModal.addModaltoHtml();
                setTimeout(() => {
                    newModal.deletModalFromHTML("check");
                }, 3000);
            })
            .catch(() =>{
                if(document.querySelector(".modal")){
                    document.querySelector(".modal").remove();
                }
                const newModal = new Modal("", false, status.error);
                newModal.addModaltoHtml();
                setTimeout(() => {
                      newModal.deletModalFromHTML("check");
                }, 3000);
            })
            .finally(() => {
                statusMessage.remove();
                form.reset();
            });
        }
    }
    changeformsBehavor();
}
export default forms;