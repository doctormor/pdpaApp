const express = require("express");
const router = express.Router();
const dbCon = require("../../../connectdb");
const mysql = require("mysql");

function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

/// Get Data By TypeId
router.get("/:typeId", (req, res) => {
  let typeId = req.params.typeId;
  dbCon.query(
    "SELECT * FROM tbl_pdpamaster WHERE typeId = ? AND deleted = '0' ",
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

/// Get Company By user ID
router.get("/dataById/:id", (req, res) => {
  let id = req.params.id;
  dbCon.query(
    "SELECT tbl_pdpamaster.name, tbl_pdpamaster.details, tbl_pdpamaster.typeId, tbl_pdpamastertype.id as typeId, tbl_pdpamastertype.name as nameType FROM tbl_pdpamaster LEFT JOIN tbl_pdpamastertype ON (tbl_pdpamastertype.id = tbl_pdpamaster.typeId) WHERE tbl_pdpamaster.id = ? ",
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
  const typeId = req.body.typeId;
  const name = req.body.name;
  const details = req.body.details;

  dbCon.query(
    "INSERT INTO `tbl_pdpamaster` (`name`, `details`, `typeId`, `deleted`) VALUES (?,?,?,?)",
    [name, details, typeId, 0],
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
  const name = req.body.name;
  const details = req.body.details;
  const id = req.body.id;

  dbCon.query(
    "UPDATE tbl_pdpamaster SET `name` = ?, `details` = ? WHERE id = ?",
    [name, details, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log(err);
      } else {
        res.send({ update: "done" });
      }
    }
  );
});

router.post("/deleteData", (req, res) => {
  const id = req.body.id;

  dbCon.query(
    "UPDATE tbl_pdpamaster SET `deleted` = ? WHERE id = ?",
    ['1', id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log(err);
      } else {
        res.send({ update: "done" });
      }
    }
  );
});

module.exports = router;
