"use strict";

const IMGS_KEY = "Images DB";

let gKeywords = { happy: 12, "funny puk": 1 };
let gImgs;
let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: "I never eat Falafel",
            size: 20,
            align: "left",
            color: "red",
        },
    ],
};
let gId = 0;

_createImgs();
//  [{ id: 1, url: "img/1.jpg", keywords: ["happy"] }];

function _createImgs() {
    let imgs = loadFromStorage(IMGS_KEY);
    if (!imgs || !imgs.length) {
        imgs = [
            _createImg("img/1.jpg"),
            _createImg("img/2.jpg"),
            _createImg("img/3.jpg"),
            _createImg("img/4.jpg"),
            _createImg("img/5.jpg"),
            _createImg("img/6.jpg"),
            _createImg("img/7.jpg"),
            _createImg("img/8.jpg"),
            _createImg("img/9.jpg"),
            _createImg("img/10.jpg"),
            _createImg("img/11.jpg"),
            _createImg("img/12.jpg"),
            _createImg("img/13.jpg"),
            _createImg("img/14.jpg"),
            _createImg("img/15.jpg"),
            _createImg("img/16.jpg"),
            _createImg("img/17.jpg"),
            _createImg("img/18.jpg"),
            _createImg("img/19.jpg"),
            _createImg("img/20.jpg"),
            _createImg("img/21.jpg"),
            _createImg("img/22.jpg"),
            _createImg("img/23.jpg"),
            _createImg("img/24.jpg"),
            _createImg("img/25.jpg"),
        ];
    }
    gImgs = imgs;
    _saveImgsToStorage();
}

function _createImg(url) {
    const img = {
        id: gId + 1,
        url,
        keywords: ["happy"],
        // shape: getShape(url),
    };

    gId++;
    return img;
}

function _saveImgsToStorage() {
    saveToStorage(IMGS_KEY, gImgs);
}

function getImgs() {
    return gImgs;
}
