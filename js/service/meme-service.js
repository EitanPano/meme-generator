"use strict";

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



//  [{ id: 1, url: "img/1.jpg", keywords: ["happy"] }];

function _createImg() {
    const img = {
        id: 1,
        imgUrl,
        keywords: ['happy'],
    };
    return img;
}