const { jsPDF } = require('jspdf');
require('jspdf-autotable');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { callAddFont } = require('./fontLoader')
const { addBodyPage, addFooter, getHeaderHeight, getFooterHeight } = require('./pageUtils');
const { loadOptions } = require('./lineUtils');
const { studentsPreprocess } = require('./preprocessUtils');

//create new Express App
var app = express();

//getting page configuration

//POST body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add UTF-8 font
jsPDF.API.events.push(['addFonts', callAddFont])

//POST request handling
app.post('/:key', function (request, reply) {
   const OPTIONS = loadOptions(request.params.key);
   if (OPTIONS.error == true) { reply.sendStatus(400); return }
   //console.time("dbsave");

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
   //precalculate the amount of page will be used
   const headerHeight = getHeaderHeight(pageHeader);
   var chunkSize = headerHeight / 5.3;
   const footerHeight = getFooterHeight(pageHeader, chunkSize, studentList);

   //student indexing
   for (var i = 0; i < studentList.length; i++)
      studentList[i].stt = i + 1;


   //Create new PDF with line index
   const doc = new jsPDF({ compress: true });
   doc.deletePage(1);
   var line = 1;
   const docWL = [doc, line];

   //
   pageAmount = Math.ceil(studentList.length / chunkSize);
   if (footerHeight > 250.0) {
      pageAmount = pageAmount + 1;
      for (var i = 1; i < pageAmount; i++)
         yPos = addBodyPage(docWL, pageHeader, studentList, i, pageAmount, chunkSize);
   }
   else {
      for (var i = 1; i <= pageAmount; i++)
         yPos = addBodyPage(docWL, pageHeader, studentList, i, pageAmount, chunkSize);
   }
   addFooter(docWL, pageAmount, yPos);
   var responseBuffer = doc.output('arraybuffer');
   reply.setHeader('Content-Type', 'application/pdf')
   reply.send(Buffer.from(responseBuffer));

   //console.timeEnd("dbsave");
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

//GET request handling
app.get('/', function (req, res) {
   res.send("Nothing to see here, use POST method");
})