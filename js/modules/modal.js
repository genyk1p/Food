const modalContent = `
    <div class="modal__dialog">
        <div class="modal__content">
            <form action="#">
                <div class="modal__close">&times;</div>
                <div class="modal__title">We will contact you as soon as possible!</div>
                <input required placeholder="Your name" name="name" type="text" class="modal__input">
                <input required placeholder="Your phone number" name="phone" type="phone" class="modal__input">
                <button class="btn btn_dark btn_min">Call me back</button>
            </form>
        </div>
    </div>
`;
class Modal {
    constructor (content, postTolocalStorage, message){
        this.content = content;
        this.postTolocalStorage = postTolocalStorage;
        this.localStorageStatus = 0;
        this.getlocalStorageStatus();
        this.message = message;
        this.checkContent();
    }
    checkContent(){
        if (this.message){
            this.content = `
            <div class="modal__dialog">
                <div class="modal__content">
                    <div class="modal__close">&times;</div>
                    <div class="modal__title">${this.message}</div>
                    </div>
                </div>
            </div>
            `; 
        }
    }
    getlocalStorageStatus(){
        if (this.postTolocalStorage){
            if (localStorage.getItem("localStorageStatus")){
                this.localStorageStatus = +localStorage.getItem("localStorageStatus");
            } else {
                localStorage.setItem("localStorageStatus", 0);
            }
        }
    } 
    addModaltoHtml(){
        const footer = document.querySelector("footer"),
              div = document.createElement("div");
        div.classList.add("modal");
        div.innerHTML = this.content;
        footer.after(div);
        this.show();
    }
    addModaltoHtmlStorageStatus(){
        this.getlocalStorageStatus();
        if (!this.localStorageStatus){
            this.addModaltoHtml();
            localStorage.setItem("localStorageStatus", 1);
        }
    }
    hide(){
        const modal = document.querySelector(".modal");
        modal.classList.add("hide");
        modal.classList.remove("show");
    }
    show(){
        const modal = document.querySelector(".modal");
        modal.classList.add("show");
        modal.classList.remove("hide");
    }
    deletModalFromHTML(check=false){
        if (check){
            if(document.querySelector(".modal form")){
                return;
            }
        }
        if(document.querySelector(".modal") ){
            localStorage.setItem("modalCurentShowedStatus", "notShowed");
            document.querySelector(".modal").remove();
        }
    }
}
function createModal() {
    const btns = document.querySelectorAll("[data-modal]");
    let modalCounter = 0;
    document.querySelector(".modal").remove();
    const newModal = new Modal (modalContent, true);
    setTimeout(()=>{
        newModal.addModaltoHtmlStorageStatus();
    }, 5000);
    // Обработчик событий который показывает модальное окно, мы его на весили на все нужные кнопки
    function eventListenerStarts(){
        btns.forEach(btn =>{
            btn.addEventListener("click", ()=>{
                
                newModal.addModaltoHtml();
            });
        });
        document.body.addEventListener("click", e =>{
            if(e.target && e.target.classList.contains("modal") || e.target.classList.contains("modal__close")){
                newModal.deletModalFromHTML();
            }
        });
        document.addEventListener("keydown", e =>{
            if(e.key === "Escape" && (document.querySelector(".modal"))){
                newModal.deletModalFromHTML();
            }
        });
        window.addEventListener("scroll", showModalByScroll);
    }
    eventListenerStarts();
    // Обработчик события скролинга, открывает модальное окно когда мы доскроливаем до низа окна
    function showModalByScroll(){
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        if((scrollHeight-scrollTop) <= windowHeight && modalCounter === 0){
            newModal.addModaltoHtmlStorageStatus();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
}
export default createModal;
export {Modal};