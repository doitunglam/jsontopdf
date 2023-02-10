require('dotenv').config();
const { justifyTexts, centerText, rightText, rightImage } = require("./lineUtils");

//jspdf setups
global.window = { document: { createElementNS: () => { return {} } } };
global.navigator = {};
global.btoa = () => { };
global.node = true;

const LINE_HEIGHT = Number(process.env.LINE_HEIGHT)
const PAGE_MARGIN = Number(process.env.PAGE_MARGIN)
const CHUNK_SIZE = Number(process.env.CHUNK_SIZE);


const addBodyPage = function (doc, pageHeader, studentList, index, pageAmount) {
    doc.addPage();

    var line = 1

    //line 1
    doc.setFont('SVN-Times New Roman-normal', 'bold');
    doc.setFontSize(12);
    doc.text("TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI", PAGE_MARGIN, line * LINE_HEIGHT);
    rightText(doc, "Trang " + index + " / " + pageAmount, line * LINE_HEIGHT);
    line = line + 1

    //line 2
    doc.setFontSize(16)
    centerText(doc, pageHeader.templateHeader + " " + pageHeader.semester, line * LINE_HEIGHT);
    line = line + 1

    //line 3
    doc.setFont('SVN-Times New Roman-normal', 'normal');
    doc.setFontSize(12)
    doc.text("Khoa/Viện: " + pageHeader.unit, PAGE_MARGIN, line * LINE_HEIGHT);
    rightText(doc, "Giảng viên: " + pageHeader.teacher, line * LINE_HEIGHT);
    line = line + 1

    //line 4
    //TODO: update splitText rendering mechanism
    var splitTexts = [pageHeader.courseId, pageHeader.courseName, pageHeader.classType, pageHeader.malopthi, pageHeader.classId];
    justifyTexts(doc, splitTexts, line * LINE_HEIGHT);
    line = line + 1

    var studentListChunk = studentList.slice((index - 1) * CHUNK_SIZE, index * CHUNK_SIZE);

    //Add table to PDF
    var yPos = 0
    doc.autoTable({
        //startX: 50,
        startY: line * LINE_HEIGHT,
        margin: PAGE_MARGIN,
        styles: {
            font: "SVN-Times New Roman-normal",
            overflow: 'hidden',
        },
        bodyStyles:
        {
            lineColor: Color = 10,
            lineWidth: border = 0.3,
            textColor: 20,
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

const addFooter = async (doc, signatureURL, pageAmount, yPos) => {

    if (yPos > 0) {
        yPos = PAGE_MARGIN
        doc.addPage();
        doc.setFont('SVN-Times New Roman-normal', 'bold');
        rightText(doc, "Trang " + pageAmount + " / " + pageAmount, yPos);
    }

    yPos = yPos + LINE_HEIGHT
    var dateNow = new Date();
    var day = dateNow.getUTCDate();
    var month = dateNow.getUTCMonth() + 1;
    var year = dateNow.getFullYear();

    doc.setFont('SVN-Times New Roman-normal', 'normal');
    doc.text("Ngày xuất bảng điểm: " + day + "/" + month + "/" + year, PAGE_MARGIN, yPos);
    rightText(doc, "Cán bộ vào bảng điểm", yPos);
    //yPos = yPos + LINE_HEIGHT
    //await rightImage(doc, signatureURL, yPos)
}


module.exports = { addBodyPage, addFooter }