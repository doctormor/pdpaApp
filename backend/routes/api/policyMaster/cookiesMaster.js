const express = require("express");
const router = express.Router();
const dbCon = require("../../../connectdb");
const mysql = require("mysql");

function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

/// Get Cookies All
router.get("/", (req, res) => {
  dbCon.query(
    "SELECT * FROM tbl_cookiesmaster WHERE deleted = '0' ",
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

/// Get Cookies By Id All
router.get("/dataById/:id", (req, res) => {
  let id = req.params.id;
  dbCon.query(
    "SELECT * FROM tbl_cookiesmaster WHERE id = ? ",
    id,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

router.post("/saveData", (req, res) => {
  const name = req.body.name;
  const title = req.body.title;
  const details = req.body.details;

  dbCon.query(
    "INSERT INTO `tbl_cookiesmaster` (`name`, `title`, `details`, `deleted`) VALUES (?,?,?,?)",
    [name, title, details, 0],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
