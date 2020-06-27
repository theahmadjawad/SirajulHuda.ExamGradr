var mongoose = require('mongoose');

var enrollmentSchema = new mongoose.Schema({
    exam_id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: String,
    place: String,
    // exam: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Exam"
    // }],
    submissions: [{
        question_id: mongoose.Schema.Types.ObjectId,
        option_id: mongoose.Schema.Types.ObjectId
    }],
    marks: [{
        section: String,
        marks: Number
    }]
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);