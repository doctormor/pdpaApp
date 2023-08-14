import React, { useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = ({ site_location }) => {
  const [loginID, setLoginID] = useState('')
  const [nameLogin, setNameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [loginMessage, setLoginMessage] = useState('')
  const [loginUser, setLoginUser] = useState('')

  const [visible, setVisible] = useState(false)

  // const [rememberLogin, setRememberLogin] = useState(false)
  const navigate = useNavigate()

  const useLogin = (evt) => {
    evt.preventDefault()

    // if (localStorage.getItem('memlogin') == null) {
    //   if (rememberLogin == true || rememberLogin == 'true') {
    //     localStorage.setItem('userlogin', nameLogin)
    //     localStorage.setItem('passlogin', passwordLogin)
    //     localStorage.setItem('memlogin', rememberLogin)
    //   }
    // } else {
    //   if (rememberLogin == true || rememberLogin == 'true') {
    //     localStorage.setItem('userlogin', nameLogin)
    //     localStorage.setItem('passlogin', passwordLogin)
    //     localStorage.setItem('memlogin', rememberLogin)
    //   } else if (rememberLogin == false || rememberLogin == 'false') {
    //     window.localStorage.removeItem('userlogin')
    //     window.localStorage.removeItem('passlogin')
    //     window.localStorage.removeItem('memlogin')
    //   }
    // }

    axios
      .post(`${site_location}:3001/api/users/login`, {
        username: nameLogin,
        password: passwordLogin,
      })
      .then((response) => {
        setLoadingLogin(true)

        // console.log('response data : ' + JSON.stringify(response.data))

        if (response.data.status === true) {
          // axios.get(`${site_location}:3001/api/users/login`).then((response) => {
          //   console.log('response data : ' + JSON.stringify(response.data))
          //   if (response.data.status === true) {
          //     // setLoginStatus(response.data.status);
          //     localStorage.setItem('loginstatus', response.data.status)
          //     localStorage.setItem('Userid', response.data.user[0].id)

          //     console.log("Userid : " + response.data.user[0].id)

          //     setTimeout(() => {
          //       window.location.reload(false)
          //       // navigate('/', { replace: true });
          //     }, 1000)
          //   } else {
          //     // setLoginStatus(response.data.status);
          //     localStorage.setItem('loginstatus', response.data.status)

          //     setTimeout(() => {
          //       window.location.reload(false)
          //       // navigate('/', { replace: true });
          //     }, 1000)
          //   }
          // })
          //     localStorage.setItem('loginstatus', response.data.status)
          //     localStorage.setItem('Userid', response.data.user[0].id)
          // console.log('data : ' + JSON.stringify(response.data.result[0].id))

          
          setTimeout(() => {
            localStorage.setItem('loginNow', response.data.status)
            localStorage.setItem('userId', response.data.result[0].id)
            window.location.reload(false)
          }, 300)
        } else {
          setTimeout(() => {
            setLoadingLogin(false)
            setLoginMessage(response.data.message)
          }, 300)
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
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={3}>
                        <CSpinner visible={visible} color="primary" variant="grow" />
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h1>ลงทะเบียน</h1>
                    <h2>เพื่อรับคำปรึกษา พร้อมจัดทำ PDPA ครบวงจร</h2>
                    <p>
                      PDPA Core บริการให้คำปรึกษาและดำเนินการให้ธุรกิจของคุณ สอดคล้องกับ
                      พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) โดยทีมนักกฎหมายเชี่ยวชาญ
                      พร้อมเทคโนโลยีครบครัน
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
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
