"use strict";

const IMGS_KEY = "Images DB";

let gKeywords = { happy: 12, "funny puk": 1 };
let gImgs;
let gMeme = {
    selectedImg: {},
    selectedLineIdx: 0,
    lines: [
        {
            txt: "Enter Text Here",
            size: 48,
            x: 0,
            y: 50,
            align: "center",
            color: "white",
            border: "black",
        },
        {
            txt: "Enter Text Here",
            size: 48,
            x: 0,
            y: 50 - 30,
            align: "center",
            color: "white",
            border: "black",
        },
    ],
};
let gId = 0;

_createImgs();

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

function txtChange(txt, lineIdx = 0) {
    gMeme.lines[lineIdx].txt = txt;
}

function txtBigger(lineIdx = 0) {
    gMeme.lines[lineIdx].size += 2;
}

function txtSmaller(lineIdx = 0) {
    gMeme.lines[lineIdx].size -= 2;
}

function txtHigher(lineIdx = 0) {
    gMeme.lines[lineIdx].y -= 2;
}

function txtLower(lineIdx = 0) {
    gMeme.lines[lineIdx].y += 2;
}

function switchFocus() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx++;
}

function _createImg(url) {
    const img = {
        id: gId + 1,
        url,
        keywords: ["happy"],
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

function getLineIdx() {
    return gMeme.selectedLineIdx;
}
