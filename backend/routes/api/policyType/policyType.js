const express = require("express");
const router = express.Router();
const dbCon = require("../../../connectdb");
const mysql = require("mysql");

function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

/// Get Master Policy Type All
router.get("/:compId", (req, res) => {
  let compId = req.params.compId;
  dbCon.query(
    "SELECT * FROM tbl_pdpatype WHERE companyId = ?",
    compId,
    (err, results) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(results);
      }
    }
  );
});

/// Get Policy Type for show content
router.get("/show/:compId", (req, res) => {
  let compId = req.params.compId;
  dbCon.query(
    "SELECT * FROM tbl_pdpatype WHERE companyId = ? AND actived = '1' ",
    compId,
    (err, results) => {
      if (err) {
        res.send({ err: err });
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
    "SELECT * FROM tbl_pdpatype WHERE id = ? ",
    id,
    (err, results) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(results);
      }
    }
  );
});

router.post("/saveMasterTypeData", (req, res) => {
  const compId = req.body.compId;
  const dataList = req.body.dataList;

  dbCon.query(
    "INSERT INTO `tbl_pdpatype` (`companyId`, `typeId`, `name`, `title`, `par1`, `par2`, `formType`) VALUES ?",
    [
      dataList.map((result) => [
        compId,
        result.id,
        result.name,
        result.title,
        result.par1,
        result.par2,
        result.formType,
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
  const par1 = req.body.par1;
  const par2 = req.body.par2;
  const actived = req.body.actived;
 
  dbCon.query(
    "INSERT INTO `tbl_pdpatype` (`companyId`, `typeId`, `name`, `title`, `par1`, `par2`, `formType`, `actived`) VALUES (?,?,?,?,?,?,?,?)",
    [compId, 0, name, title, par1, par2, 'FORM', actived],
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
  const actived = req.body.actived;
  const id = req.body.id;

  dbCon.query(
    "UPDATE tbl_pdpatype SET `name` = ?, `title` = ?, `par1` = ?, `par2` =?, `formType` = ?, `actived` = ?  WHERE id = ?",
    [name, title, par1, par2, 'FORM', actived, id],
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
    "DELETE FROM tbl_pdpatype WHERE id = ?",
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
