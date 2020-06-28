var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var session = require('express-session');
var livereload = require("livereload");

var connectLivereload = require("connect-livereload");

const { Int32 } = require("mongodb");

var liveReloadServer = livereload.createServer();
liveReloadServer.watch('public');

mongoose.connect('mongodb+srv://rootuser:0vNG2bh34oQEiUHG@examgradr-xee65.mongodb.net/examgradr?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

var Exam = require("./models/exam");
var Enrollment = require("./models/enrollment");



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
app.use(connectLivereload());

app.use(session({
    secret: 'examgraderquizapp',
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
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

app.post("/exam/:id", function(req, res) {

    newEnrollment = {
        exam_id: req.params.id,
        name: req.body.name,
        phone: req.body.phone,
        place: req.body.place,
    };
    Enrollment.create(newEnrollment, function(err, newlyCreated) {
        if (err) { console.log(err); } else {
            res.redirect("/attend/" + newlyCreated._id);
        }
    })
})

app.get("/attend/:id", function(req, res) {

    Enrollment.findById(req.params.id, function(err, foundEnrollment) {
        if (err) { console.log(err); } else {
            Exam.findById(foundEnrollment.exam_id, function(err, foundExam) {
                if (err) { console.log(err); } else {
                    var duration = foundExam.duration_settings.duration;
                    var now = new Date();
                    req.session.closeTime = (now.getTime() + 60000 * duration)

                    foundExam.questions.forEach(element => {
                        element.answer_id = undefined;
                    });
                    res.render("attend", { exam: foundExam, enrollment: foundEnrollment });
                }
            })
        }
    })
})

app.post("/attend/:id/saveSubmission", function(req, res) {
    var now = new Date();
    if (req.session.closeTime <= now.getTime()) {
        Enrollment.findByIdAndUpdate(req.params.id, { "submissions": req.body.submissions }, function(err, result) {
            if (err) {
                res.send("failed");
            } else {
                res.send("success");
            }
        })
    } else {
        res.send("timeExpired")
    }
})


app.listen(3000, function() {
    console.log("Server Started");
})