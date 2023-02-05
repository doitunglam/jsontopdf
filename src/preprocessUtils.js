require('dotenv').config
const {trimString} = require('./utils')

const STUDENTID_REGEX = new RegExp(process.env.STUDENTID_REGEX)
const NAME_MAX = process.env.NAME_MAX
const CLASS_MAX = process.env.CLASS_MAX
const MIDTERM_MAX = process.env.MIDTERM_MAX
const NOTE_MAX = process.env.MIDTERM_MAX

const studentsPreprocess = (students) => {
    for (student of students) {
        console.log(student);
        if (STUDENTID_REGEX.test(student.studentId) == false) {
            throw new Error("Invalid StudentId");
        }
        trimString(student.name, NAME_MAX);
        trimString(student.class, CLASS_MAX);
        trimString(student.midterm, MIDTERM_MAX);
        trimString(student.note, NOTE_MAX);
    }
}

module.exports = { studentsPreprocess }