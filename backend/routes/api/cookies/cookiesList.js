const express = require("express");
const router = express.Router();
const dbCon = require("../../../connectdb");
const mysql = require("mysql");

function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

/// Get Cookies List All
router.get("/:compId", (req, res) => {
  let compId = req.params.compId;
  dbCon.query(
    "SELECT * FROM tbl_cookieslist WHERE companyId = ?",
    compId,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

/// Get Cookies List for show content
router.get("/show/:compId", (req, res) => {
  let compId = req.params.compId;
  dbCon.query(
    "SELECT * FROM tbl_cookieslist WHERE companyId = ? AND actived = '1' ",
    compId,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

/// Get Cookies List By ID All
router.get("/dataById/:id", (req, res) => {
  let id = req.params.id;
  dbCon.query(
    "SELECT * FROM tbl_cookieslist WHERE id = ? ",
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

router.post("/saveMasterData", (req, res) => {
  const compId = req.body.compId;
  const dataList = req.body.dataList;

  dbCon.query(
    "INSERT INTO `tbl_cookieslist` (`companyId`, `cookiesId`, `name`, `title`, `details`) VALUES ?",
    [
      dataList.map((result) => [
        compId,
        result.id,
        result.name,
        result.title,
        result.details,
      ]),
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/saveData", (req, res) => {
  const compId = req.body.compId;
  const name = req.body.name;
  const title = req.body.title;
  const details = req.body.details;
  const actived = req.body.actived;

  dbCon.query(
    "INSERT INTO `tbl_cookieslist` (`companyId`, `cookiesId`, `name`, `title`, `details`, `actived`) VALUES (?,?,?,?,?,?)",
    [compId, 0, name, title, details, actived],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/updateData", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const title = req.body.title;
  const details = req.body.details;
  const actived = req.body.actived;

  dbCon.query(
    "UPDATE tbl_cookieslist SET `name` = ?, `title` = ?, `details` = ?, `actived` = ? WHERE id = ?",
    [name, title, details, actived, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/deleteData", (req, res) => {
  const id = req.body.id;

  dbCon.query(
    "DELETE FROM tbl_cookieslist WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
