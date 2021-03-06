"use strict";

const SAVED_MEMES = "My Memes";

const elMemeEditor = document.querySelector(".meme-editor");
const elGalleryGrid = document.querySelector(".gallery .grid-container");
const elGallery = document.querySelector(".gallery");
const elMyMemesGrid = document.querySelector(".my-memes .grid-container");
const elMyMemes = document.querySelector(".my-memes");

function renderGallery(keyword) {
    const imgs = getImgs();
    if (!keyword) {
        elGalleryGrid.innerHTML = "";
        imgs.map((img) => {
            loadImage(img.url, elGalleryGrid);
        });
    } else {
        elGalleryGrid.innerHTML = "";
        imgs.map((img) => {
            const imgUrl = getUrlByTag(img, keyword);
            if (!imgUrl) return;
            loadImage(imgUrl, elGalleryGrid);
        });
    }
    addClickEvents();
    resetGMeme();
}

function onSetSearch(keyword) {
    renderGallery(keyword);
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

function onMoveToGallery(ev) {
    ev.preventDefault();

    elMemeEditor.classList.add("hidden");
    elMyMemes.classList.add("hidden");
    elGallery.classList.remove("hidden");

    resetGMeme();
}

function onMoveToMyMemes(ev) {
    ev.preventDefault();

    let myMemes = loadFromStorage(SAVED_MEMES);
    if (!myMemes) return console.log("Storage Empty");
    const strHTMLS = myMemes.map((meme) => {
        return `<img src="${meme.url}" class="square">`;
    });

    elMemeEditor.classList.add("hidden");
    elMyMemes.classList.remove("hidden");
    elGallery.classList.add("hidden");
    elMyMemesGrid.innerHTML = strHTMLS.join("");
}

function addClickEvents() {
    setTimeout(() => {
        const elImgs = document.querySelectorAll(
            ".gallery .grid-container img"
        );
        console.log("Imgs are now loaded");
        elImgs.forEach((img) => {
            img.addEventListener("click", () => {
                onSelectMeme(img);
                document.documentElement.scrollTop = 0;
            });
        });
    }, 500);
}

function onSelectMeme(img) {
    let selectedImg = new Image();
    selectedImg.src = img.src;
    gMeme.selectedImg = selectedImg;
    elMemeEditor.classList.remove("hidden");
    elGallery.classList.add("hidden");

    setCanvas();
    renderImg(selectedImg);
    const top = { x: gElCanvas.width / 2, y: 50 };
    const bottom = { x: gElCanvas.width / 2, y: gElCanvas.height - 20 };
    createTxtLine("Enter Text Here", top);
    createTxtLine("Enter Text Here", bottom);
    drawText(gMeme.lines[0]);
    drawText(gMeme.lines[1]);
}

// options
function onTxtAdd() {
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 };
    createTxtLine("Enter Text Here", center);
    renderMeme();
}

function onSaveMeme() {
    const newMeme = gElCanvas.toDataURL("image/jpeg");
    saveMeme(newMeme);
    saveToStorage(SAVED_MEMES, gSavedMemes);
    console.log("Saved");
}

function onDownloadMeme(ev) {
    var button = document.querySelector(".btn-download");

    var dataURL = gElCanvas.toDataURL("image/jpg");
    button.href = dataURL;
}

// Toolbox
function onTxtRemove() {
    removeLine();
    renderMeme();
}

function onTxtChange(val) {
    if (getLineIdx() === null) {
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 };
        createTxtLine(val, center);
    }
    txtChange(val);
    renderMeme();
}

function onTxtBigger() {
    if (getLineIdx() === null) return;
    txtBigger();
    renderMeme();
}

function onTxtSmaller() {
    if (getLineIdx() === null) return;
    txtSmaller();
    renderMeme();
}

function onSetTxtFont(val) {
    if (getLineIdx() === null) return;
    setTxtFont(val);
    console.log(val);
    renderMeme();
}

function onTxtLeft() {
    if (getLineIdx() === null) return;
    txtLeft(gElCanvas.width);
    drawFocus();
    renderMeme();
}

function onTxtCenter() {
    if (getLineIdx() === null) return;
    txtCenter(gElCanvas.width);
    renderMeme();
}

function onTxtRight() {
    if (getLineIdx() === null) return;
    txtRight(gElCanvas.width);
    renderMeme();
}

function onTxtStroke(color) {
    if (getLineIdx() === null) return;
    txtStroke(color);
    renderMeme();
}

function onTxtFill(color) {
    if (getLineIdx() === null) return;
    txtFill(color);
    renderMeme();
}

function renderMeme() {
    gCtx.drawImage(gMeme.selectedImg, 0, 0, gElCanvas.width, gElCanvas.height);
    if (!gMeme.lines) return console.log("gMeme has no lines");
    gMeme.lines.forEach((line) => drawText(line));
    drawFocus();
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
