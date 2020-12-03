
const csv = require('fast-csv');

var models = require('../../models')

var send = function (req, res) {
    const fileRows = [];

    // open uploaded file
    console.log(req.file);
    console.log(req);
    csv.fromPath(req.file.path)
      .on("data", function (data) {
        fileRows.push(data); // push each row
      })
      .on("end", function () {
        console.log(fileRows)
        fs.unlinkSync(req.file.path);   // remove temp file
        //process "fileRows" and respond
      })
    res.json(req.body)
}

module.exports = {
    send:send
};
