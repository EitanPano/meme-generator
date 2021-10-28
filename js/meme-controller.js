"use strict";

const elGallery = document.querySelector(".gallery .grid-container");
const elMemeEditor = document.querySelector('.meme-editor');

function renderGallery() {
    const imgs = getImgs();
    imgs.map((img) => {
        loadImage(img.url, elGallery);
    });
}

function loadImage(url, el) {
    const imgSrc = url;
    const img = new Image();
    img.src = imgSrc;
    img.onload = function () {
        el.appendChild(img);
        if (img.naturalWidth > img.naturalHeight * 1.3)
            img.classList.add("h-rect");
        else if (img.naturalHeight > img.naturalWidth)
            img.classList.add("v-rect");
        else img.classList.add("square");
    };
}

function addClickEvents() {
    setTimeout(() => {
        const elImgs = document.querySelectorAll(
            ".gallery .grid-container img"
        );
        console.log(elImgs);
        elImgs.forEach((img) => {
            img.addEventListener("click", () => {
                onSelectMeme(img);
                document.documentElement.scrollTop = 0;
            });
        });
    }, 750);
}

function onSelectMeme(img) {
    elMemeEditor.classList.remove('hidden');
    let selectedImg = new Image();
    selectedImg.src = img.src;
    selectedImg.width = img.naturalWidth;
    selectedImg.height = img.naturalHeight;

    gMeme.selectedImg = selectedImg;
    setCanvas();
    renderImg(gMeme.selectedImg);
    drawText(gMeme.lines[0].txt, gMeme.width / 2, gMeme.lines[0].y, gMeme.lines[0].size);
    drawText(gMeme.lines[1].txt, gMeme.width / 2,gElCanvas.height - gMeme.lines[1].y, gMeme.lines[1].size);
    // drawText(gMeme.lines[1].txt, gMeme.width / 2, gElCanvas.height - 30);
}

function onTxtChange(val) {
    txtChange(val, getLineIdx());
    renderMeme();
}

function onTxtBigger() {
    txtBigger();
    renderMeme();
}

function onTxtSmaller() {
    txtSmaller();
    renderMeme();
}

function onTxtHigher() {
    txtHigher();
    renderMeme();
}

function onTxtLower() {
    txtLower();
    renderMeme();
}

function onSwitchFocus() {
    switchFocus();
    renderMeme();
}

function renderMeme() {
    gCtx.drawImage(gMeme.selectedImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(gMeme.lines[0].txt, gMeme.width / 2, gMeme.lines[0].y, gMeme.lines[0].size);
    drawText(gMeme.lines[1].txt, gMeme.width / 2,gElCanvas.height - gMeme.lines[1].y, gMeme.lines[0].size);
}

function renderImg(img) {
    const newImg = setImgAspectRatio(img);
    gMeme.width = gElCanvas.width = img.width;
    gMeme.height = gElCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function setImgAspectRatio(img) {
    if (img.width < gElCanvas.width && img.height < gElCanvas.height)
        return img;

    if (img.width > gElCanvas.width || img.height > gElCanvas.height) {
        img.width = img.width / 1.2;
        img.height = img.height / 1.2;
    }
    setImgAspectRatio(img);
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


