var mongoose = require('mongoose');
const { Timestamp } = require('mongodb');

var examSchema = new mongoose.Schema({
    name: String,
    description: String,
    instruction: String,
    // exam_settings: {
    //     timezone: String,
    //     start_date_time_stamp: Timestamp,
    //     end_date_time_stamp: Timestamp
    // },
    // questions_settings: {
    //     is_unique: Boolean,
    //     unique_limit: Number,
    //     is_question_shuffle: Boolean,
    //     is_answer_shuffle: Boolean
    // },
    marking_scheme: {
        marks_per_correct_answer: Number,
        marks_per_wrong_answer: Number,
    },
    // result_settings: {
    //     allow_instant_score_view: Boolean,
    //     allow_candidate_review: Boolean
    // },
    duration_settings: {
        duration_type: String,
        duration: Number
    },
    questions: [{
        section: String,
        title: String,
        options: [{
            title: String,
        }],
        answer_id: mongoose.Schema.Types.ObjectId
    }],
    // questions_section: [{
    //     section_name: String,
    //     questions: [{
    //         title: String,
    //         options: [{
    //             title: String,
    //         }],
    //         answer_id: mongoose.Schema.Types.ObjectId
    //     }]
    // }]
});

module.exports = mongoose.model("Exam", examSchema);