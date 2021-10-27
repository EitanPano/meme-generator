"use strict";

const elGallery = document.querySelector('.gallery .grid-container');

function renderGallery() {
    const imgs = getImgs();
    const strHTML = imgs.map((img) => {
        loadImage(img.url, elGallery)
        // console.log(img.shape);
        // return `
        // <img class="square" src="${img.url}" alt="">
        // `;
    
    });
    document.querySelector(".gallery .grid-container").innerHTML = strHTML.join('');
}

function getShapes() {
    const imgs = document.querySelectorAll('.gallery img');

    imgs.forEach(img => {
        console.log(img.naturalWidth, img.naturalHeight);
        if (img.naturalHeight > img.naturalWidth * 1.3) console.log('hi');
    })
}


function loadImage(url, el) {
    const imgSrc = url
    const img = new Image();
    img.src = imgSrc;
    img.onload = function() {

      el.appendChild(img); // You can get the image ratio without inserting the image in body
    //   alert('Image ratio' + img.width/img.height);
    console.log(img);
    console.log(img.naturalWidth, img.naturalHeight);
    if (img.naturalWidth > img.naturalHeight * 1.2) img.classList.add('h-rect')
    else if (img.naturalHeight > img.naturalWidth) img.classList.add('v-rect')
    else img.classList.add('square');
    }
  }