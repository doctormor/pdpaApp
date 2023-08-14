import React, { useEffect, useState, createRef } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormFeedback,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { cilBrowser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Profile = ({ site_location }) => {
  const userId = localStorage.getItem('userId')

  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')

  const [visible, setVisible] = useState(false)

  const [validated, setValidated] = useState(false)

  useEffect(() => {
    axios.get(`${site_location}:3001/api/users/userByid/${userId}`).then((response) => {

      if (response.data != '') {
        setUsername(response.data[0].username)
        setTitle(response.data[0].title)
        setFirstName(response.data[0].firstname)
        setLastName(response.data[0].lastname)
        setAddress(response.data[0].address)
        setTel(response.data[0].tel)
        setEmail(response.data[0].email)
      }
    })

    return () => {}
  }, [])

  // Save Data
  const saveData = (e) => {
    e.preventDefault()

    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      // Update Data
      axios
        .post(`${site_location}:3001/api/users/updateuser`, {
          userId: userId,
          title: title,
          firstname: firstname,
          lastname: lastname,
          address: address,
          tel: tel,
          email: email,
        })
        .then((response) => {
          setVisible(true)

          setTimeout(() => {
            setVisible(false)
          }, 1500)

          setTimeout(() => {
            window.location.reload(false)
          }, 2000)
        })
    }
    setValidated(true)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" /> แบบฟอร์มบันทึกข้อมูลส่วนตัว
        </CCardHeader>
        <CCardBody>
          <p className="h5">รายละเอียดข้อมูลส่วนตัว</p>
          <hr />
          <CForm className="needs-validation" noValidate validated={validated} onSubmit={saveData}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="username" className="col-sm-2 col-form-label">
                ชื่อผู้ใช้งาน
              </CFormLabel>
              <CCol sm={4}>
                <CFormInput name="username" value={username} disabled />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="title" className="col-sm-2 col-form-label">
                คำนำหน้า
              </CFormLabel>
              <CCol sm={4}>
                <CFormSelect name="title" onChange={(e) => setTitle(e.target.value)}>
                  <option>-- เลือกรายการ --</option>
                  <option value="mr" selected={title == 'mr' ? true : false}>
                    Mr
                  </option>
                  <option value="mrs" selected={title == 'mrs' ? true : false}>
                    Mrs
                  </option>
                  <option value="miss" selected={title == 'miss' ? true : false}>
                    Miss
                  </option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="firstname" className="col-sm-2 col-form-label">
                ชื่อ
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  placeholder="บริษัท ตัวอย่าง จำกัด"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Please provide a valid คำนำหน้า.</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="lastname" className="col-sm-2 col-form-label">
                นามสกุล
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  placeholder="Example Company Co.,Ltd."
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Please provide a valid Last Name.</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">
                ที่อยู่
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  id="address"
                  placeholder="123/456 กรุงเทพฯ"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Please provide a valid Address.</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="tel" className="col-sm-2 col-form-label">
                เบอร์โทรศัพท์
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  id="tel"
                  placeholder="081-1234567"
                  name="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Please provide a valid Tel.</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Email
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="email"
                  id="inputEmail3"
                  placeholder="Example@email.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Please provide a valid Email.</CFormFeedback>
              </CCol>
            </CRow>
            <CButton type="submit" className="float-end">
              Save
            </CButton>
          </CForm>
        </CCardBody>

        {/* Modal save success */}
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle className="้h5 text-success">Save Success !!!</CModalTitle>
          </CModalHeader>
          <CModalBody>บันทึกข้อมูลเรียบร้อย</CModalBody>
        </CModal>
      </CCard>
    </>
  )
}

// 👇️ define prop types for the component
Profile.propTypes = {
  site_location: PropTypes.string,
}

export default Profile
