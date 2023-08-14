const express = require("express");
const router = express.Router();
const dbCon = require("../../../connectdb");
const mysql = require("mysql");

function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

/// Get Form Data All
router.get("/", (req, res) => {
  dbCon.query(
    "SELECT * FROM tbl_company WHERE deleted = '0' ",
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

/// Get Form Data By user ID
router.get("/dataByUserId/:id", (req, res) => {
  let id = req.params.id;
  dbCon.query(
    "SELECT tbl_pdpadata.id, tbl_pdpadata.companyId, tbl_pdpadata.details, tbl_pdpadata.useCookie, tbl_pdpadata.dayStorage, tbl_pdpadata.dcEmail, tbl_pdpadata.dcTel, tbl_pdpadata.dpoNameTh, tbl_pdpadata.dpoNameEng, tbl_pdpadata.dpoEmail, tbl_pdpadata.dpoTel, tbl_company.nameTh, tbl_company.nameEng, tbl_company.address, tbl_company.tel, tbl_company.email, tbl_company.website FROM tbl_pdpadata LEFT JOIN tbl_company on (tbl_company.id = tbl_pdpadata.companyId) WHERE tbl_company.userId = ?",
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

// insert Details Privacy Data Form
router.post("/saveData", (req, res) => {
  const datecreate = toTimestamp(new Date());
  const compId = req.body.compId;
  const details = req.body.details;

  dbCon.query(
    "INSERT INTO `tbl_pdpadata` (`companyId`, `details`, `sequence`, `dateCreate`) VALUES (?,?,?,?)",
    [compId, details, 1, datecreate],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// update Details Privacy Data Form
router.post("/updateData", (req, res) => {
  const id = req.body.formId;
  const details = req.body.details;

  dbCon.query(
    "UPDATE tbl_pdpadata SET `details` = ? WHERE tbl_pdpadata.id = ?",
    [details, id],
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

// Update Cookies Form
router.post("/updateCookiesForm", (req, res) => {
  const id = req.body.formId;
  const details = req.body.details;

  dbCon.query(
    "UPDATE tbl_pdpadata SET `useCookie` = ? WHERE tbl_pdpadata.id = ?",
    [details, id],
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

//update day storage form
router.post("/updateDayStorage", (req, res) => {
  const id = req.body.formId;
  const details = req.body.details;

  dbCon.query(
    "UPDATE tbl_pdpadata SET `dayStorage` = ? WHERE tbl_pdpadata.id = ?",
    [details, id],
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

// Updata Data Controler Form
router.post("/updateDcForm", (req, res) => {
  const id = req.body.formId;
  const email = req.body.email;
  const tel = req.body.tel;

  dbCon.query(
    "UPDATE tbl_pdpadata SET `dcEmail` = ?, `dcTel` = ? WHERE tbl_pdpadata.id = ?",
    [email, tel, id],
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

// Updata Data Protection Officer Form
router.post("/updateDpoForm", (req, res) => {
  const id = req.body.formId;
  const dpoNameTh = req.body.dpoNameTh;
  const dpoNameEng = req.body.dpoNameEng;
  const email = req.body.email;
  const tel = req.body.tel;

  dbCon.query(
    "UPDATE tbl_pdpadata SET `dpoNameTh` = ?, `dpoNameEng` = ?, `dpoEmail` = ?, `dpoTel` = ? WHERE tbl_pdpadata.id = ?",
    [dpoNameTh, dpoNameEng, email, tel, id],
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
