'use strict'; 

let gElCanvas;
let gCtx;

function setCanvas() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');

    resizeCanvas();
    renderCanvas();
}

function renderCanvas() {
    gCtx.fillStyle = "#ede5ff";
    gCtx.fillRect(0 + 50, 0 + 100, gElCanvas.width -100, gElCanvas.height -150);
}

function resizeCanvas() {
    const elContainer = document.querySelector(".canvas-container");
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}