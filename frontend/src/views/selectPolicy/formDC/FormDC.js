import React, { useEffect, useState, createRef } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormTextarea,
} from '@coreui/react'
import { cilBrowser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'

const FormCookies = ({ site_location }) => {
  const userId = localStorage.getItem('userId')

  const [formId, setFormId] = useState('')

  const [nameTh, setNameTh] = useState('')
  const [nameEng, setNameEng] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')

  const [formActive, setFormActive] = useState(false)

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // ดึงข้อมูลของแบบฟอร์มมาจากฐานข้อมูล
    axios.get(`${site_location}:3001/api/formData/dataByUserId/${userId}`).then((response) => {
      if (response.data != '') {
        setFormId(response.data[0].id)
        setNameTh(response.data[0].nameTh)
        setNameEng(response.data[0].nameEng)
        setEmail(response.data[0].dcEmail)
        setTel(response.data[0].dcTel)
      }
    })

    return () => {}
  }, [])

  // Save Data
  const saveData = (e) => {
    e.preventDefault()

    // Update Data
    axios
      .post(`${site_location}:3001/api/formData/updateDcForm`, {
        formId: formId,
        email: email,
        tel: tel,
      })
      .then((response) => {
        setVisible(true)

        setTimeout(() => {
          setVisible(false)
        }, 1500)
      })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" /> แบบฟอร์มบันทึกข้อมูลผู้ควบคุมข้อมูลส่วนบุคคล
        </CCardHeader>
        <CCardBody>
          <p className="h5">รายละเอียดข้อมูลบริษัท</p>
          <hr />
          <CForm onSubmit={saveData}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="nameTh" className="col-sm-2 col-form-label">
                ชื่อบริษัทภาษาไทย
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  id="nameTh"
                  placeholder="บริษัท ตัวอย่าง จำกัด"
                  name="nameTh"
                  value={nameTh}
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="nameEng" className="col-sm-2 col-form-label">
                ชื่อบริษัทภาษาอังกฤษ
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  id="nameEng"
                  placeholder="Example Company Co.,Ltd."
                  name="nameEng"
                  value={nameEng}
                  disabled
                />
              </CCol>
            </CRow>
            <p className="h5 mt-5">รายละเอียดข้อมูลผู้ควบคุมข้อมูลส่วนบุคคล</p>
            <hr />
            <CRow className="mb-3">
              <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                อีเมล์ติดต่อผู้ควบคุมข้อมูล
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="tel" className="col-sm-2 col-form-label">
                เบอร์โทรติดต่อผู้ควบคุมข้อมูล
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  name="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                />
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
FormCookies.propTypes = {
  site_location: PropTypes.string,
}

export default FormCookies
