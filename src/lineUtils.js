require('dotenv').config();

const PAGE_MARGIN = Number(process.env.PAGE_MARGIN)
const LINE_HEIGHT = Number(process.env.LINE_HEIGHT)
const JUSTIFY_SPACE_MIN = Number(process.env.JUSTIFY_SPACE_MIN)



//Refactor + Ex Handling 


const justifyArray = (docWL, texts) => {
    const doc = docWL[0];
    var line = docWL[1];
    texts = texts.filter(item => item)
    var currArr = [];
    const docLength = doc.internal.pageSize.width - 2 * PAGE_MARGIN;
    var lengthSum = 0
    for (index in texts) {
        const text = texts[index]
        const textLength = doc.getStringUnitWidth(texts[index]) * doc.internal.getFontSize() / doc.internal.scaleFactor
        if (lengthSum + textLength > docLength ) {
            justifyTexts(doc, currArr, line * LINE_HEIGHT);
            line = line + 1;
            currArr = [];
            lengthSum = textLength;
            currArr.push(text);
        } else {
            currArr.push(text);
            lengthSum = lengthSum + textLength + JUSTIFY_SPACE_MIN
        }
    }
    if (currArr) {
        justifyTexts(doc, currArr, line * LINE_HEIGHT);
        line = line + 1;
        lengthSum = 0
    }
    docWL[1] = line;
}


const justifyTexts = (doc, texts, y) => {
    texts = texts.filter(item => item)
    var startX = PAGE_MARGIN
    var width = doc.internal.pageSize.getWidth();
    var lengthSum = 0;
    for (index in texts) {
        const text = texts[index]
        const textLength = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor
        lengthSum = lengthSum + textLength
    }
    const spaceSum = width - lengthSum - 2 * PAGE_MARGIN;
    //TODO: handling divide-by-zero
    if (texts.length != 1)
        var avgSpace = spaceSum / (texts.length - 1);
    else var avgSpace = 0;
    for (index in texts) {
        const text = texts[index]
        const textLength = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor
        doc.text(text, startX, y)
        startX = startX + avgSpace + textLength;

    }
}

var centerText = (docWL, text) => {
    const doc = docWL[0];
    const line = docWL[1];
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, line * LINE_HEIGHT, text);
    docWL[1] = line + 1;

}

var rightText = (docWL, text, isUnderline) => {
    const doc = docWL[0];
    const line = docWL[1];
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) - PAGE_MARGIN;
    doc.text(textOffset, line * LINE_HEIGHT, text);
    docWL[1] = line + 1;
}

//there is no sanity left here, sorry for this mess
var leftText = (docWL, text, isUnderline) => {
    const doc = docWL[0];
    const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    doc.text(text, PAGE_MARGIN, docWL[1] * LINE_HEIGHT);
    if (isUnderline)
        doc.line(PAGE_MARGIN + 4, docWL[1] * LINE_HEIGHT + 2, PAGE_MARGIN + textWidth - 4, docWL[1] * LINE_HEIGHT + 2);
}

const loadOptions = (key) => {
    var templateOptions;
    switch (key) {
        case 'endterm':
            templateOptions = require('../res/cuoiky.json')
            break;
        case 'midterm':
            templateOptions = require('../res/quatrinh.json')
            break;
        default:
            templateOptions = { error: true }
    }
    return templateOptions
}



module.exports = { justifyTexts, centerText, rightText, loadOptions, justifyArray, leftText }