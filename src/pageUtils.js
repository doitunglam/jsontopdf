require('dotenv').config();
const { centerText, rightText, justifyArray, leftText } = require("./lineUtils");
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

//jspdf setups
global.window = { document: { createElementNS: () => { return {} } } };
global.navigator = {};
global.btoa = () => { };
global.node = true;

const LINE_HEIGHT = Number(process.env.LINE_HEIGHT)
const PAGE_MARGIN = Number(process.env.PAGE_MARGIN)
const TABLE_CELL_HEIGHT = Number(process.env.TABLE_CELL_HEIGHT)
const FOOTER_MINIMUM_HEIGHT = Number(process.env.FOOTER_MINIMUM_HEIGHT)

// add header for a pdfDoc with line.
// index 
const addHeader = (docWL, pageHeader, pageIndex, pageAmount) => {

    const doc = docWL[0];

    //line 1
    doc.setFont('SVN-Times New Roman-normal', 'bold');
    doc.setFontSize(12);
    const universityName = "TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI"
    const pageIndexText = "Trang " + pageIndex + " / " + pageAmount
    leftText(docWL, universityName, 1)
    rightText(docWL, pageIndexText);

    //line 2
    const pageHeaderTitle = pageHeader.templateHeader + " " + pageHeader.semester
    doc.setFontSize(16)
    centerText(docWL, pageHeaderTitle);

    //line 3
    doc.setFont('SVN-Times New Roman-normal', 'normal');
    doc.setFontSize(12)
    const facultyText = "Khoa/Viện: " + pageHeader.unit
    const lecturerText = "Giảng viên: " + pageHeader.teacher
    justifyArray(docWL, [facultyText, lecturerText])

    //line 4
    var examClass;
    var classId;
    //null guard
    if (pageHeader.malopthi) examClass = "Lớp thi: " + pageHeader.malopthi;
    if (pageHeader.classId) classId = "Lớp học: " + pageHeader.classId;

    const courseId = pageHeader.courseId
    const courseName = pageHeader.courseName
    const eduProgram = pageHeader.eduProgram
    const classType = pageHeader.classType


    var couseDetailArray = [courseId, courseName, eduProgram, classType, examClass, classId];
    justifyArray(docWL, couseDetailArray);
}

const getTableChunkSize = (pageHeader) => {
    const doc = new jsPDF();
    const docWL = [doc, 1];
    addHeader(docWL, pageHeader, 1, 1);
    const HEADER_HEIGHT = (docWL[1] - 1) * LINE_HEIGHT
    const PAGE_INNER_HEIGHT = doc.internal.pageSize.height - 2 * PAGE_MARGIN
    const TABLE_HEIGHT = (PAGE_INNER_HEIGHT - HEADER_HEIGHT)
    return Math.floor(TABLE_HEIGHT / TABLE_CELL_HEIGHT);
}

const canLastPageContainsFooter = (pageHeader, chunkSize, studentList) => {

    const doc = new jsPDF();

    //add new page and set line pointer to 1
    doc.addPage();
    const docWL = [doc, 1];

    const PAGE_HEIGHT = doc.internal.pageSize.height

    addHeader(docWL, pageHeader, 1, 1);

    const LAST_PAGE_TABLE_HEIGHT = (studentList.length % chunkSize) * TABLE_CELL_HEIGHT;

    const LINE = docWL[1]++;

    const RENDERED_SPACE_HEIGHT = LINE * LINE_HEIGHT + PAGE_MARGIN + LAST_PAGE_TABLE_HEIGHT;

    if (RENDERED_SPACE_HEIGHT + FOOTER_MINIMUM_HEIGHT < PAGE_HEIGHT) {
        return true
    }
    return false
}

const addBodyPage = (docWL, pageHeader, studentList, index, pageAmount) => {
    const doc = docWL[0];
    doc.addPage();
    docWL[1] = 1;

    addHeader(docWL, pageHeader, index, pageAmount);


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
        body: studentList,
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

const addFooter = (docWL, pageAmount, yPos) => {
    const doc = docWL[0];

    const PAGE_HEIGHT = doc.internal.pageSize.height

    // if the remaining height is too litte, add new page
    if (yPos + FOOTER_MINIMUM_HEIGHT > PAGE_HEIGHT) {
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

module.exports = { addBodyPage, addFooter, addHeader, getTableChunkSize, canLastPageContainsFooter }