const { jsPDF } = require('jspdf');
var express = require('express');
let bodyParser = require('body-parser');
require('jspdf-autotable');
require('dotenv').config();
const { callAddFont } = require('./fontLoader')
const { addBodyPage, addFooter } = require('./addPage')

//create new Express App
var app = express();

//getting page configuration
var chunkSize = process.env.CHUNK_SIZE;

//POST body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add UTF-8 font
jsPDF.API.events.push(['addFonts', callAddFont])

//POST request handling
app.post('/', function (request, reply) {
   //console.time("dbsave");

   //Reading & Analyzing request
   var studentList = request.body.students;
   var signatureURL = request.body.signatureImageUrl;

   for (var i = 0; i < studentList.length; i++)
      studentList[i].stt = i + 1;

   //console.log(req.body);

   //Create new PDF

   const doc = new jsPDF({ compress: true });
   doc.deletePage(1);
   var yPos = 0;

   pageAmount = Math.ceil(studentList.length / chunkSize) + 1;
   for (var i = 1; i < pageAmount; i++)
      yPos = addBodyPage(doc, request.body, studentList, i, pageAmount, yPos);
   addFooter(doc, signatureURL, pageAmount, yPos).then(() => {
      var responseBuffer = doc.output('arraybuffer');
      reply.setHeader('Content-Type', 'application/pdf')
      reply.send(Buffer.from(responseBuffer));
   }).catch(
      () => { console.log("help~~~") }
   )
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