require('dotenv').config
const { trimString } = require('./utils')


const STUDENTID_REGEX = new RegExp(process.env.STUDENTID_REGEX)
const NAME_MAX = Number(process.env.NAME_MAX)
const CLASS_MAX = Number(process.env.CLASS_MAX)
const MIDTERM_MAX = Number(process.env.MIDTERM_MAX)
const NOTE_MAX = Number(process.env.NOTE_MAX)

const studentsPreprocess = (students) => {
    for (student of students) {
        if (STUDENTID_REGEX.test(student.studentId) == false) {
            throw new Error("Invalid StudentId");
        }
        student.name = trimString(student.name, NAME_MAX);
        student.class = trimString(student.class, CLASS_MAX);
        student.midterm = trimString(student.midterm, MIDTERM_MAX);
        student.note = trimString(student.note, NOTE_MAX);
    }
}


module.exports = { studentsPreprocess }