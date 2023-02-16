require('dotenv').config();
const { justifyTexts, centerText, rightText, justifyArray } = require("./lineUtils");
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

//jspdf setups
global.window = { document: { createElementNS: () => { return {} } } };
global.navigator = {};
global.btoa = () => { };
global.node = true;

const LINE_HEIGHT = Number(process.env.LINE_HEIGHT)
const PAGE_MARGIN = Number(process.env.PAGE_MARGIN)

const addHeader = function (docWL, pageHeader, index, pageAmount) {

    var doc = docWL[0];

    //line 1
    doc.setFont('SVN-Times New Roman-normal', 'bold');
    doc.setFontSize(12);
    doc.text("TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI", PAGE_MARGIN, docWL[1] * LINE_HEIGHT);
    rightText(docWL, "Trang " + index + " / " + pageAmount);

    //line 2
    doc.setFontSize(16)
    centerText(docWL, pageHeader.templateHeader + " " + pageHeader.semester);

    //line 3
    doc.setFont('SVN-Times New Roman-normal', 'normal');
    doc.setFontSize(12)
    doc.text("Khoa/Viện: " + pageHeader.unit, PAGE_MARGIN, docWL[1] * LINE_HEIGHT);
    rightText(docWL, "Giảng viên: " + pageHeader.teacher);


    //line 4
    //TODO: update splitText rendering mechanism
    var splitTexts = [pageHeader.courseId, pageHeader.courseName, pageHeader.classType, pageHeader.courseId, pageHeader.courseName, pageHeader.classType, pageHeader.courseId, pageHeader.courseName, pageHeader.classType, pageHeader.courseId, pageHeader.courseName, pageHeader.classType, pageHeader.malopthi, pageHeader.courseId, pageHeader.courseName, pageHeader.classType, pageHeader.malopthi, pageHeader.classId, pageHeader.courseId, pageHeader.courseName, pageHeader.classType, pageHeader.malopthi, pageHeader.classId];
    justifyArray(docWL, splitTexts);
}

const getHeaderHeight = (pageHeader) => {
    const doc = new jsPDF();
    const docWL = [doc, 1];
    addHeader(docWL, pageHeader, 1, 1);
    return doc.internal.pageSize.width - 2 * PAGE_MARGIN - (docWL[1] - 1) * LINE_HEIGHT;
}

const getFooterHeight = (pageHeader, chunkSize, studentList) => {
    const doc = new jsPDF();
    doc.addPage();
    const docWL = [doc, 1];

    addHeader(docWL, pageHeader, 1, 1);

    const lastPageChunkLength = studentList.length % chunkSize;

    var studentListChunk = studentList.slice(0, lastPageChunkLength);

    //Add table to PDF
    var yPos = 0
    const line = docWL[1]++;

    doc.autoTable({
        //startX: 50,
        startY: line * LINE_HEIGHT,
        margin: PAGE_MARGIN,
        styles: {
            font: "SVN-Times New Roman-normal",
            overflow: 'linebreak',
        },
        bodyStyles:
        {
            lineColor: Color = 10,
            lineWidth: border = 0.3,
            textColor: 20,
            fontSize: 10
        },
        headStyles:
        {
            fillColor: null,
            textColor: 20,
            border: { top: 1, right: 1, bottom: 1, left: 1 },
            lineWidth: border = 0.3,
            lineColor: Color = 10,
        },
        theme: 'grid',
        body: studentListChunk,
        columns: [
            { header: 'STT', dataKey: 'stt' },
            { header: 'Mã SV', dataKey: 'studentId' },
            { header: 'Họ và tên', dataKey: 'name' },
            { header: 'Lớp SV', dataKey: 'class' },
            { header: 'Điểm', dataKey: 'midterm' },
            { header: 'Ghi chú', dataKey: 'note' },
        ],
        didDrawPage: function (data) {
            yPos = data.cursor.y;
        }
    })
    doc.save("a4.pdf");

    return yPos;
}

const addBodyPage = function (docWL, pageHeader, studentList, index, pageAmount, chunkSize) {
    const doc = docWL[0];
    doc.addPage();
    docWL[1] = 1;

    addHeader(docWL, pageHeader, index, pageAmount);

    var studentListChunk = studentList.slice((index - 1) * chunkSize, index * chunkSize);

    //Add table to PDF
    var yPos = 0
    const line = docWL[1]++;

    doc.autoTable({
        //startX: 50,
        startY: line * LINE_HEIGHT,
        margin: PAGE_MARGIN,
        styles: {
            font: "SVN-Times New Roman-normal",
            overflow: 'linebreak',
        },
        bodyStyles:
        {
            lineColor: Color = 10,
            lineWidth: border = 0.3,
            textColor: 20,
            fontSize: 10
        },
        headStyles:
        {
            fillColor: null,
            textColor: 20,
            border: { top: 1, right: 1, bottom: 1, left: 1 },
            lineWidth: border = 0.3,
            lineColor: Color = 10,
        },
        theme: 'grid',
        body: studentListChunk,
        columns: [
            { header: 'STT', dataKey: 'stt' },
            { header: 'Mã SV', dataKey: 'studentId' },
            { header: 'Họ và tên', dataKey: 'name' },
            { header: 'Lớp SV', dataKey: 'class' },
            { header: 'Điểm', dataKey: 'midterm' },
            { header: 'Ghi chú', dataKey: 'note' },
        ],
        didDrawPage: function (data) {
            yPos = data.cursor.y;
        }
    })
    return yPos
}

const addFooter = async (docWL, pageAmount, yPos) => {
    const doc = docWL[0];

    if (yPos > 250) {
        yPos = PAGE_MARGIN
        doc.addPage();
        docWL[1] = 1;
        doc.setFont('SVN-Times New Roman-normal', 'bold');
        rightText(docWL, "Trang " + pageAmount + " / " + pageAmount);
    }

    yPos = yPos + LINE_HEIGHT
    var dateNow = new Date();
    var day = dateNow.getUTCDate();
    var month = dateNow.getUTCMonth() + 1;
    var year = dateNow.getFullYear();

    doc.setFont('SVN-Times New Roman-normal', 'normal');
    doc.text("Ngày xuất bảng điểm: " + day + "/" + month + "/" + year, PAGE_MARGIN, yPos);
    docWL[1] = yPos / LINE_HEIGHT;
    rightText(docWL, "Cán bộ vào bảng điểm");
}


module.exports = { addBodyPage, addFooter, addHeader, getHeaderHeight, getFooterHeight }