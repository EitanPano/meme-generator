"use strict";

const SAVED_MEMES = "My Memes";

const elMemeEditor = document.querySelector(".meme-editor");
const elGalleryGrid = document.querySelector(".gallery .grid-container");
const elGallery = document.querySelector(".gallery");
const elMyMemesGrid = document.querySelector(".my-memes .grid-container");
const elMyMemes = document.querySelector(".my-memes");

function renderGallery() {
    const imgs = getImgs();
    imgs.map((img) => {
        loadImage(img.url, elGalleryGrid);
    });
}

function onMoveToGallery(ev) {
    ev.preventDefault();

    elMemeEditor.classList.add("hidden");
    elMyMemes.classList.add("hidden");
    elGallery.classList.remove("hidden");
}

function onMoveToMyMemes(ev) {
    ev.preventDefault();

    let myMemes = loadFromStorage(SAVED_MEMES);
    if (!myMemes) return console.log('Storage Empty');
    const strHTMLS = myMemes.map((meme) => {
        return `<img src="${meme.url}" class="square">`
    });

    elMemeEditor.classList.add("hidden");
    elMyMemes.classList.remove("hidden");
    elGallery.classList.add("hidden");

    elMyMemesGrid.innerHTML = strHTMLS.join('');
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
        console.log('Imgs are now loaded');
        elImgs.forEach((img) => {
            img.addEventListener("click", () => {
                onSelectMeme(img);
                document.documentElement.scrollTop = 0;
            });
        });
    }, 750);
}

function onSelectMeme(img) {
    elMemeEditor.classList.remove("hidden");
    let selectedImg = new Image();
    selectedImg.src = img.src;
    selectedImg.width = img.naturalWidth;
    selectedImg.height = img.naturalHeight;

    elGallery.classList.add("hidden");
    gMeme.selectedImg = selectedImg;
    setCanvas();
    const top = { x: gElCanvas.width / 2, y: 50};
    createTxtLine('Enter Text Here', top);
    renderImg(gMeme.selectedImg);
    drawText(gMeme.lines[0]);
    // drawText(gMeme.lines[1]);
}

// options

function onSaveMeme() {
    const newMeme = gElCanvas.toDataURL('image/jpeg');
    saveMeme(newMeme);
    saveToStorage(SAVED_MEMES, gSavedMemes);
    console.log("Saved");
}

// Toolbox
function onTxtChange(val) {
    txtChange(val, getLineIdx());
    renderMeme();
}

function onTxtBigger() {
    txtBigger(getLineIdx());
    renderMeme();
}

function onTxtSmaller() {
    txtSmaller(getLineIdx());
    renderMeme();
}

function onTxtHigher() {
    txtHigher(getLineIdx());
    renderMeme();
}

function onTxtLower() {
    txtLower(getLineIdx());
    renderMeme();
}

function onSwitchFocus() {
    switchFocus(getLineIdx());
    renderMeme();
}

function renderMeme() {
    gCtx.drawImage(gMeme.selectedImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(
        gMeme.lines[0]
        // gMeme.lines[0].txt,
        // gMeme.lines[0].pos.x,
        // gMeme.lines[0].pos.y,
        // gMeme.lines[0].size,
    );
    // drawText(
    //     gMeme.lines[1].txt,
    //     gMeme.width / 2,
    //     gElCanvas.height - gMeme.lines[1].y,
    //     gMeme.lines[1].size
    // );
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