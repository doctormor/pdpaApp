const express = require("express");
const router = express.Router();
const dbCon = require("../../../connectdb");
const mysql = require("mysql");

function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

/// Get Company All
router.get("/", (req, res) => {
  dbCon.query("SELECT * FROM tbl_company WHERE deleted = '0' ", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

/// Get Company By user ID
router.get("/companyByUserId/:id", (req, res) => {
  let id = req.params.id;
  dbCon.query(
    "SELECT tbl_company.id, tbl_company.userId, tbl_company.nameTh, tbl_company.nameEng, tbl_company.address, tbl_company.tel, tbl_company.email, tbl_company.website, tbl_company.empNum FROM tbl_company LEFT JOIN tbl_user on (tbl_user.id = tbl_company.userId) WHERE tbl_company.userId = ? AND tbl_company.deleted = '0' ORDER BY tbl_company.id DESC LIMIT 1 ",
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
  const datecreate = toTimestamp(new Date());
  const userId = req.body.userId;
  const nameTh = req.body.nameTh;
  const nameEng = req.body.nameEng;
  const address = req.body.address;
  const tel = req.body.tel;
  const email = req.body.email;
  const website = req.body.website;
  const empNum = req.body.empNum;

  dbCon.query(
    "INSERT INTO `tbl_company` (`userId`, `nameTh`, `nameEng`, `address`, `tel`, `email`, `website`, `empNum`, `dateCreate`, `deleted`) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [userId, nameTh, nameEng, address, tel, email, website, empNum, datecreate, 0],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        //res.send({ message: "Values inserted" });

        dbCon.query(
          "SELECT tbl_company.id, tbl_company.userId, tbl_company.nameTh, tbl_company.nameEng, tbl_company.address, tbl_company.tel, tbl_company.email, tbl_company.website, tbl_company.empNum FROM tbl_company LEFT JOIN tbl_user on (tbl_user.id = tbl_company.userId) WHERE tbl_company.id = ? AND tbl_company.deleted = '0'",
          result.insertId,
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              res.send(results);
            }
          }
        );
        //res.send(result);
      }
    }
  );
});

router.post("/updateData", (req, res) => {
  const nameTh = req.body.nameTh;
  const nameEng = req.body.nameEng;
  const address = req.body.address;
  const tel = req.body.tel;
  const email = req.body.email;
  const website = req.body.website;
  const empNum = req.body.empNum;
  const compId = req.body.compId;

  dbCon.query(
    "UPDATE tbl_company SET `nameTh` = ?, `nameEng` = ?, `address` = ?, `tel` =?, `email` = ?, `website` = ?, `empNum` = ? WHERE id = ?",
    [
      nameTh,
      nameEng,
      address,
      tel,
      email,
      website,
      empNum,
      compId,
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log(err);
      } else {
        dbCon.query(
          "SELECT * FROM tbl_company WHERE id = ? ",
          compId,
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              req.session.user = results;
            }
          }
        );

        res.send({ update: "done" });
      }
    }
  );

});


module.exports = router;
