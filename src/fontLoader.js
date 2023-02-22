const fs = require('fs')

//UTF-8 font loader for jsPDF
const font = fs.readFileSync("./res/font.txt").toString('utf-8');
const fontb = fs.readFileSync("./res/fontb.txt").toString('utf-8');

const callAddFont = function () {
    this.addFileToVFS('SVN-Times New Roman-normal-normal.ttf', font);
    this.addFont('SVN-Times New Roman-normal-normal.ttf', 'SVN-Times New Roman-normal', 'normal');
    this.addFileToVFS('SVN-Times New Roman-normal.ttf', fontb);
    this.addFont('SVN-Times New Roman-normal.ttf', 'SVN-Times New Roman-normal', 'bold');
};

module.exports = { callAddFont }