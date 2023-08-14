const express = require("express");
const router = express.Router();
const dbCon = require("../../../connectdb");
const mysql = require("mysql");

function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

/// Get PDPA By user ID
router.get("/:compId", (req, res) => {
  let compId = req.params.compId;
  dbCon.query(
    "SELECT * FROM tbl_pdpalist WHERE companyId = ?",
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

/// Get PDPA By user ID
router.get("/dataByUserId/:userId/:typeId", (req, res) => {
  let userId = req.params.userId;
  let typeId = req.params.typeId;
  dbCon.query(
    "SELECT tbl_pdpalist.id, tbl_pdpalist.companyId, tbl_pdpalist.pdpaId, tbl_pdpalist.typeId, tbl_pdpalist.name, tbl_pdpalist.details FROM tbl_pdpalist LEFT JOIN tbl_company on (tbl_company.id = tbl_pdpalist.companyId) WHERE tbl_company.userId = ? AND tbl_pdpalist.typeId = ?",
    [userId, typeId],
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
  const datecreate = toTimestamp(new Date());
  const compId = req.body.compId;
  const checked = req.body.checked;
  const dataList = req.body.dataList;

  const dataPdpaList = [];

  dataList.map((result) => {
    checked.find((x) => x == result.id) ? dataPdpaList.push(result) : "";
  });

  dbCon.query(
    "INSERT INTO `tbl_pdpalist` (`companyId`, `pdpaId`, `typeId`, `name`, `details`) VALUES ?",
    [
      dataPdpaList.map((result) => [
        compId,
        result.id,
        result.typeId,
        result.name,
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

router.post("/updateData", (req, res) => {
  const compId = req.body.compId;
  const checked = req.body.checked;
  const dataList = req.body.dataList;

  const dataPdpaList = [];

  dataList.map((result) => {
    checked.find((x) => x == result.id) ? dataPdpaList.push(result) : "";
  });

  // console.log(dataPdpaList[0].typeId)

  dbCon.query(
    "DELETE FROM `tbl_pdpalist` WHERE companyId = ? AND typeId = ?",
    [compId, dataPdpaList[0].typeId],
    (err, results) => {
      if (err) {
        console.log(err);
      }
    }
  );
  dbCon.query(
    "INSERT INTO `tbl_pdpalist` (`companyId`, `pdpaId`, `typeId`, `name`, `details`) VALUES ?",
    [
      dataPdpaList.map((result) => [
        compId,
        result.id,
        result.typeId,
        result.name,
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

module.exports = router;
