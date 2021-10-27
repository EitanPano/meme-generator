"use strict";

const elGallery = document.querySelector(".gallery .grid-container");

function renderGallery() {
    const imgs = getImgs();
    const strHTML = imgs.map((img, idx) => {
        loadImage(img.url, elGallery);

    });

}

function addClickEvents() {
    setTimeout(() => {
        const elImgs = document.querySelectorAll(
            ".gallery .grid-container img"
        );
        console.log(elImgs);
        elImgs.forEach((img) => {
            img.addEventListener("click", () => {
                selectMeme(img);
            });
        });
    }, 750);
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

function selectMeme(img) {
    let selected = new Image();
    selected.src = img.src;
    selected.width = img.naturalWidth;
    selected.height = img.naturalHeight;
    resizeCanvas()
    renderImg(selected)
}

// function setImgAspectRatio(img) {
//     // console.log(img.src);
//     if (img.naturalWidth < gElCanvas.width && img.naturalHeight < gElCanvas.height) return img;

//     if (img.naturalWidth > gElCanvas.width || img.naturalHeight > gElCanvas.height) {
//         img.width = img.naturalWidth / 1.2;
//         img.height = img.naturalHeight / 1.2;
//     }
//     setImgAspectRatio(img);
// }
