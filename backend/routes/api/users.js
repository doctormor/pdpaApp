const express = require("express");
const router = express.Router();
const dbCon = require("../../connectdb");
const multer = require("multer");
const mime = require("mime");
const path = require("path");
const fs = require("fs");

const bcrypt = require("bcrypt");
const saltRounds = 10;

function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

// Register users
router.post("/register", (req, res) => {
  const datecreate = toTimestamp(new Date());
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const usertype = "U";

  dbCon.query(
    "SELECT username FROM tbl_user WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.length);

        if (result.length > 0) {
          res.send(result);
        } else {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            dbCon.query(
              "INSERT INTO `tbl_user` (`username`, `password`, `email`, `userType`, `dateCreate`) VALUES (?,?,?,?,?)",
              [username, hash, email, usertype, datecreate],
              (err, result) => {
                if (err) {
                  res.send({ err: err });
                  console.log(err);
                } else {
                  // res.send({ insertId: insertId });

                  res.send(result);
                }
              }
            );
          });
        }
      }
    }
  );
});

router.get("/", (req, res) => {
  dbCon.query("SELECT * FROM tbl_user ", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  var session;

  // res.send({ status: true, username: password });

  dbCon.query(
    "SELECT * FROM tbl_user WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            session = req.session;
            session.user = result;

            res.send({
              status: true,
              result: result,
            });
          } else {
            res.send({
              status: false,
              message: "ข้อมูลผู้ใช้งาน / รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบใหม่!",
            });
          }
        });
      } else {
        res.send({
          status: false,
          message: "ไม่มีข้อมูลในระบบ กรุณาตรวจสอบ อีเมล์/รหัสผ่าน",
        });
      }
    }
  );
});

router.get("/login", (req, res) => {
  session = req.session;
  console.log(session.user);
  res.send({ status: session });
  // if (session.user) {
  //   // console.log("session OK");
  //   res.send({ status: true, user: session.user });
  // } else {
  //   res.send({ status: false });
  // }
});

router.post("/logout", (req, res) => {
  // req.session.user = null;
  req.session.destroy();
  res.send({ status: false });
});

router.get("/userByid/:id", (req, res) => {
  let id = req.params.id;
  dbCon.query("SELECT * FROM tbl_user WHERE id = ? ", id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

// // Update users
router.post("/updateuser", (req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const address = req.body.address;
  const tel = req.body.tel;
  const email = req.body.email;

  // let pdpaData = req.body.pdpaData;
  // pdpaData == true ? (pdpaData = 1) : (pdpaData = 0);

  // let nameComment = req.body.nameComment;
  // nameComment == true ? (nameComment = 1) : (nameComment = 0);

  dbCon.query(
    "UPDATE tbl_user SET `title` = ?, `firstname` = ?, `lastname` =?, `address` =?, `tel` =?, `email` =? WHERE id = ?",
    [title, firstname, lastname, address, tel, email, userId],
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
