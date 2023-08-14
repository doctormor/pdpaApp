const express = require("express");
const router = express.Router();
const dbCon = require("../../connectdb");
const mysql = require("mysql");

function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

/// Count PDPA All
router.get("/countPdpaAll/:compId", (req, res) => {
  let compId = req.params.compId;
  dbCon.query(
    "SELECT COUNT(id) as pdpaCount FROM tbl_pdpatype WHERE companyId = ? ",
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

// count pdpa by actived status
router.get("/countPdpaActive/:compId/:actived", (req, res) => {
  let compId = req.params.compId;
  let actived = req.params.actived;
  dbCon.query(
    "SELECT COUNT(id) as pdpaCount FROM tbl_pdpatype WHERE companyId = ? AND actived = ?",
    [compId, parseInt(actived)],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

/// Count Cookies All
router.get("/countCookiesAll/:compId", (req, res) => {
  let compId = req.params.compId;
  dbCon.query(
    "SELECT COUNT(id) as cookiesCount FROM tbl_cookieslist WHERE companyId = ? ",
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

// count Cookies by actived status
router.get("/countCookiesActive/:compId/:actived", (req, res) => {
  let compId = req.params.compId;
  let actived = req.params.actived;
  dbCon.query(
    "SELECT COUNT(id) as cookiesCount FROM tbl_cookieslist WHERE companyId = ? AND actived = ?",
    [compId, parseInt(actived)],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});


// count PDPA List All
router.get("/countListAll/:typeId", (req, res) => {
  let typeId = req.params.typeId;
  dbCon.query(
    "SELECT COUNT(id) as listCount FROM tbl_pdpamaster WHERE typeId = ?",
    typeId,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

// count PDPA By active
router.get("/countListActive/:compId/:typeId", (req, res) => {
  let compId = req.params.compId;
  let typeId = req.params.typeId;
  dbCon.query(
    "SELECT COUNT(id) as listCount FROM tbl_pdpalist WHERE companyId = ? AND typeId = ?",
    [compId, typeId],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});


module.exports = router;
