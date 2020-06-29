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
            duration: '2'
        },
        questions: [{
                title: "ലൂത്വ് നബി(അ)നു ശേഷം ആദ്യമായി കുടുംബസമേതം പലായനം ചെയ്തത് ആര്?",
                section: "MAT",
                options: [{ title: "തിരുനബി (സ)" }, { title: "ഉസ്മാന്‍(റ)" }, { title: "അലി(റ)" }, { title: "ഈസ (അ)" }],
            },
            {
                title: "ഖുര്‍ആന്‍ അവതരണം പൂര്‍ത്തിയായതു എത്ര വര്‍ഷം കൊണ്ട്?",
                section: "MAT",
                options: [{ title: "20" }, { title: "40" }, { title: "23" }, { title: "30" }],
            },
            {
                title: "ഭൂമിയിലെ ആദ്യത്തെ പള്ളി",
                section: "KAT",
                options: [{ title: "മസ്ജിദുല്‍ ഹറാം" }, { title: "മസ്ജിദുല്‍ അഖ്‌സ്വാ" }, { title: "മസ്ജിദു ഖുബാ" }, { title: "ബൈത്തുല്‍ മുഖദസ്" }],
            },
            {
                title: "ഇസ്ലാമിക പ്രബോധനത്തിന് തിരുനബി(സ) പറഞ്ഞയച്ച പ്രഥമ വ്യക്തി?",
                section: "KAT",
                options: [{ title: "മിസ്അബ് ബ്നു ഉമൈര്‍(റ)" }, { title: "ഉമര്‍ (റ)" }, { title: "ഖാലിദ് (റ)" }, { title: "സൈദ്(റ)" }],
            },

            {
                title: "ആദ് സമൂഹത്തിലേക്കയക്കപ്പെട്ട പ്രവാചകന്‍ ആര്?",
                section: "KAT",
                options: [{ title: "ഹൂദ്" }, { title: "സ്വാലിഹ്" }, { title: "നൂഹ്" }, { title: "ഇബ്രാഹീം" }],
            },
            {
                title: "ജമാഅത്ത് സുന്നത്തില്ലാത്ത നിസ്‌കാരം ഏത്?",
                section: "KAT",
                options: [{ title: "തറാവഹ" }, { title: "തഹയയതത" }, { title: "ജമഅ" }, { title: "മയയതത നസ‌കര" }],
            },
        ]
    }, function(err, exam) {
        if (err) {
            console.log("error");
        } else {
            console.log(exam);
        }
    });
})

app.use(bodyParser.urlencoded({ extended: true }));
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

app.post("/exam/enroll", function(req, res) {

    if (mongoose.isValidObjectId(req.body.examId)) {
        Exam.findById(req.body.examId, function(err, foundExam) {
            if (err) {
                console.log(err);
                res.send("Invalid Exam or Database Error");
            } else {
                if (foundExam) {
                    req.session.enrollment = {
                        exam_id: req.body.examId,
                        name: req.body.name,
                        phone: req.body.phone,
                        place: req.body.place,
                        submissions: {},
                        marked: []
                    }
                    res.redirect("/exam/attend");
                } else {
                    res.send("Invalid Exam");
                }
            }
        })
    } else {
        res.send("Invalid Exam");
    };



})

app.get("/exam/attend", function(req, res) {

    if (req.session.enrollment) {
        if (mongoose.isValidObjectId(req.session.enrollment.exam_id)) {
            Exam.findById(req.session.enrollment.exam_id, function(err, foundExam) {
                if (err) { console.log(err); } else {
                    var now = new Date();
                    if (req.session.enrollment.endTime) {
                        if (now.getTime() >= req.session.enrollment.endTime) {
                            res.render("index");
                        } else {
                            var duration = (req.session.enrollment.endTime - now.getTime()) / 60000;
                            foundExam.duration_settings.duration = duration;
                            submissions = req.session.enrollment.submissions;
                            console.log(req.session.enrollment.marked);
                            if (Array.isArray(req.session.enrollment.marked)) {
                                marked = req.session.enrollment.marked
                            } else {
                                marked = JSON.parse(req.session.enrollment.marked);
                            }
                        }
                    } else {
                        // console.log("reset");
                        var duration = foundExam.duration_settings.duration;
                        req.session.enrollment.endTime = (now.getTime() + 60000 * duration);
                        submissions = {};
                        marked = [];
                    }
                    foundExam.questions.forEach(element => {
                        // element.answer_id = undefined;
                    });
                    res.render("attend", { exam: foundExam, submissions: submissions, marked: marked });
                }
            })
        } else {
            res.send("Invalid Exam");
        }
    } else {
        res.send("Session expired");
    }

})

app.post("/exam/save", function(req, res) {
    var now = new Date();
    if (now.getTime() <= req.session.enrollment.endTime) {
        req.session.enrollment.submissions = req.body.submissions;
        req.session.enrollment.marked = req.body.marked;
        res.send("submissionSaved");
    } else {
        res.send("timeExpired");
    }
})

app.post("/exam/submit", function(req, res) {

    newEnrollment = req.session.enrollment;
    newEnrollment.endTime = null;

    $marks = {};

    Exam.findById(req.session.enrollment.exam_id, function(err, foundExam) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundExam.questions);

            foundExam.questions.forEach(question => {

                if (!$marks[question.section]) {
                    $marks[question.section] = 0;
                }

                questionId = question._id;
                answerId = question.answer_id;



                if (newEnrollment.submissions[questionId] == answerId) {
                    $marks[question.section] += 1;
                }

            });

            console.log(newEnrollment.submissions);
            console.log($marks);
            newEnrollment.submissions = null;
            newEnrollment.marks = $marks;

            Enrollment.create(newEnrollment, function(err, createdEnrollment) {
                if (err) { console.log(err) } else {
                    res.render('response');
                    // res.redirect('/exam/response');
                }
            })

        }
    })



    req.session.enrollment = null;
})

app.get("/exam/:id", function(req, res) {

    if (mongoose.isValidObjectId(req.params.id)) {
        Exam.findById(req.params.id, function(err, foundExam) {
            if (err) {
                console.log(err);
            } else {
                if (foundExam) {
                    res.render("exam", { exam: foundExam });
                } else {
                    res.send("Invalid Exam")
                }
            }
            v
        });
    } else {
        if (req.params.id == 'sirajulhuda') {
            res.redirect("/exam/5ef7ab657ec551057266b545")
        }
        res.send("Invalid Exam")
    }

})
app.get('*', function(req, res) {
    res.send("Invalid Link. You will be redirected now" +
        `<script>setTimeout(function() {
            window.location.replace("http://app.examgradr.com");
    }, 2000)</script>`
    );
})
app.listen(3000, function() {
    console.log("Server Started");
})