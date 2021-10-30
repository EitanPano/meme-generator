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
            _createImg("img/1.jpg", ['happy', 'goods', 'thanks']),
            _createImg("img/2.jpg", ['funny', 'politics', 'celeb', 'stupid', 'trump']),
            _createImg("img/3.jpg", ['cute', 'happy', 'dogs']),
            _createImg("img/4.jpg", ['cute', 'baby', 'dogs']),
            _createImg("img/5.jpg", ['cute', 'baby', 'win', 'yes']),
            _createImg("img/6.jpg", ['cute', 'cat', 'sleepy', 'tired']),
            _createImg("img/7.jpg", ['happy', 'funny', 'movies', 'celeb']),
            _createImg("img/8.jpg", ['cute', 'baby', 'win', 'evil']),
            _createImg("img/9.jpg", ['funny', 'celeb', 'you', 'caught']),
            _createImg("img/10.jpg", ['funny', 'movies', 'celeb', 'why', 'angry', 'you see']),
            _createImg("img/11.jpg", ['funny', 'movies', 'celeb', 'idk', 'maybe']),
            _createImg("img/12.jpg", ['evil', 'mini', 'peace', 'bold']),
            _createImg("img/13.jpg", ['happy', 'sad', 'dance', 'poor']),
            _createImg("img/14.jpg", ['funny', 'politics', 'celeb', 'stupid', 'trump', 'angry']),
            _createImg("img/15.jpg", ['cute', 'baby', 'surprise', 'really']),
            _createImg("img/16.jpg", ['cute', 'dog', 'stupid', 'tired']),
            _createImg("img/17.jpg", ['happy', 'funny', 'movies', 'celeb', 'obama']),
            _createImg("img/18.jpg", ['happy', 'funny', 'sport', 'celeb', 'kiss', 'gay', 'bro']),
            _createImg("img/19.jpg", ['happy', 'funny', 'movies', 'celeb', 'cheers', 'leonardo dicaprio']),
            _createImg("img/20.jpg", ['funny', 'movies', 'celeb', 'morpheus', 'laurence fishburne', 'matrix', 'angry']),
            _createImg("img/21.jpg", ['funny', 'politics', 'game of thrones', 'dead']),
            _createImg("img/22.jpg", ['happy', 'funny', 'politics', 'oprah winfrey', 'win']),
            _createImg("img/23.jpg", ['funny', 'stupid', 'celeb', 'no way', 'star trek']),
            _createImg("img/24.jpg", ['angry', 'politics', 'not funny', 'putin', 'bad', 'two']),
            _createImg("img/25.jpg", ['funny', 'movies', 'toy story', 'yours', 'you see']),
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

function txtChange(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function txtBigger() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2;
}

function txtSmaller() {
    gMeme.lines[getLineIdx()].size -= 2;
}

function setTxtFont(val) {
    gMeme.lines[getLineIdx()].font = val;
}

// ASK FOR PREFERENCE

// function txtHigher(lineIdx = 0) {
//     gMeme.lines[lineIdx].pos.y -= 2;
// }

// function txtLower(lineIdx = 0) {
//     gMeme.lines[lineIdx].pos.y += 2;
// }

function txtLeft(maxWidth) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = maxWidth / 2 - gMeme.lines[gMeme.selectedLineIdx].width /2;
    // gMeme.lines[lineIdx].align = 'left';
}

function txtCenter(maxWidth) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = maxWidth / 2
    // gMeme.lines[lineIdx].align = 'center';
}

function txtRight(maxWidth) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = maxWidth / 2 + gMeme.lines[gMeme.selectedLineIdx].width /2;
    // gMeme.lines[lineIdx].align = 'right';
}

function txtStroke(color) {
    gMeme.lines[getLineIdx()].stroke = `${color}`;
}

function txtFill(color) {
    gMeme.lines[getLineIdx()].fill = `${color}`;
}

function switchFocus() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1)
        gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx++;
}

function getMeme() {
    return gMeme;
}

function removeLine() {
    if (!gMeme.lines.length) return console.log('No lines, Add Text.')
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function _createImg(url, keywords) {
    const img = {
        id: gId + 1,
        url,
        keywords: keywords,
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

function getCurrLine() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return gMeme.lines[0]
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getLineIdx() {
    if (!gMeme.lines.length) return null;
    return gMeme.selectedLineIdx;
}

function getLines() {
    return gMeme.lines ? gMeme.lines : console.log('No lines, add text.');
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
    if (!gMeme.lines.length) return;
    gMeme.lines[lineIdx].isDrag = isDrag;
}

function moveLine(dx, dy, lineIdx) {
    gMeme.lines[lineIdx].pos.x += dx;
    gMeme.lines[lineIdx].pos.y += dy;
}

function setSelectedLine(idx) {
    gMeme.selectedLineIdx = idx;
}

function noLinesError() {
    console.log('No lines, add text please.')
}
