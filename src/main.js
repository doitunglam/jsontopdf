const { jsPDF } = require('jspdf');
require('jspdf-autotable');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { callAddFont } = require('./fontLoader')
const { addBodyPage, addFooter, getTableChunkSize, canLastPageContainsFooter } = require('./pageUtils');
const { loadOptions } = require('./lineUtils');
const { studentsPreprocess } = require('./preprocessUtils');
const { splitArray } = require('./utils');

//create new Express App
var app = express();

//POST body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add UTF-8 font
jsPDF.API.events.push(['addFonts', callAddFont])

//POST request handling
app.post('/:key', function (request, reply) {

   //load document option based on route
   const OPTIONS = loadOptions(request.params.key);
   if (OPTIONS.error == true) { reply.sendStatus(400); return }

   //Reading & Analyzing request
   var studentList = request.body.students;
   var pageHeader = request.body;
   pageHeader.templateHeader = OPTIONS.header;
   try {
      studentsPreprocess(studentList);
   }
   catch (err) {
      reply.statusMessage = err.message;
      reply.status(400).end();
      return
   }

   //student indexing
   for (var i = 0; i < studentList.length; i++)
      studentList[i].stt = i + 1;

   //precalculate the amount of student in one page
   const chunkSize = getTableChunkSize(pageHeader)
   const splitedStudentList = splitArray(studentList, chunkSize)

   //Create new PDF document with line pointer
   //Compress the document
   const doc = new jsPDF({ compress: true });
   doc.deletePage(1);
   var line = 1;

   const pdfDocWithLinePointer = [doc, line];

   const bodyPageAmount = Math.ceil(studentList.length / chunkSize);
   let allPageAmount = bodyPageAmount;


   // increase page amount if the remaining height is not sufficient
   if (!canLastPageContainsFooter(pageHeader, chunkSize, studentList))
      allPageAmount = allPageAmount + 1;
   for (var i = 1; i <= bodyPageAmount; i++)
      yPos = addBodyPage(pdfDocWithLinePointer, pageHeader, splitedStudentList[i - 1], i, allPageAmount);

   addFooter(pdfDocWithLinePointer, allPageAmount, yPos);

   //send response back to client
   var responseBuffer = doc.output('arraybuffer');
   reply.setHeader('Content-Type', 'application/pdf')
   reply.send(Buffer.from(responseBuffer));

})

app.listen(process.env.PORT)
