const express = require("express");
const router = express.Router();
const dbCon = require("../../../connectdb");
const mysql = require("mysql");

function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

/// Get Master Policy Type All
router.get("/", (req, res) => {
  dbCon.query(
    "SELECT *, (SELECT COUNT(*) FROM tbl_pdpamaster WHERE typeID = tbl_pdpamastertype.id AND tbl_pdpamaster.deleted = '0') as listCount FROM tbl_pdpamastertype WHERE deleted = '0' ",
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

/// Get Master Policy Type By user ID
router.get("/dataById/:id", (req, res) => {
  let id = req.params.id;
  dbCon.query(
    "SELECT * FROM tbl_pdpamastertype WHERE id = ? AND deleted = '0' ",
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
  const par1 = req.body.par1;
  const par2 = req.body.par2;
  const formType = req.body.formType;

  dbCon.query(
    "INSERT INTO `tbl_pdpamastertype` (`name`, `title`, `par1`, `par2`, `formType`, `deleted`) VALUES (?,?,?,?,?,?)",
    [name, title, par1, par2, formType, 0],
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
  const title = req.body.title;
  const par1 = req.body.par1;
  const par2 = req.body.par2;
  const formType = req.body.formType;
  const id = req.body.id;

  dbCon.query(
    "UPDATE tbl_pdpamastertype SET `name` = ?, `title` = ?, `par1` = ?, `par2` =?, `formType` = ? WHERE id = ?",
    [name, title, par1, par2, formType, id],
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
