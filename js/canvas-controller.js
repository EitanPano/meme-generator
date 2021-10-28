"use strict";

let gElCanvas;
let gCtx;

function setCanvas() {
    gElCanvas = document.querySelector("canvas");
    gCtx = gElCanvas.getContext("2d");

    resizeCanvas();
    renderCanvas();
}

function renderCanvas() {
    gCtx.fillStyle = "#ede5ff";
    gElCanvas.width = gElCanvas.width - 100;
    gElCanvas.height = gElCanvas.height - 100;
}

function resizeCanvas() {
    const elContainer = document.querySelector(".canvas-container");
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function drawText(text, x, y) {

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = "red";
    gCtx.fillStyle = "white";
    gCtx.font = "30px Impact";
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}
