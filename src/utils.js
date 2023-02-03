require('dotenv').config();
const { jsPDF } = require("jspdf");
const axios = require('axios');
const fs = require('fs');
const sizeOf = require('image-size')


const PAGE_MARGIN = Number(process.env.PAGE_MARGIN)

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
    const avgSpace = spaceSum / (texts.length - 1);
    for (index in texts) {
        const text = texts[index]
        const textLength = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor
        doc.text(text, startX, y)
        startX = startX + avgSpace + textLength;

    }
}

var centerText = (doc, text, y) => {
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
}

var rightText = (doc, text, y) => {
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) - PAGE_MARGIN;
    doc.text(textOffset, y, text);
}

var rightImage = async (doc, imgURL, y) => {

    const resp = await axios
        .get(imgURL, {
            responseType: "text",
            responseEncoding: "base64",
        })

    if (resp.status == 200) {
        const imgSize = sizeOf(Buffer.from(resp.data, 'base64'))
        const imgRatio = imgSize.width / imgSize.height
        var imgHeight = Number(process.env.IMG_HEIGHT)
        var imgWidth = Number(process.env.IMG_WIDTH)

        if (imgRatio <= 1) imgWidth = imgHeight * imgRatio
        else imgHeight = imgWidth * imgRatio

        const data = 'data:image/jpeg;base64,' + resp.data
        const x = doc.internal.pageSize.width - PAGE_MARGIN - imgWidth
        doc.addImage(data, 'JPEG', x, y - 5, imgWidth, imgHeight)
    }
    else {
        console.log(`Image fetch error. Error code: ${resp.status}`)
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



module.exports = { justifyTexts, centerText, rightText, loadOptions, rightImage }