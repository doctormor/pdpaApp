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
  const [formActive, setFormActive] = useState(false)
  const [details, setDetails] = useState('')

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // ดึงข้อมูลของแบบฟอร์มมาจากฐานข้อมูล
    axios.get(`${site_location}:3001/api/formData/dataByUserId/${userId}`).then((response) => {
      if (response.data != '') {
        setFormActive(true)

        setFormId(response.data[0].id)
        setDetails(response.data[0].useCookie)
      }
    })

    return () => {}
  }, [])

  // Save Data
  const saveData = (e) => {
    e.preventDefault()

    // Update Data
    axios
      .post(`${site_location}:3001/api/formData/updateCookiesForm`, {
        formId: formId,
        details: details,
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
          <CIcon icon={cilBrowser} className="me-2" /> แบบฟอร์มบันทึกข้อมูลการใช้คุกกี้ Cookies
        </CCardHeader>
        <CCardBody>
          <p className="h5">รายละเอียดข้อมูลการใช้คุกกี้ Cookies</p>
          <hr />
          <CForm onSubmit={saveData}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="details" className="col-sm-2 col-form-label">
                รายละเอียด
              </CFormLabel>
              <CCol sm={10}>
                <CFormTextarea
                  rows="10"
                  name="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                ></CFormTextarea>
              </CCol>
            </CRow>
            <CButton type="submit" className="float-end">Save</CButton>
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
