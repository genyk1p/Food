"use strict";
import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import createModal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";

document.addEventListener("DOMContentLoaded", () =>{
    calc();
    cards();
    forms();
    createModal();
    slider();
    tabs();
    timer("2023-06-11");
});
