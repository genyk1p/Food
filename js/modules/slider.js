function slider () {
    // Слайдер
    class Slider{
        constructor (){
            this.sliderWrapper = document.querySelector(".offer__slider-wrapper");
            this.sliders = document.querySelectorAll(".offer__slide");
            this.width = 0;
            this.translateX = 0;
            this.currentSlideNumber = 1;
            this.slidesQuantity = 0;
            this.addClassToSliders();
            this.getWidth();
            this.getslidesQuantity();
            this.mintranslateX = -this.slidesQuantity*this.width;
            this.setSlider();
            this.addDots();
        }
        addClassToSliders(){
            const imgs = document.querySelectorAll(".offer__slider .offer__slider-counter img");
            imgs[0].classList.add("left_scroll_img");
            imgs[1].classList.add("right_scroll_img");
            this.sliderWrapper.classList.add("offer__slider-wrapper_js");
            this.sliders.forEach((slider)=>{
                slider.classList.add("offer__slide_js");
            });
        }
        getWidth(){
            this.width = this.sliderWrapper.getBoundingClientRect().width;
        }
        getslidesQuantity(){
            this.slidesQuantity = this.sliders.length;
        }
        setSlider(){
            this.sliders.forEach(slider =>{
                slider.style.transform = `translateX(${this.translateX}px)`;
            });
            if (this.currentSlideNumber < 10){
                document.querySelector("#current").innerHTML = `0${this.currentSlideNumber}`;
            } else {
                document.querySelector("#current").innerHTML = `${this.currentSlideNumber}`;
            }
            if (this.slidesQuantity < 10) {
                document.querySelector("#total").innerHTML = `0${this.slidesQuantity}`;
            } else {
                document.querySelector("#total").innerHTML = `${this.slidesQuantity}`;
            }
            const dots = document.querySelectorAll('.dot')
            dots.forEach(dot =>{
                dot.classList.remove('active-dot');
                if( +dot.dataset.dot ==  this.currentSlideNumber-1){
                    dot.classList.add('active-dot')
                }
            })
        }
        addDots(){
            const div = document.createElement("div");
            div.classList.add("carousel-indicators");
            for (let i = 0; i< this.slidesQuantity; i++){
                if (i === 0){
                    div.innerHTML += `
                    <span class="dot active-dot" data-dot=${i}></span>
                `;
                } else{
                    div.innerHTML += `
                    <span class="dot" data-dot=${i}></span>
                `;
                }
            }
            this.sliderWrapper.append(div);
            document.querySelectorAll(".dot").forEach(dot =>{
                dot.addEventListener("click", e =>{
                    document.querySelectorAll(".dot").forEach((dot, index) =>{
                        if (e.target === dot){
                            this.translateX = -(index)*this.width;
                            this.currentSlideNumber = index + 1;
                            this.setSlider();
                        }
                    });
                });
            });
        }
        srollRight(){
            if(this.currentSlideNumber === this.slidesQuantity){
                this.currentSlideNumber = 1;
            } else {
                this.currentSlideNumber++;
            }
            if(this.translateX > this.mintranslateX){
                this.translateX -= this.width; 
            } if(this.translateX === this.mintranslateX){
                this.translateX = 0;
                this.currentSlideNumber = 1;
            }
            this.setSlider();
        }
        scrollLeft(){
            if(this.currentSlideNumber === 1){
                this.currentSlideNumber = this.slidesQuantity;
            } else {
                this.currentSlideNumber --;
            }
            if(this.translateX === 0){
                this.translateX = this.width*(this.slidesQuantity)*-1;
            }
            this.translateX += this.width;
            this.setSlider();
        }
    }
    const slider = new Slider();
    document.addEventListener("click", e =>{
        if(e.target && (e.target.classList.contains("offer__slider-prev") || e.target.classList.contains("left_scroll_img"))){
            slider.scrollLeft();
        }
    });
    document.addEventListener("click", e =>{
        if(e.target && (e.target.classList.contains("offer__slider-next") || e.target.classList.contains("right_scroll_img"))){
            slider.srollRight();
        }
    });
}
export default slider;