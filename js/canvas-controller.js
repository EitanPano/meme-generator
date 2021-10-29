"use strict";

let gElCanvas;
let gCtx;
// let gElContainer = document.querySelector(".canvas-container")
var gStartPos;
const gTouchEvs = ["touchstart", "touchmove", "touchend"];

function setCanvas() {
    gElCanvas = document.querySelector("canvas");
    gCtx = gElCanvas.getContext("2d");

    resizeCanvas();
    // const top = { x: gElCanvas.width / 2, y: 50};
    // createTxtLine('Enter Text Here', top);
    // renderCanvas();
}

// function renderCanvas() {
//     gCtx.fillStyle = "#ede5ff";
//     gElCanvas.width = elContainer.width
//     gElCanvas.height = elContainer.height
// }

function resizeCanvas() {
    // const elContainer = document.querySelector(".canvas-container");
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function drawText(txtLine) {
    gCtx.beginPath();
    gCtx.lineWidth = 5;
    gCtx.font = `${txtLine.size}px ${txtLine.font}`;
    gCtx.textAlign = txtLine.align;
    gCtx.strokeStyle = `${txtLine.stroke}`;
    gCtx.strokeText(txtLine.txt, txtLine.pos.x, txtLine.pos.y);
    gCtx.fillStyle = `${txtLine.fill}`;
    gCtx.fillText(txtLine.txt, txtLine.pos.x, txtLine.pos.y);
    txtLine.width = gCtx.measureText(txtLine.text).width;
}

function renderTxtLine() {
    var txtLine = getCurrLine();
    const { pos, size } = txtLine;
    drawText(txtLine, pos.x, pos.y, size);
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function addMouseListeners() {
    gElCanvas.addEventListener("mousemove", onMove);
    gElCanvas.addEventListener("mousedown", onDown);
    gElCanvas.addEventListener("mouseup", onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener("touchmove", onMove);
    gElCanvas.addEventListener("touchstart", onDown);
    gElCanvas.addEventListener("touchend", onUp);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    console.log('click');
    if (!isLineClicked(getLineIdx(), pos)) return;
    setLineDrag(getLineIdx(), true);
    gStartPos = pos;
    gElCanvas.style.cursor = 'grabbing';

}

function onMove(ev) {
    const line = getCurrLine();

    if (line.isDrag) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        gStartPos = pos;
        moveLine(dx, dy, getLineIdx());
        renderMeme();
    }
}

function onUp() {
    setLineDrag(getLineIdx(), false);
    gElCanvas.style.cursor = 'grab';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    };
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        };
    }
    return pos;
}
