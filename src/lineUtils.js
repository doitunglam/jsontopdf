require('dotenv').config();

const PAGE_MARGIN = Number(process.env.PAGE_MARGIN)
const JUSTIFY_SPACE_MIN = Number(process.env.JUSTIFY_SPACE_MIN)
const LINE_SPACING = Number(process.env.LINE_SPACING)


const justifyArray = (docWL, texts) => {
    const doc = docWL[0];
    texts = texts.filter(item => item)
    var currArr = [];
    const docWidth = doc.internal.pageSize.width - 2 * PAGE_MARGIN;
    var textLengthSum = 0
    for (index in texts) {
        const text = texts[index]
        const textLength = doc.getStringUnitWidth(texts[index]) * doc.internal.getFontSize() / doc.internal.scaleFactor
        if (textLengthSum + textLength > docWidth) {
            justifyTexts(docWL, currArr);
            currArr = [];
            textLengthSum = textLength;
            currArr.push(text);
        } else {
            currArr.push(text);
            textLengthSum = textLengthSum + textLength + JUSTIFY_SPACE_MIN
        }
    }
    if (currArr) {
        justifyTexts(docWL, currArr);
        textLengthSum = 0
    }
}


const justifyTexts = (docWL, texts) => {
    const doc = docWL[0]
    const upperY = docWL[1]
    var textHeight = 0
    texts = texts.filter(item => item)
    var startX = PAGE_MARGIN
    var pageWidth = doc.internal.pageSize.getWidth();
    var lengthSum = 0;
    for (index in texts) {
        const text = texts[index]
        const textDimension = doc.getTextDimensions(text);
        const textWidth = textDimension.w
        textHeight = textDimension.h
        lengthSum = lengthSum + textWidth
    }
    const spaceSum = pageWidth - lengthSum - 2 * PAGE_MARGIN;
    if (texts.length != 1)
        var avgSpace = spaceSum / (texts.length - 1);
    else var avgSpace = 0;
    for (index in texts) {
        const text = texts[index]
        const textDimension = doc.getTextDimensions(text)
        const textWidth = textDimension.w
        doc.text(text, startX, upperY + textHeight)
        startX = startX + avgSpace + textWidth
    }
    docWL[1] = upperY + textHeight + LINE_SPACING
}

var centerText = (docWL, text) => {
    const doc = docWL[0];
    const upperY = docWL[1];
    const textDimension = doc.getTextDimensions(text);
    const textWidth = textDimension.w;
    const textHeight = textDimension.h;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, upperY + textHeight, text);
    docWL[1] = upperY + textHeight + LINE_SPACING

}

var rightText = (docWL, text) => {
    const doc = docWL[0];
    const upperY = docWL[1];
    const textDimension = doc.getTextDimensions(text);
    const textWidth = textDimension.w;
    const textHeight = textDimension.h;
    var textOffset = (doc.internal.pageSize.width - textWidth) - PAGE_MARGIN;
    doc.text(textOffset, upperY + textHeight, text);
    docWL[1] = upperY + textHeight + LINE_SPACING
}

//isUnderline flag denotes the text has a ruler at the bottom of text
var leftText = (docWL, text, isUnderline) => {
    const doc = docWL[0]
    let upperY = docWL[1]    
    var dim = doc.getTextDimensions(text);
    const textWidth = dim.w
    const textHeight = dim.h
    doc.text(text, PAGE_MARGIN, upperY + textHeight);
    upperY = upperY + textHeight 

    if (isUnderline) {
        const UNDERLINE_SPACE_UNDER = Number(process.env.UNDERLINE_SPACE_UNDER)
        const UNDERLINE_SPACE_LEFT = Number(process.env.UNDERLINE_SPACE_LEFT)
        const UNDERLINE_SPACE_RIGHT = Number(process.env.UNDERLINE_SPACE_RIGHT)
        const startX = PAGE_MARGIN + UNDERLINE_SPACE_LEFT
        const startY = upperY + UNDERLINE_SPACE_UNDER
        const finishX = PAGE_MARGIN + textWidth - UNDERLINE_SPACE_RIGHT
        const finishY = upperY + UNDERLINE_SPACE_UNDER
        doc.line(startX, startY, finishX, finishY);
    }
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