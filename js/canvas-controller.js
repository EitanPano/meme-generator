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
    gElCanvas.width = gElCanvas.width - 100;
    gElCanvas.height = gElCanvas.height - 100;
}

function resizeCanvas() {
    const elContainer = document.querySelector(".canvas-container");
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
function onImgInput(ev) {
    resizeCanvas();
    loadImageFromInput(ev, renderImg);
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector(".share-container").innerHTML = "";
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img);
        img.src = event.target.result;
    };
    reader.readAsDataURL(ev.target.files[0]);
}

function renderImg(img) {
    const newImg = setImgAspectRatio(img);
    console.log(img.width);
    gElCanvas.width = img.width;
    gElCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function setImgAspectRatio(img) {
    if (img.width < gElCanvas.width && img.height < gElCanvas.height) return img;

    if (img.width > gElCanvas.width || img.height > gElCanvas.height) {
        img.width = img.width / 1.2;
        img.height = img.height / 1.2;
    }
    setImgAspectRatio(img);
}