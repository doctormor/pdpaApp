import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Kanit', 'sans-serif'],
  },
})

const Login = ({ site_location }) => {
  
  const [nameLogin, setNameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')

  const [hidden, setHidden] = useState(true)

  const [showErrorRepeatPassword, setShowErrorRepeatPassword] = useState(false)

  // const [rememberLogin, setRememberLogin] = useState(false)
  const navigate = useNavigate()

  const useLogin = (evt) => {
    evt.preventDefault()

    axios
      .post(`${site_location}:3001/api/users/login`, {
        username: nameLogin,
        password: passwordLogin,
      })
      .then((response) => {

        if (response.data.status === true) {
          // load company id
          axios
            .get(`${site_location}:3001/api/company/companyByUserId/${response.data.result[0].id}`)
            .then((responses) => {
              if (responses.data != '') {
                //-------------- check for available in policy type --------------
                axios
                  .get(`${site_location}:3001/api/policyType/${responses.data[0].id}`)
                  .then((response_policyType) => {
                    if (response_policyType.data == '') {
                      // load data from policy master type
                      axios
                        .get(`${site_location}:3001/api/policyMasterType`)
                        .then((response_masterType) => {
                          // Save Data
                          axios
                            .post(`${site_location}:3001/api/policyType/saveMasterTypeData`, {
                              compId: responses.data[0].id,
                              dataList: response_masterType.data,
                            })
                            .then((response) => {})
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                    }
                  })
                  .catch((error) => {
                    console.log(error)
                  })


                  //-------------- check for available in Cookies List --------------
                axios
                .get(`${site_location}:3001/api/cookiesList/${responses.data[0].id}`)
                .then((response_cookies) => {
                  if (response_cookies.data == '') {
                    // load data from cookies master
                    axios
                      .get(`${site_location}:3001/api/cookiesMaster`)
                      .then((response_master) => {
                        // Save Data
                        axios
                          .post(`${site_location}:3001/api/cookiesList/saveMasterData`, {
                            compId: responses.data[0].id,
                            dataList: response_master.data,
                          })
                          .then((response) => {})
                      })
                      .catch((error) => {
                        console.log(error)
                      })
                  }
                })
                .catch((error) => {
                  console.log(error)
                })
              }
            })

          setHidden(false)

          setTimeout(() => {
            setHidden(true)
          }, 1500)

          setTimeout(() => {
            localStorage.setItem('loginNow', response.data.status)
            localStorage.setItem('userId', response.data.result[0].id)
            window.location.href = '/';
          }, 2000)
        } else {
          setShowErrorRepeatPassword(true)

          setHidden(false)

          setTimeout(() => {
            setHidden(true)
          }, 1500)

          setTimeout(() => {
            setShowErrorRepeatPassword(false)
          }, 2000)
        }
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={useLogin}>
                    <h1>เข้าสู่ระบบ</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        value={nameLogin}
                        onChange={(event) => {
                          setNameLogin(event.target.value)
                        }}
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        value={passwordLogin}
                        onChange={(event) => {
                          setPasswordLogin(event.target.value)
                        }}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={3}>
                        <CButton type="submit" color="dark" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={3}>
                        <CSpinner hidden={hidden} color="primary" />
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/* <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton> */}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CAlert visible={showErrorRepeatPassword} color="danger" className="mt-2">
                        ข้อมูลผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง
                      </CAlert>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h1>ลงทะเบียน</h1>
                    <h2>เพื่อรับคำปรึกษา</h2>
                    <p>
                      PDPA UTCC บริการให้คำปรึกษาและดำเนินการให้ธุรกิจของคุณ สอดคล้องกับ
                      พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) โดยทีมนักกฎหมายเชี่ยวชาญ
                      พร้อมเทคโนโลยีครบครัน
                    </p>
                    <Link to="/register">
                      <CButton color="warning" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

// 👇️ define prop types for the component
Login.propTypes = {
  site_location: PropTypes.string,
}

export default Login
