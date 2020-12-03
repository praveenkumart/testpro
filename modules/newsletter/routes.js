var express = require('express');
var router = express.Router();
const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');
var amqp = require('amqplib/callback_api');

var ctrl = require('./ctrl')
var receive = require('./receive')
const upload = multer({ dest: 'tmp/' });

router.post('/send', upload.single('file'), function (req, res) {
  const fileRows = [];
  csv.parseFile(req.file.path)
    .on("data", function (data) {
      fileRows.push(data);
    })
    .on("end", function () {
      fs.unlinkSync(req.file.path);
      amqp.connect("amqp://" + "0.0.0.0", function (err, conn) {
        if (err) {
          console.log("error", err);
          res.status(400).json({"message":"news letter not send"})
        } else {
          conn.createChannel(function (err, ch) {

            var ex = 'news';
            ch.assertExchange(ex, "fanout", { durable: false });
            ch.publish(ex, "", new Buffer(JSON.stringify(fileRows)));
            res.json({"message":"news letter send succes fully"})
          });
          setTimeout(function () {
            conn.close();
            process.exit(0);
          }, 500);
        }
      });

    })
});

module.exports = router;
