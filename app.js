var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var session = require('express-session')
const { Int32 } = require("mongodb");

mongoose.connect('mongodb+srv://rootuser:0vNG2bh34oQEiUHG@examgradr-xee65.mongodb.net/examgradr?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

var Exam = require("./models/exam");
var Enrollment = require("./models/enrollment");
const enrollment = require("./models/enrollment");


app.get("/adddb", function(req, res) {
    Exam.create({
        name: "Sirajul Huda: Da'awa Entrance Exam",
        description: "Description, ipsum dolor sit amet consectetur adipisicing elit. Delectus, veniam. Omnis reprehenderit odit corporis, magni, modi tempore repudiandae iste, at quasi esse nulla dignissimos. Ut dolor maiores odio quibusdam aspernatur.",
        instruction: "Instruction, ipsum dolor sit amet consectetur adipisicing elit. Delectus, veniam. Omnis reprehenderit odit corporis, magni, modi tempore repudiandae iste, at quasi esse nulla dignissimos. Ut dolor maiores odio quibusdam aspernatur.",
        marking_scheme: {
            marks_per_correct_answer: 1,
            marks_per_wrong_answer: 0
        },
        duration_settings: {
            duration_type: 'exam',
            duration: '5'
        },
        questions: [{
            title: "Quessttionnn  1111 lorem ",
            options: [{ title: "option 11" }, { title: "option 22" }, { title: "option 33" }, { title: "option 44" }],
        }, {
            title: "Quessttionnn  2222 lorem ",
            options: [{ title: "option 21" }, { title: "option 23" }, { title: "option 24" }, { title: "option 25" }],
        }]
    }, function(err, exam) {
        if (err) {
            console.log("error");
        } else {
            console.log(exam);
        }
    });
})

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({
    secret: 'examgraderquizapp',
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
})

app.post("/exam/enroll", function(req, res) {

    // IF THERE EXISTS EXAM 

    req.session.enrollment = {
            exam_id: req.body.examId,
            name: req.body.name,
            phone: req.body.phone,
            place: req.body.place,
        }
        // console.log(req.session.enrollment);
    res.redirect("/exam/attend");

})

app.get("/exam/attend", function(req, res) {

    // CHECK IF REFRESHED

    Exam.findById(req.session.enrollment.exam_id, function(err, foundExam) {
        if (err) { console.log(err); } else {
            var now = new Date();
            if (req.session.enrollment.endTime) {
                if (now.getTime() >= req.session.enrollment.endTime) {
                    res.render("index");
                } else {
                    var duration = (req.session.enrollment.endTime - now.getTime()) / 60000;
                    foundExam.duration_settings.duration = duration;
                }
            } else {
                console.log("reset");
                var duration = foundExam.duration_settings.duration;
                req.session.enrollment.endTime = (now.getTime() + 60000 * duration);
            }
            foundExam.questions.forEach(element => {
                element.answer_id = undefined;
            });
            res.render("attend", { exam: foundExam });
        }
    })

})

app.post("/exam/save", function(req, res) {
    var now = new Date();
    if (now.getTime() <= req.session.enrollment.endTime) {
        req.session.enrollment.submissions = req.body.submissions;
        res.send("submissionSaved");
    } else {
        res.send("timeExpired");
    }
})

app.post("/exam/submit", function(req, res) {

    newEnrollment = req.session.enrollment;
    newEnrollment.endTime = null;

    Enrollment.create(newEnrollment, function(err, createdEnrollment) {
        if (err) { console.log(err) } else {
            res.render('response');
            // res.redirect('/exam/response');
        }
    })

    req.session.enrollment = null;
})

app.get("/exam/:id", function(req, res) {

    Exam.findById(req.params.id, function(err, foundExam) {
        if (err) {
            console.log(err);
        } else {
            res.render("exam", { exam: foundExam });
        }
    });
})



app.listen(3000, function() {
    console.log("Server Started");
})