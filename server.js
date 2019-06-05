// Dependencies
// ===========================================================
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// app.get("/display", function (req, res) {
//     var data = fetchData();
//     res.json(data);
// });

app.post("/addName", function (req, res) {
    var newName = req.body;
    console.log(newName);
    res.json(newName);

    addName(newName.fname, newName.lname);

});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

// #########################################################################

var mysql = require("mysql");

var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

function addName(fn, ln) {
    connection.query(
        "INSERT INTO name SET ?",
        {
            fname: fn,
            lname: ln,
        },
        function (err, res) {
            if (err) {
                return console.log(err);
            }
            console.log(res.affectedRows + " name inserted!\n");
        });
}
