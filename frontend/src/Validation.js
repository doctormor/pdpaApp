import validator from "validator";

/*
 * This class contains methods for validating fields using 'validator.js' library methods
 * The methods return error message if validation failed and false otherwise
 * You can use all supported validators and sanitizers of 'validator.js' libaray
 * See their docs here https://github.com/validatorjs/validator.js
 */

class ValidateFields {
  /*
   * A method that takes in the email
   * Validates it
   * Returns the response either error or false if there is no error
   */
  // validateName(name) {
  //   if (validator.isEmpty(name)) {
  //     return "Name is required";
  //   }
  //   return false;
  // }

  // validateIDcard(idnumber) {
  //   if (validator.isEmpty(idnumber)) {
  //     return "ID Card is required";
  //   } else if (!validator.isLength(idnumber, { min:13, max: 13 })) {
  //     return 'ID Card should be 13 characters';
  //   } else if (!validator.isNumeric(idnumber)) {
  //     return 'ID Card should be only number';
  //   }
  //   return false;
  // }

  // validateDetail(detail) {
  //   if (validator.isEmpty(detail)) {
  //     return "Detail is required";
  //   }
  //   return false;
  // }

  validateEmail(email = "", emailold = "") {
    if (validator.isEmpty(email)) {
      return "กรุณากรอกอีเมล์";
    } else if (!validator.isEmail(email)) {
      return "รูปแบบอีเมล์ไม่ถูกต้อง";
    } else if (validator.equals(emailold, email)) {
      return "มีผู้ใช้งานนี้แล้วในระบบ";
    }
    return false;
  }

  validateEmailForgotPassword(email = "", emailold = "") {
    if (emailold == "") {
      if (validator.isEmpty(email)) {
        return "กรุณากรอกอีเมล์";
      } else if (!validator.isEmail(email)) {
        return "รูปแบบอีเมล์ไม่ถูกต้อง";
      }
    } else {
      if (!validator.equals(emailold, email)) {
        return "ไม่มีผู้ใช้งานนี้ในระบบ";
      }
    }

    return false;
  }

  // validateUserAvailable(email) {
  //   if (validator.isEmpty(email)) {
  //     return "ไม่มีผู้ใช้งานนี้ในระบบ";
  //   }
  //   return false;
  // }

  // validateRepeatpassword(repeatpassword, newpassword) {
  //   if (!validator.equals(repeatpassword, newpassword)) {
  //     return "Password is incorrect";
  //   }
  //   return false;
  // }

  // validatePhone(phone) {
  //   if (validator.isEmpty(phone)) {
  //     return "กรุณากรอกเบอร์โทรศัพท์";
  //   } else if (!validator.isMobilePhone(phone)) {
  //     return "กรอกเบอร์โทรศัพท์เป็นตัวเลขเท่านั้น";
  //   }
  //   return false;
  // }

  // validateFax(fax) {
  //   if (validator.isEmpty(fax)) {
  //     return "Fax is required";
  //   } else if (!validator.isMobilePhone(fax)) {
  //     return "Fax should be only number";
  //   }
  //   return false;
  // }

  // validateFirstname(firstname) {
  //   if (validator.isEmpty(firstname)) {
  //     return "กรุณากรอกชื่อ";
  //   }
  //   return false;
  // }

  // validateLastname(lastname) {
  //   if (validator.isEmpty(lastname)) {
  //     return "กรุณากรอกนามสกุล";
  //   }
  //   return false;
  // }

  validateUsername(username) {
    if (validator.isEmpty(username)) {
      return "กรุณากรอกชื่อผู้ใช้งาน";
    }
    return false;
  }

  validatePassword(password) {
    if (validator.isEmpty(password)) {
      return "กรุณาระบุรหัสผ่าน";
    }
    return false;
  }

  validateRepeatpassword(repeatpassword,newpassword) {
    if (validator.isEmpty(repeatpassword)) {
      return "กรุณาระบุการยืนยันรหัสผ่าน";
    }
    return false;
  }

  // validateNewpassword(newpassword) {
  //   if (validator.isEmpty(newpassword)) {
  //     return "New password is required";
  //   }
  //   return false;
  // }

  // validateRepeatpassword(repeatpassword,newpassword) {
  //   if (validator.isEmpty(repeatpassword)) {
  //     return "Repeat password is required";
  //   }else if(!validator.equals(repeatpassword,newpassword)){
  //     return "Password is incorrect";
  //   }
  //   return false;
  // }

  // validateCaptcha(captcha) {
  //   if (validator.isEmpty(captcha)) {
  //     return "Captcha is required";
  //   }
  //   return false;
  // }

  validatePdpaData(pdpaData) {
    if (validator.isEmpty(pdpaData)) {
      return "กรุณายืนยันนโยบายข้อตกลงการเปิดเผยข้อมูล";
    }
    return false;
  }

  // validateNumeric(number) {
  //   if (!validator.isNumeric(number)) {
  //     return 'กรอกได้เฉพาะตัวเลขเท่านั้น';
  //   }
  //   return false;
  // }
}

const validateFields = new ValidateFields();

// export the class instance, so we can import and use it anywhere
export { validateFields };
