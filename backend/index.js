const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sessions = require("express-session");
const multer = require("multer");
const path = require("path");

global.site_location = "http://localhost";
// global.site_location = "http://150.95.30.128";

// app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    // origin: ["http://150.95.30.128"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "subscribevy8igf=",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);

//homepage route
app.get("/", (req, res) => {
  return res.send({
    error: false,
    message: "Welcome to RESTful CRUD API with NodeJS , Express, Mysql",
    written_by: "Akadeach",
    published_on: "https://www.flowdigital.co.th",
  });
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/dashboard", require("./routes/api/dashboard"));
app.use("/api/company", require("./routes/api/accounts/company"));
app.use("/api/formData", require("./routes/api/selectPolicy/formData"));
app.use("/api/formList", require("./routes/api/selectPolicy/formList"));
app.use("/api/cookiesList", require("./routes/api/cookies/cookiesList"));
app.use("/api/policyType", require("./routes/api/policyType/policyType"));
app.use("/api/policyMasterType", require("./routes/api/policyMaster/policyMasterType"));
app.use("/api/policyMasterList", require("./routes/api/policyMaster/policyMasterList"));
app.use("/api/cookiesMaster", require("./routes/api/policyMaster/cookiesMaster"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
