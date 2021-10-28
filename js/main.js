"use strict";

function onInit() {
    renderGallery();
    setCanvas();
    addClickEvents();

    // getShapes();
    console.log("Working");
}

function toggleMenu() {
    const elBody = document.body;
    elBody.classList.toggle("menu-open");
    const elBtnMenu = document.querySelector(".btn-menu");
    elBtnMenu.innerText = elBtnMenu.innerText === "X" ? "☰" : "X";
}
