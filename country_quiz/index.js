import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from 'dotenv';


dotenv.config();
const db=new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // or your database host
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,//your postgreSQL password
  port: process.env.DB_PORT // default port for PostgreSQL
})
db.connect();

const app = express();
const port = 3001;

let totalCorrect = 0;
let quiz;
try{
  const result=db.query('SELECT * FROM flags',(err, res)=>{
    if(err){
      console.log(err);
    }
    else{
      quiz=res.rows;
    }
  })
}catch(err){
  console.log("query failed",err);
}



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  const code=emojiToCountryCode[currentQuestion.flags];
  const name=currentQuestion.name
  console.log(currentQuestion,code,name);
  console.log(typeof(code));
  res.render("index.ejs", {
    countryCode: code,
    countryName:currentQuestion.name
   });
});

// POST a new post
app.post("/submit", async(req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;

  if (currentQuestion.name?.toLowerCase() === answer?.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }
  console.log(currentQuestion.name,isCorrect);

  nextQuestion();
  const code=emojiToCountryCode[currentQuestion.flags];
  const name=currentQuestion.name
  console.log(currentQuestion,code,name);
  console.log(typeof(code));
  res.render("index.ejs", {
    countryCode: code?.toLowerCase(),
    countryName: currentQuestion.name,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

function nextQuestion() {

  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  console.log(currentQuestion);
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


const emojiToCountryCode = {
  "🇦🇫": "af",
  "🇦🇽": "ax",
  "🇦🇱": "al",
  "🇩🇿": "dz",
  "🇦🇸": "as",
  "🇦🇩": "ad",
  "🇦🇴": "ao",
  "🇦🇮": "ai",
  "🇦🇶": "aq",
  "🇦🇬": "ag",
  "🇦🇷": "ar",
  "🇦🇲": "am",
  "🇦🇼": "aw",
  "🇦🇺": "au",
  "🇦🇹": "at",
  "🇦🇿": "az",
  "🇧🇸": "bs",
  "🇧🇭": "bh",
  "🇧🇩": "bd",
  "🇧🇧": "bb",
  "🇧🇾": "by",
  "🇧🇪": "be",
  "🇧🇿": "bz",
  "🇧🇯": "bj",
  "🇧🇲": "bm",
  "🇧🇹": "bt",
  "🇧🇴": "bo",
  "🇧🇦": "ba",
  "🇧🇼": "bw",
  "🇧🇻": "bv",
  "🇧🇷": "br",
  "🇮🇴": "io",
  "🇧🇳": "bn",
  "🇧🇬": "bg",
  "🇧🇫": "bf",
  "🇧🇮": "bi",
  "🇰🇭": "kh",
  "🇨🇲": "cm",
  "🇨🇦": "ca",
  "🇨🇻": "cv",
  "🇰🇾": "ky",
  "🇨🇫": "cf",
  "🇹🇩": "td",
  "🇨🇱": "cl",
  "🇨🇳": "cn",
  "🇨🇽": "cx",
  "🇨🇨": "cc",
  "🇨🇴": "co",
  "🇰🇲": "km",
  "🇨🇬": "cg",
  "🇨🇩": "cd",
  "🇨🇰": "ck",
  "🇨🇷": "cr",
  "🇨🇮": "ci",
  "🇭🇷": "hr",
  "🇨🇺": "cu",
  "🇨🇾": "cy",
  "🇨🇿": "cz",
  "🇩🇰": "dk",
  "🇩🇯": "dj",
  "🇩🇲": "dm",
  "🇩🇴": "do",
  "🇹🇱": "tl",
  "🇪🇨": "ec",
  "🇪🇬": "eg",
  "🇸🇻": "sv",
  "🇬🇶": "gq",
  "🇪🇷": "er",
  "🇪🇪": "ee",
  "🇪🇹": "et",
  "🇫🇰": "fk",
  "🇫🇴": "fo",
  "🇫🇯": "fj",
  "🇫🇮": "fi",
  "🇫🇷": "fr",
  "🇬🇫": "gf",
  "🇵🇫": "pf",
  "🇹🇫": "tf",
  "🇬🇦": "ga",
  "🇬🇲": "gm",
  "🇬🇪": "ge",
  "🇩🇪": "de",
  "🇬🇭": "gh",
  "🇬🇮": "gi",
  "🇬🇷": "gr",
  "🇬🇱": "gl",
  "🇬🇩": "gd",
  "🇬🇵": "gp",
  "🇬🇺": "gu",
  "🇬🇹": "gt",
  "🇬🇬": "gg",
  "🇬🇳": "gn",
  "🇬🇼": "gw",
  "🇬🇾": "gy",
  "🇭🇹": "ht",
  "🇭🇲": "hm",
  "🇭🇳": "hn",
  "🇭🇰": "hk",
  "🇭🇺": "hu",
  "🇮🇸": "is",
  "🇮🇳": "in",
  "🇮🇩": "id",
  "🇮🇷": "ir",
  "🇮🇶": "iq",
  "🇮🇪": "ie",
  "🇮🇱": "il",
  "🇮🇹": "it",
  "🇯🇲": "jm",
  "🇯🇵": "jp",
  "🇯🇪": "je",
  "🇯🇴": "jo",
  "🇰🇿": "kz",
  "🇰🇪": "ke",
  "🇰🇮": "ki",
  "🇰🇵": "kp",
  "🇰🇷": "kr",
  "🇰🇼": "kw",
  "🇰🇬": "kg",
  "🇱🇦": "la",
  "🇱🇻": "lv",
  "🇱🇧": "lb",
  "🇱🇸": "ls",
  "🇱🇷": "lr",
  "🇱🇾": "ly",
  "🇱🇮": "li",
  "🇱🇹": "lt",
  "🇱🇺": "lu",
  "🇲🇴": "mo",
  "🇲🇰": "mk",
  "🇲🇬": "mg",
  "🇲🇼": "mw",
  "🇲🇾": "my",
  "🇲🇻": "mv",
  "🇲🇱": "ml",
  "🇲🇹": "mt",
  "🇮🇲": "im",
  "🇲🇭": "mh",
  "🇲🇶": "mq",
  "🇲🇷": "mr",
  "🇲🇺": "mu",
  "🇾🇹": "yt",
  "🇲🇽": "mx",
  "🇫🇲": "fm",
  "🇲🇩": "md",
  "🇲🇨": "mc",
  "🇲🇳": "mn",
  "🇲🇪": "me",
  "🇲🇸": "ms",
  "🇲🇦": "ma",
  "🇲🇿": "mz",
  "🇲🇲": "mm",
  "🇳🇦": "na",
  "🇳🇷": "nr",
  "🇳🇵": "np",
  "🇧🇶": "bq",
  "🇳🇱": "nl",
  "🇳🇨": "nc",
  "🇳🇿": "nz",
  "🇳🇮": "ni",
  "🇳🇪": "ne",
  "🇳🇬": "ng",
  "🇳🇺": "nu",
  "🇳🇫": "nf",
  "🇲🇵": "mp",
  "🇳🇴": "no",
  "🇴🇲": "om",
  "🇵🇰": "pk",
  "🇵🇼": "pw",
  "🇵🇸": "ps",
  "🇵🇦": "pa",
  "🇵🇬": "pg",
  "🇵🇾": "py",
  "🇵🇪": "pe",
  "🇵🇭": "ph",
  "🇵🇳": "pn",
  "🇵🇱": "pl",
  "🇵🇹": "pt",
  "🇵🇷": "pr",
  "🇶🇦": "qa",
  "🇷🇪": "re",
  "🇷🇴": "ro",
  "🇷🇺": "ru",
  "🇷🇼": "rw",
  "🇸🇭": "sh",
  "🇰🇳": "kn",
  "🇱🇨": "lc",
  "🇵🇲": "pm",
  "🇻🇨": "vc",
  "🇧🇱": "bl",
  "🇲🇫": "mf",
  "🇼🇸": "ws",
  "🇸🇲": "sm",
  "🇸🇹": "st",
  "🇸🇦": "sa",
  "🇸🇳": "sn",
  "🇷🇸": "rs",
  "🇸🇨": "sc",
  "🇸🇱": "sl",
  "🇸🇬": "sg",
  "🇸🇰": "sk",
  "🇸🇮": "si",
  "🇸🇧": "sb",
  "🇸🇴": "so",
  "🇿🇦": "za",
  "🇬🇸": "gs",
  "🇸🇸": "ss",
  "🇪🇸": "es",
  "🇱🇰": "lk",
  "🇸🇩": "sd",
  "🇸🇷": "sr",
  "🇸🇯": "sj",
  "🇸🇿": "sz",
  "🇸🇪": "se",
  "🇨🇭": "ch",
  "🇸🇾": "sy",
  "🇹🇼": "tw",
  "🇹🇯": "tj",
  "🇹🇿": "tz",
  "🇹🇭": "th",
  "🇹🇬": "tg",
  "🇹🇰": "tk",
  "🇹🇴": "to",
  "🇹🇹": "tt",
  "🇹🇳": "tn",
  "🇹🇷": "tr",
  "🇹🇲": "tm",
  "🇹🇨": "tc",
  "🇹🇻": "tv",
  "🇺🇬": "ug",
  "🇺🇦": "ua",
  "🇦🇪": "ae",
  "🇬🇧": "gb",
  "🇺🇸": "us",
  "🇺🇲": "um",
  "🇺🇾": "uy",
  "🇺🇿": "uz",
  "🇻🇺": "vu",
  "🇻🇦": "va",
  "🇻🇪": "ve",
  "🇻🇳": "vn",
  "🇻🇬": "vg",
  "🇻🇮": "vi",
  "🇼🇫": "wf",
  "🇪🇭": "eh",
  "🇾🇪": "ye",
  "🇿🇲": "zm",
  "🇿🇼": "zw",
  "🇽🇰": "xk",
  "🇨🇼": "cw",
  "🇸🇽": "sx"
};

