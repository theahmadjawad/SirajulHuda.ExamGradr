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
                title: "ഭൂമിയിലെ ആദ്യത്തെ പള്ളി",
                section: "KAT",
                options: [{ title: "മസ്ജിദുല്‍ ഹറാം" }, { title: "മസ്ജിദുല്‍ അഖ്‌സ്വാ" }, { title: "മസ്ജിദു ഖുബാ" }, { title: "ബൈത്തുല്‍ മുഖദസ്" }],
            }, {
                title: "ലൂത്വ് നബി(അ)നു ശേഷം ആദ്യമായി കുടുംബസമേതം പലായനം ചെയ്തത് ആര്?",
                section: "KAT",
                options: [{ title: "തിരുനബി (സ)" }, { title: "ഉസ്മാന്‍(റ)" }, { title: "അലി(റ)" }, { title: "ഈസ (അ)" }],

            },
            {
                title: "ഇസ്ലാമിക പ്രബോധനത്തിന് തിരുനബി(സ) പറഞ്ഞയച്ച പ്രഥമ വ്യക്തി?",
                section: "KAT",
                options: [{ title: "മിസ്അബ് ബ്നു ഉമൈര്‍(റ)" }, { title: "ഉമര്‍ (റ)" }, { title: "ഖാലിദ് (റ)" }, { title: "സൈദ്(റ)" }],

            },


            {
                title: "ഖുര്‍ആന്‍ അവതരണം പൂര്‍ത്തിയായതു എത്ര വര്‍ഷം കൊണ്ട്?",
                section: "KAT",
                options: [{ title: "20" }, { title: "40" }, { title: "23" }, { title: "30" }],

            },
            {
                title: "ആദ് സമൂഹത്തിലേക്കയക്കപ്പെട്ട പ്രവാചകന്‍ ആര്?",
                section: "KAT",
                options: [{ title: "ഹൂദ്" }, { title: "സ്വാലിഹ്" }, { title: "നൂഹ്" }, { title: "ഇബ്രാഹീം" }],

            },
            {
                title: "ജമാഅത്ത് സുന്നത്തില്ലാത്ത നിസ്‌കാരം ഏത്?",
                section: "KAT",
                options: [{ title: "തറാവീഹ്" }, { title: "തഹിയ്യത്ത്" }, { title: "ജുമുഅ" }, { title: "മയ്യിത്ത് നിസ്‌കാരം" }],

            },
            {
                title: "കര്‍മ്മ സംബന്ധമായി മുസ്ലിംകള്‍ പിന്തുടരുന്ന പ്രബല മദ്ഹബുകള്‍ എത്ര?",
                section: "KAT",
                options: [{ title: "3" }, { title: "2" }, { title: "4" }, { title: "6" }],

            },
            {
                title: "മഹാന്മാരെ മുന്‍നിറുത്തി പ്രാര്‍ത്ഥിക്കുന്നതിന്റെ പേര് എന്ത്?",
                section: "KAT",
                options: [{ title: "തവസ്സുല്‍" }, { title: "ഇസ്തിഗാസ" }, { title: "ഇസ്തിആന" }, { title: "ഇസ്തിജാബ" }],

            },
            {
                title: "വിശ്വാസ സംബന്ധമായ ജ്ഞാനശാഖയുടെ പേര്?",
                section: "KAT",
                options: [{ title: "ഇല്‍മുല്‍അഹ്ലാഖ്" }, { title: " ഇല്‍മുല്‍ അഖീദ" }, { title: "ഇല്‍മുല്‍ ഖുര്‍ആന്‍" }, { title: "ഇല്‍മുല്‍ഫിഖ്ഹ്" }],

            },
            {
                title: "നോമ്പിന്റെ ഫര്‍ളുകള്‍ എത്ര?",
                section: "KAT",
                options: [{ title: "5" }, { title: "6" }, { title: "4" }, { title: "2" }],

            },


            {
                title: "He's learning ------------ a truck.",
                section: "KAT",
                options: [{ title: "to drive" }, { title: "driving" }, { title: "drive" }, { title: "the driving" }],

            },
            {
                title: "I can't stand ----------- in hot weather.",
                section: "KAT",
                options: [{ title: "to walk" }, { title: "walking" }, { title: "walk" }, { title: "to walking" }],

            },
            {
                title: "He smokes more than ten cigarettes -------------.",
                section: "KAT",
                options: [{ title: "by day" }, { title: "the day" }, { title: "in day" }, { title: "a day" }],

            },
            {
                title: "Let's go somewhere else. There's ----------- noise in this room.",
                section: "KAT",
                options: [{ title: "too many" }, { title: "too much" }, { title: "enough" }, { title: "too" }],

            },
            {
                title: "it’s a very long day for Jack. He doesn't get home from school --------- six o'clock.",
                section: "KAT",
                options: [{ title: "Since" }, { title: "to" }, { title: "towards" }, { title: "until" }],

            },
            {
                title: "They usually --------- at home but today they --------- lunch in a restaurant.",
                section: "KAT",
                options: [{ title: "are eating, have" }, { title: "eat,have" }, { title: "are eating,are having" }, { title: "eat, are having" }],

            },
            {
                title: "We didn't stay late -------- we were very tired.",
                section: "KAT",
                options: [{ title: "Because" }, { title: "so" }, { title: "that" }, { title: "until" }],

            },
            {
                title: "I think most people --------- English for their jobs in the future.",
                section: "KAT",
                options: [{ title: "Need" }, { title: "are needing" }, { title: "will need" }, { title: "will have needed" }],

            },
            {
                title: "Teenagers today like wearing casual clothes so leather shoes aren't ---------- trainers.",
                section: "KAT",
                options: [{ title: "As fashionable than" }, { title: "as fashionable as" }, { title: "more fashionable as" }, { title: "fashionable" }],

            },
            {
                title: "A friend of -------- phoned this morning, but --------- didn't leave a message.",
                section: "KAT",
                options: [{ title: "You, she" }, { title: "you, her" }, { title: "yours, she" }, { title: "yourself, hers" }],

            },
            {
                title: "We -------- lunch when the phone --------.",
                section: "KAT",
                options: [{ title: "had, rang" }, { title: "were having, rang" }, { title: "were having, was ringing" }, { title: "had, has rung" }],

            },
            {
                title: " You -------- open the door before the train gets into the station. It's very dangerous.",
                section: "KAT",
                options: [{ title: "Must" }, { title: "mustn't" }, { title: "should" }, { title: "don't have to" }],

            },
            {
                title: "If you don't want to burn yourself you -------- lie in the sun all day.",
                section: "KAT",
                options: [{ title: "won't" }, { title: "don't" }, { title: "shouldn't" }, { title: "couldn't" }],

            },
            {
                title: "If I have enough money next year I -------- to the USA.",
                section: "KAT",
                options: [{ title: "will go" }, { title: "go" }, { title: "would go" }, { title: "went" }],

            },
            {
                title: "It's usually quite warm in September -------- it often rains, ------- bring a waterproof.",
                section: "KAT",
                options: [{ title: "but, so" }, { title: "so, because" }, { title: "unless, but" }, { title: "for,as" }],

            },


            {
                title: "അറബിയില്‍ നിങ്ങളുടെ പേരെന്താണ്? എന്ന് എങ്ങനെ ചോദിക്കും",
                section: "KAT",
                options: [{ title: "ماهو الاسم" }, { title: "ماذا إسمي" }, { title: "ما إسمك" }, { title: "إسمك ما" }, { title: "الإسم ماذا" }],

            },
            {
                title: "നിങ്ങള്‍ക്ക് എന്നെ സഹായിക്കാന്‍ കഴിയുമോ ? എന്ന് അറബിയില്‍ എങ്ങനെ ചോദിക്കും?",
                section: "KAT",
                options: [{ title: "هل بإمكانك مساعدتي" }, { title: "ممكن أن أساعدك" }, { title: "أنا أساعدك" }, { title: "أساعدك ممكن" }, { title: "هل بإمكاني مساعدتك" }],

            },
            {
                title: "'നന്ദി' എന്നെങ്ങനെ അറബിയില്‍ പറയും ?",
                section: "KAT",
                options: [{ title: "شاكر" }, { title: "عفوا" }, { title: "أهلا" }, { title: "شكرا" }, { title: "مرحبا بك" }],

            },
            {
                title: "كيف حالك؟  എന്നതുകൊണ്ട്  അര്‍ത്ഥമാക്കുന്നതെന്ത്?.",
                section: "KAT",
                options: [{ title: "What do you want?" }, { title: "How is the weather?" }, { title: "How are you?" }, { title: "What do you have?" }, { title: "Where are you from?" }],

            },
            {
                title: "أين أنت ؟ എന്ന വാചകത്തിന്റെ ഇംഗ്ലീഷ് ഭാഷാര്‍ത്ഥം എന്ത്‌?",
                section: "KAT",
                options: [{ title: "What's your name?" }, { title: "what is your profession?" }, { title: "Do you speak Arabic?" }, { title: "Will you help me?" }, { title: "Where are you?" }],

            },
            {
                title: "كم هو عمرك ഇതിന്റെ അര്‍ത്ഥമെന്ത്.",
                section: "KAT",
                options: [{ title: "നിന്റെ വയസ്സെത്ര " }, { title: "സുഖമാണോ" }, { title: "അവന്റെ വയസ്സെത്ര " }, { title: "നിനക്കത് അറിയാമോ " }, { title: "നിനക്ക് എത്രയുണ്ട് " }],

            },
            {
                title: "قمر എന്ന വാക്കിന്റെ അര്‍ഥം ചന്ദ്രന്‍ എന്നാണ്, എന്നാല്‍ The moon പ്രത്യേക ചന്ദ്രന്‍ എന്ന് എങ്ങനെ പറയാം",
                section: "KAT",
                options: [{ title: "هل قمر" }, { title: "أقمر" }, { title: "مالقمر" }, { title: "القمر" }, { title: "قمر" }],

            },
            {
                title: "شمس സൂര്യന്‍ എന്നാണര്‍ത്ഥം. a sun എന്നെങ്ങനെ പറയാം",
                section: "KAT",
                options: [{ title: "هل شمس" }, { title: "الّشمس" }, { title: "شمس" }, { title: "الشمس" }, { title: "مالشمس" }],

            },
            {
                title: "അറബിയില്‍ 5 എന്നെങ്ങനെ എഴുതാം ",
                section: "KAT",
                options: [{ title: "خميس" }, { title: "خمس" }, { title: "خامسة" }, { title: "خمسين" }, { title: "خمسة" }],

            },
            {
                title: "واحد وعشرون ഇത് അര്‍ഥമാക്കുന്നത് എന്ത് ? ",
                section: "KAT",
                options: [{ title: "12" }, { title: "120" }, { title: "11" }, { title: "21" }, { title: "13" }],

            },
            {
                title: "كتابي എന്റെ പുസ്തകം എന്നര്‍ത്ഥം, നമ്മുടെ പുസ്തകം എന്നെങ്ങനെ പറയാം  ",
                section: "KAT",
                options: [{ title: "كتابك" }, { title: "كتابنا" }, { title: "نحن كتاب" }, { title: "كتابها" }, { title: "كتاب" }],

            },
            {
                title: "صديق പുരുഷ സുഹൃത്ത് എന്നാണര്‍ത്ഥം, പെണ് സുഹൃത്ത് എന്നങ്ങനെ പറയാം ",
                section: "KAT",
                options: [{ title: "أصدقاء" }, { title: "صديقٌ" }, { title: "صديقان" }, { title: "صديقة" }, { title: "صداقة" }],

            },
            {
                title: "ട്രെയിനുകള്‍ എന്നങ്ങനെ പറയാം ",
                section: "KAT",
                options: [{ title: "قطاران" }, { title: "قطارات" }, { title: "قطاري" }, { title: "قطارز" }, { title: "قطاراتي" }],

            },
            {
                title: "أتكلم, ഞാന്‍ സംസരിക്കുമെന്നര്‍ത്ഥം. ഒരു പുരുഷനോട് നീ സംസാരിക്കുമെന്ന് എങ്ങനെ പറയാം  ",
                section: "KAT",
                options: [{ title: "يتكلم" }, { title: "تتكلمين" }, { title: "تتكلم" }, { title: "تكلمَ" }, { title: "تكلُم" }],

            },
            {
                title: "كتبنا നമ്മള്‍ എഴുതിയെന്നര്‍ത്ഥം. നമ്മള്‍ പോയി എന്ന് എങ്ങനെ പറയാം ",
                section: "KAT",
                options: [{ title: "ذهب" }, { title: "نذهب" }, { title: "ذهبوا" }, { title: "ذهب" }, { title: "ذهبنا" }],

            },
            {
                title: "طويل ഒരു ഏകവചന പുരുഷ നാമവിശേഷമാണ്, നീളമേറിയത് എന്നര്‍ത്ഥം. ഇതിന്റെ സ്ത്രീലിംഗവിശേഷനമെന്നാണ്",
                section: "KAT",
                options: [{ title: "طويلا" }, { title: "طويلين" }, { title: "طويلة" }, { title: "طويلات" }, { title: "ഇവയൊന്നുമല്ല" }],

            },
            {
                title: "മുഹമ്മദ്‌ സാമിയെക്കള്‍ നീണ്ടാവനാണ്. ഇതിന്റെ അറബി രൂപം എന്താണ്",
                section: "KAT",
                options: [{ title: "محمد طويل من سامي" }, { title: "محمد أطول من سامي" }, { title: "محمد طول سامي" }, { title: "محمد طاولة سامي" }, { title: "سامي طويل من محمد" }],

            },
            {
                title: "മദ്‌റസയുടെ മുമ്പിലാണ് ഞാന്‍ താമസിക്കുന്നത്. أسكن ... المدرسة ഇതില്‍ ഒരു പ്രത്യയം വിട്ടു പോയിട്ടുണ്ട് . കണ്ടെത്തുക?",
                section: "KAT",
                options: [{ title: "قبل" }, { title: "بعد" }, { title: "جانب" }, { title: "أمام" }, { title: "هنا" }],

            },
            {
                title: "നീ ആരാണ്? എന്നര്‍ത്ഥം വരുന്ന പ്രയോഗം കണ്ടെത്തുക?",
                section: "KAT",
                options: [{ title: "?أنت هنا" }, { title: "?أين أنت" }, { title: "?هنا أنت" }, { title: "?اينها" }, { title: "من أنت" }],

            },
            {
                title: "നിങ്ങള്‍ അറബിയില്‍ സംസാരിക്കുമോ? ഈ ചോദ്യത്തിന്റെ അറബി ഭാഷ്യം എന്ത് ",
                section: "KAT",
                options: [{ title: "تفعل تتكلم العربية" }, { title: "تفعل أنت تتكلم العربية" }, { title: "هل يتكلم العربية" }, { title: "هذا تتكلم العربية" }, { title: "هل تتكلم العربية" }],

            },



            {
                title: "സംഖ്യകളുടെ ഒരു നിശ്ചിത ക്രമമനുസരിച്ചുള്ള തുടര്‍ച്ചയാണ് താഴെയുള്ള പരമ്പര. അതിലെ അക്കങ്ങള്‍ ഒരു പ്രത്യേക രീതിയില്‍ ക്രമീകരിച്ചിരിക്കുന്നു. ഈ പരമ്പരയിലെ അടുത്ത സംഖ്യ കണ്ടെത്തുക. A. 6, 7, 9, 12, 16…",
                section: "MAT",
                options: [{ title: "19" }, { title: "21" }, { title: "20" }, { title: "23" }],

            },
            {
                title: "സംഖ്യകളുടെ ഒരു നിശ്ചിത ക്രമമനുസരിച്ചുള്ള തുടര്‍ച്ചയാണ് താഴെയുള്ള പരമ്പര. അതിലെ അക്കങ്ങള്‍ ഒരു പ്രത്യേക രീതിയില്‍ ക്രമീകരിച്ചിരിക്കുന്നു. ഈ പരമ്പരയിലെ അടുത്ത സംഖ്യ കണ്ടെത്തുക. B. 1, 4, 9, 16, 25….",
                section: "MAT",
                options: [{ title: "33" }, { title: "36" }, { title: "30" }, { title: "49" }],

            },
            {
                title: "താഴെ കൊടുത്തിരിക്കുന്ന അക്ഷര ശ്രേണികളിലെ പരസ്പര ബന്ധം മനസ്സിലാക്കി തൊട്ടടുത്തു വരുന്ന അക്ഷരകൂട്ടത്തെ കണ്ടെത്തുക. A. DGK, GKP, ?, PVC",
                section: "MAT",
                options: [{ title: "but" }, { title: "so" }, { title: "unless" }, { title: "for" }],

            },
            {
                title: "താഴെ കൊടുത്ത അക്ഷര കൂട്ടങ്ങളില്‍ മറ്റുള്ളവയില്‍ നിന്ന് വ്യത്യസ്തമായതിനെ അടയാളപെടുത്തുക. B. A] BGKN, B] NRUW, C] INRU, D] EJNQ, E] RWAD.",
                section: "MAT",
                options: [{ title: "A" }, { title: "B" }, { title: "C" }, { title: "D" }, { title: "E" }],

            },
            {
                title: "താഴെ കൊടുത്തിരിക്കുന്ന മൂന്ന് പദങ്ങളില്‍ ആദ്യത്തെ രണ്ടു പദങ്ങള്‍ക് ഒരു പ്രത്യേക പരസ്പര ബന്ധമുണ്ട്. മൂന്നാമത്തെ പദത്തോട് അതേ ബന്ധമുള്ള പദത്തെ ഉത്തരങ്ങളില്‍ നിന്ന് കണ്ടെത്തുക. A. Bread: Wheat Brick: …………...",
                section: "MAT",
                options: [{ title: "Clay" }, { title: "Fire" }, { title: "cement" }, { title: "Building" }],

            },
            {
                title: "താഴെ കൊടുത്തിരിക്കുന്ന മൂന്ന് പദങ്ങളില്‍ ആദ്യത്തെ രണ്ടു പദങ്ങള്‍ക് ഒരു പ്രത്യേക പരസ്പര ബന്ധമുണ്ട്. മൂന്നാമത്തെ പദത്തോട് അതേ ബന്ധമുള്ള പദത്തെ ഉത്തരങ്ങളില്‍ നിന്ന് കണ്ടെത്തുക. B. ഡോക്ടര്‍: രോഗി , വക്കീല്: ………",
                section: "MAT",
                options: [{ title: "സാക്ഷി" }, { title: "കക്ഷി" }, { title: "കോടതി" }, { title: "ജഡ്ജി" }],

            },
            {
                title: "കൂട്ടത്തില്‍ പെടാത്തത് അടയാളപ്പെടുത്തുക. ",
                section: "MAT",
                options: [{ title: "Tailor" }, { title: "Carpenter" }, { title: "Blacksmith" }, { title: "Barber" }],

            },
            {
                title: "കൂട്ടത്തില്‍ പെടാത്തത് അടയാളപ്പെടുത്തുക. ",
                section: "MAT",
                options: [{ title: "ക്ലാസ്സ് : വിദ്യാര്‍ത്ഥി" }, { title: "വാചകം : വാക്ക്" }, { title: "മരം : വനം" }, { title: "മണിക്കൂര്‍ : മിനിറ്റ്" }],

            },
            {
                title: "50 കുട്ടികളുള്ള ഒരു ക്ലാസ്സില്‍ 10 കുട്ടികള്‍ ഫുട്‌ബോള്‍ കളിക്കും. പക്ഷെ ഹോക്കി കളിക്കില്ല. 10 കുട്ടികള്‍ ഹോക്കി കളിക്കും. പക്ഷേ ഫുട്‌ബോള്‍ കളിക്കില്ല. 15 കുട്ടികള്‍ ഒരു കളിയിലും ഏര്‍പ്പെടുന്നില്ല. എങ്കില്‍ ഹോക്കിയും ഫുട്‌ബോളും കളിക്കുന്നവര്‍ എത്ര. ",
                section: "MAT",
                options: [{ title: "10" }, { title: "20" }, { title: "15" }, { title: "25" }],

            },
            {
                title: "5 ആളുകള്‍ A,B,C,D,E ഒരു വരിയില്‍ നിങ്ങള്‍ക് അഭിമുഖമായി ഇരിക്കുകയാണ്. C യുടെ ഇടത് ഭാഗത്താണ് E,D യുടെ വലതു ഭാഗത്ത് B ഇരിക്കുന്നു. C യുടെ വലതുഭാഗത്ത് A,E യുടെ ഇടതുഭാഗത്താണ് B,D ഒരറ്റത്താണ്. എങ്കില്‍ മധ്യത്തില്‍ ഇരിക്കുന്നത് ആരാണ്.",
                section: "MAT",
                options: [{ title: "A" }, { title: "B" }, { title: "C" }, { title: "D" }, { title: "E" }],

            },
            {
                title: "ഒരു ക്ലാസ്സിലെ കുട്ടികളില്‍ മീന മുന്നില്‍ നിന്നും ഏഴാം റാങ്ക്. പിന്നില്‍ നിന്നും 28-അമത്തെ റാങ്കും ആയാല്‍ ആ ക്ലസ്സിലെ കുട്ടികളുടെ എണ്ണമെത്ര.",
                section: "MAT",
                options: [{ title: "34" }, { title: "35" }, { title: "36" }, { title: "37" }],

            },
            {
                title: "A,B,C,D,E എന്നിവ 5 നദികളാണ്. A,B യേക്കാള്‍ ചെറുതും E യേക്കാള്‍ നീളം കൂടിയതുമാണ്. C ഏറ്റവും നീളം കൂടിയതും. D യേക്കാള്‍ അല്പം നീളം കുറഞ്ഞതുമാണ്. എന്നാല്‍ A യേക്കാള്‍ അല്പം നീളം കൂടിയതുമാണ്. ഏറ്റവും നീളം കുറഞ്ഞ നദി ഏത്.",
                section: "MAT",
                options: [{ title: "A" }, { title: "B" }, { title: "C" }, { title: "D" }],

            },
            {
                title: "ഒരു കുട്ടി 25 മീറ്റര്‍ വടക്കോട്ടു നടന്ന ശേഷം വലം തിരിഞ്ഞ് 20 മീറ്റര്‍ നടന്നു. പിന്നീട് ഇടം തിരിഞ്ഞ് 20 മീറ്റര്‍ കൂടി നടന്നു. എങ്കില്‍ ആ കുട്ടി ഇപ്പോള്‍ പുറപ്പെട്ട സ്ഥാനത്തു നിന്നും എത്രയകലെയാണ്.",
                section: "MAT",
                options: [{ title: "40 മീറ്റര്‍" }, { title: "55 മീറ്റര്‍" }, { title: "45 മീറ്റര്‍," }, { title: "65 മീറ്റര്‍" }],

            },
            {
                title: "A,B എന്നീ പട്ടണങ്ങള്‍ തമ്മിലുളള അകലം 410 കി. മീറ്റര്‍ ആണ്. A യില്‍ നിന്നും ഒരു ബസ് B യിലേക് ഒരു മണിക്കൂറില്‍ 70കി.മീ. വേഗത്തില്‍ സഞ്ചരിക്കുന്നു. അര മണിക്കൂറിനു ശേഷം B യില്‍ നിന്നും ഒരു കാര്‍ പുറപ്പെട്ടു A യിലേക്ക് മണിക്കൂറില്‍ 80 കി.മീ. വേഗതയില്‍ സഞ്ചരിക്കുന്നു. കാറും ബസും A യില്‍ നിന്ന് എന്ത് അകലത്തില്‍ വെച്ച് സന്ധിക്കും.?",
                section: "MAT",
                options: [{ title: "240 കി.മീ" }, { title: "220 കി.മീ" }, { title: "210 കി.മീ" }, { title: " 230 കി.മീ" }],

            },
            {
                title: "ഞാന്‍ ആഗസ്ത് 11നാണ് ജനിച്ചത്. ബാബു എന്നെക്കാള്‍ 11 ദിവസത്തിന് ഇളയതാണ്. ഈ വര്‍ഷത്തെ സ്വാതന്ത്രദിനം തിങ്കളാഴ്ചയാണ്. ഈ വര്‍ഷം  ബാബുവിന്റെ പിറന്നാള്‍ ഏതാഴ്ച്ചയാണ്.",
                section: "MAT",
                options: [{ title: "തിങ്കള്‍" }, { title: "ഞായര്‍" }, { title: "ശനി" }, { title: "ചൊവ്വ" }],

            },
            {
                title: "ഒരാളുടെ വാച്ച് 5 മിനിറ്റ് പുറകിലാണ് സമയം കാണിക്കുന്നത്. അപ്പോഴും വച്ച് 5 മിനിറ്റ് മുന്നിലാണെന്നാണ് ഉടമയുടെ ധാരണ. അയാളുടെ ബോധ്യത്തില്‍ സമയം 10 മണിയായപ്പോള്‍ യഥാര്‍ത്ഥ സമയം എത്ര?",
                section: "MAT",
                options: [{ title: "9.55" }, { title: "9.50" }, { title: "10.05" }, { title: "10.10" }],

            },
            {
                title: "ഒരു പ്രത്യേക കോഡ് ഭാഷയില്‍ CLOCK എഴുതിയപ്പോള്‍ KCOLC എന്നാണ് എഴുതുന്നത്. എന്നാല്‍ STEPS എങ്ങിനെയാണ് ആ ഭാഷയില്‍ എഴുതുക.?",
                section: "MAT",
                options: [{ title: "SPEST," }, { title: "SPSET," }, { title: "UPEST," }, { title: "SPETS" }],

            },
            {
                title: "മറ്റൊരു കോഡ് ഭാഷയില്‍  MASTER എന്നത് SAMRET എന്നെഴുതുന്നു. എങ്കില്‍ HILTON ആ കോഡനുസരിച്ചു എങ്ങനെ എഴുതാം.",
                section: "MAT",
                options: [{ title: "LIHNOT," }, { title: "LIHTON" }, { title: "LHINOT" }, { title: "LIHNTO" }],

            },
            {
                title: "MEASUREMENT എന്ന വാക്കിലെ അക്ഷരങ്ങളുപയോഗിച്ചു എഴുതാന്‍ പറ്റാത്ത വാക്ക് ഉത്തരത്തില്‍ കണ്ടെത്തുക.",
                section: "MAT",
                options: [{ title: "MEAT" }, { title: "MEAN" }, { title: "MASTER" }, { title: "SUMMIT" }],

            },
            {
                title: "ഒരാളെ ചൂണ്ടി കൊണ്ട് ഒരു സ്ത്രീപറഞ്ഞു അയാള്‍ എന്റെ മുത്തച്ഛന്റെ ഒരേയൊരു മകന്റെ മകനാണ്. അയാളുടെ ആരാണ് ആ സ്ത്രീ.",
                section: "MAT",
                options: [{ title: "മരുമകള്‍" }, { title: "അമ്മ" }, { title: "സഹോദരി" }, { title: "ഭാര്യ" }],

            }
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
        });
    } else {
        if (req.params.id == 'sirajulhuda') {
            res.redirect("/exam/5efaecf10b54d0c06e94c78a")
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