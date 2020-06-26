var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rootuser:0vNG2bh34oQEiUHG@examgradr-xee65.mongodb.net/examgradr?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

var examSchema = mongoose.Schema({
    name: String,
    parent: String
});

var Exam = mongoose.model("Exam", examSchema);

var newExam = new Exam({
    exam_name: "String",
    // exam_description: "String",
    exam_instruction: "String"
});

newExam.save(function(err, exam) {
    if (err) {
        console.log("error");
    } else {
        console.log("success");
    }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
})


app.get("/exam/:id", function(req, res) {
    if (req.params.id == 'sirajulhuda') {
        res.render("exam");
    } else {
        res.render("index");
    }
})

app.get("/attend/:id", function(req, res) {
    if (req.params.id == 'sirajulhuda') {
        res.render("attend");
    } else {
        res.render("index");
    }
})



app.listen(3000, function() {
    console.log("Server Started");
})