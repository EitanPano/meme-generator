"use strict";

const IMGS_KEY = "Images DB";

let gSavedMemes = [];
let gKeywords = { happy: 12, "funny puk": 1 };
let gImgs;
let gMeme = {
    selectedImg: {},
    selectedLineIdx: 0,
    lines: [],
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

function createTxtLine(
    txt,
    pos,
    size = 48,
    font = "Impact",
    fill = "white",
    stroke = "black"
) {
    gMeme.lines.push({
        txt,
        pos,
        size,
        font,
        fill,
        stroke,
        align: "center",
        isDrag: false,
    });
}

function saveMeme(img) {
    gSavedMemes.push({ url: img });
}

function loadSavedMemes() {
    let savedMemes = loadFromStorage(SAVED_MEMES);
    if (!savedMemes) return;
    gSavedMemes = savedMemes;
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
    gMeme.lines[lineIdx].pos.y -= 2;
}

function txtLower(lineIdx = 0) {
    gMeme.lines[lineIdx].pos.y += 2;
}

function txtLeft(lineIdx = 0) {
    gMeme.lines[lineIdx].align = 'right';
}

function txtCenter(lineIdx = 0) {
    gMeme.lines[lineIdx].align = 'center';
}

function txtRight(lineIdx = 0) {
    gMeme.lines[lineIdx].align = 'left';
}

function txtStroke(lineIdx = 0, color) {
    gMeme.lines[lineIdx].stroke = `${color}`;
}

function txtFill(lineIdx = 0, color) {
    gMeme.lines[lineIdx].fill = `${color}`;
}

function switchFocus() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1)
        gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx++;
}

function getMeme() {
    return gMeme;
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

function removeLine() {
    if (!gMeme.lines.length) return console.log('No lines, Add Text.')
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function _saveImgsToStorage() {
    saveToStorage(IMGS_KEY, gImgs);
}

function getImgs() {
    return gImgs;
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getLineIdx() {
    return gMeme.selectedLineIdx;
}

function getLines() {
    return gMeme.lines;
}

function isLineClicked(lineIdx, clickedPos) {
    const { pos } = gMeme.lines[lineIdx];
    const isInnerWidth =
        clickedPos.x <= pos.x + gMeme.lines[lineIdx].width &&
        clickedPos.x >= pos.x - gMeme.lines[lineIdx].width;
    const isInnerHight =
        clickedPos.y <= pos.y + gMeme.lines[lineIdx].size / 5 &&
        clickedPos.y >= pos.y - gMeme.lines[lineIdx].size;

    return isInnerWidth && isInnerHight;
}

function setLineDrag(lineIdx, isDrag) {
    gMeme.lines[lineIdx].isDrag = isDrag;
}

function moveLine(dx, dy, lineIdx) {
    gMeme.lines[lineIdx].pos.x += dx;
    gMeme.lines[lineIdx].pos.y += dy;
}

function setSelectedLine(idx) {
    gMeme.selectedLineIdx = idx;
}
