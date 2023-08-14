import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPeople, cilWarning } from '@coreui/icons'
import { validateFields } from '../../../Validation'
import classnames from 'classnames'
import { Route, Routes, useNavigate } from 'react-router-dom'

const Register = ({ site_location }) => {
  const [usernameLogin, setUsernameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [loginMessage, setLoginMessage] = useState('')

  const [visible, setVisible] = useState(false)
  const [register_visible, setRegister_visible] = useState(false)

  const [showErrorRepeatPassword, setShowErrorRepeatPassword] = useState(false)

  const [username, setUserName] = useState({
    value: '',
    validateOnChange: false,
    error: '',
  })
  const [email, setEmail] = useState({
    value: '',
    validateOnChange: false,
    error: '',
  })
  const [password, setPassword] = useState({
    value: '',
    validateOnChange: false,
    error: '',
  })
  const [repeatpassword, setRepeatpassword] = useState({
    value: '',
    validateOnChange: false,
    error: '',
  })
  const [loading, setLoading] = useState(false)

  const handleBlur = (validationFunc, evt) => {
    const field = evt.target.name
    // validate onBlur only when validateOnChange for that field is false
    // because if validateOnChange is already true there is no need to validate onBlur
    if (field === 'username') {
      if (username['validateOnChange'] === false) {
        setUserName({
          ...username,
          validateOnChange: true,
          error: validationFunc(username.value),
        })
      }
    } else if (field === 'email') {
      if (email['validateOnChange'] === false) {
        setEmail({
          ...email,
          validateOnChange: true,
          error: validationFunc(email.value),
        })
      }
    } else if (field === 'password') {
      if (password['validateOnChange'] === false) {
        setPassword({
          ...password,
          validateOnChange: true,
          error: validationFunc(password.value),
        })
      }
    } else if (field === 'repeatpassword') {
      if (repeatpassword['validateOnChange'] === false) {
        setRepeatpassword({
          ...repeatpassword,
          validateOnChange: true,
          error: validationFunc(repeatpassword.value, password.value),
        })
      }
    }
    return
  }

  const handleChange = (validationFunc, evt) => {
    const field = evt.target.name
    const fieldVal = evt.target.value

    if (field === 'username') {
      setUserName({
        ...username,
        value: fieldVal,
        error: username['validateOnChange'] ? validationFunc(fieldVal) : '',
      })
    } else if (field === 'email') {
      setEmail({
        ...email,
        value: fieldVal,
        error: email['validateOnChange'] ? validationFunc(fieldVal) : '',
      })
    } else if (field === 'password') {
      setPassword({
        ...password,
        value: fieldVal,
        error: password['validateOnChange'] ? validationFunc(fieldVal) : '',
      })
    } else if (field === 'repeatpassword') {
      setRepeatpassword({
        ...repeatpassword,
        value: fieldVal,
        error: repeatpassword['validateOnChange'] ? validationFunc(fieldVal, password) : '',
      })
    }
  }

  const navigate = useNavigate()

  const saveRegister = (e) => {
    e.preventDefault()

    if (password.value !== repeatpassword.value) {
      setShowErrorRepeatPassword(true)
      setTimeout(() => {
        setShowErrorRepeatPassword(false)
      }, 2000)
    } else {
      // console.log(repeatpassword.value,password.value)
      const usernameError = validateFields.validateUsername(username.value)
      const emailError = validateFields.validateEmail(email.value, '')
      const passwordError = validateFields.validatePassword(password.value)
      const repeatpasswordError = validateFields.validateRepeatpassword(
        repeatpassword.value,
        password.value,
      )

      if (
        [usernameError, emailError, passwordError, repeatpasswordError].every((e) => e === false)
      ) {
        axios
          .post(`${site_location}:3001/api/users/register`, {
            username: username.value,
            email: email.value,
            password: password.value,
          })
          .then((response) => {
            console.log(response.data.length)
            if (response.data.length > 0) {
              setRegister_visible(true)

              setTimeout(() => {
                setRegister_visible(false)
              }, 1500)

            } else {
              const emailError = validateFields.validateEmail(email.value, response.data.username)

              if ([emailError].every((e) => e === false)) {
                setLoading(true)

                setVisible(true)

                setTimeout(() => {
                  setVisible(false)
                }, 1500)

                setTimeout(() => {
                  // window.location.reload(false)
                  navigate('/', { replace: true })
                }, 2000)
              } else {
                setEmail({ ...email, validateOnChange: true, error: emailError })
              }
            }
          })
      } else {
        setUserName({ ...username, validateOnChange: true, error: usernameError })
        setEmail({ ...email, validateOnChange: true, error: emailError })
        setPassword({
          ...password,
          validateOnChange: true,
          error: passwordError,
        })
        setRepeatpassword({
          ...repeatpassword,
          validateOnChange: true,
          error: repeatpasswordError,
        })
      }
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={saveRegister}>
                  <CRow>
                    <CCol sm={6}>
                      <h1>Register</h1>
                      <p className="text-medium-emphasis">Create your account</p>
                    </CCol>
                    <CCol sm={6}>
                      <CButton onClick={() => navigate(-1)} color="dark" className="float-end">
                        <CIcon icon={cilPeople} /> Login
                      </CButton>
                    </CCol>
                  </CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="username"
                      value={username.value}
                      className={classnames(
                        'form-control',
                        { 'is-valid': username.error === false },
                        { 'is-invalid': username.error },
                      )}
                      onChange={(evt) => {
                        handleChange(validateFields.validateUsername, evt)
                      }}
                      onBlur={(evt) => {
                        handleBlur(validateFields.validateUsername, evt)
                      }}
                      placeholder="Username"
                      autoComplete="username"
                    />
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {username.error}
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      value={email.value}
                      className={classnames(
                        'form-control',
                        { 'is-valid': email.error === false },
                        { 'is-invalid': email.error },
                      )}
                      onChange={(evt) => {
                        handleChange(validateFields.validateEmail, evt)
                      }}
                      onBlur={(evt) => {
                        handleBlur(validateFields.validateEmail, evt)
                      }}
                      placeholder="Email"
                      autoComplete="email"
                    />
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {email.error}
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      value={password.value}
                      className={classnames(
                        'form-control',
                        { 'is-valid': password.error === false },
                        { 'is-invalid': password.error },
                      )}
                      onChange={(evt) => {
                        handleChange(validateFields.validatePassword, evt)
                      }}
                      onBlur={(evt) => {
                        handleBlur(validateFields.validatePassword, evt)
                      }}
                      placeholder="Password"
                    />
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {password.error}
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="repeatpassword"
                      value={repeatpassword.value}
                      className={classnames(
                        'form-control',
                        { 'is-valid': repeatpassword.error === false },
                        { 'is-invalid': repeatpassword.error },
                      )}
                      onChange={(evt) => {
                        handleChange(validateFields.validateRepeatpassword, evt)
                      }}
                      onBlur={(evt) => {
                        handleBlur(validateFields.validateRepeatpassword, evt)
                      }}
                      placeholder="Repeat password"
                    />
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {repeatpassword.error}
                    </div>
                  </CInputGroup>
                  <CAlert dismissible visible={showErrorRepeatPassword} color="warning">
                    <strong>Repeat Password</strong> is not the same <strong>Password</strong>.
                  </CAlert>
                  <div className="d-grid">
                    <CButton type="submit" color="warning">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      {/* Modal save success */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle className="้h5 text-success">Register Success !!!</CModalTitle>
        </CModalHeader>
        <CModalBody>ลงทะเบียนเรียบร้อย</CModalBody>
      </CModal>

      {/* Modal save success */}
      <CModal visible={register_visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle className="้h5 text-warning">Unable to register !!!</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CIcon icon={cilWarning} /> มีผู้ใช้งานอยู่แล้ว กรุณาตรวจสอบใหม่
        </CModalBody>
      </CModal>
    </div>
  )
}

// 👇️ define prop types for the component
Register.propTypes = {
  site_location: PropTypes.string,
}

export default Register
