"use strict";

function onInit() {
    renderGallery();
    setCanvas();
    addClickEvents();
    addListeners();

    console.log("Working");
}

function toggleMenu(ev) {
    ev.stopPropagation();

    const elBody = document.body;
    elBody.classList.toggle("menu-open");
    const elBtnMenu = document.querySelector(".btn-menu");
    elBtnMenu.innerText = elBtnMenu.innerText === "X" ? "☰" : "X";
}
