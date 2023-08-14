import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormTextarea,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { cilBrowser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '../../../style.css'

const CookiesAdd = ({ site_location }) => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const [visible, setVisible] = useState(false)

  // Save Data
  const saveData = (e) => {
    e.preventDefault()

    // Save Data
    axios
      .post(`${site_location}:3001/api/cookiesMaster/saveData`, {
        name: name,
        title: title,
        details: details,
      })
      .then((response) => {
        setVisible(true)

        setTimeout(() => {
          setVisible(false)
        }, 1500)

        setTimeout(() => {
          navigate('/policyMaster/cookies', { replace: true })
        }, 2000)
      })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" /> แบบฟอร์มบันทึกข้อมูลนโยบายเกี่ยวกับคุกกี้
          (Cookies Policy)
        </CCardHeader>
        <CCardBody>
          <p className="h5">รายละเอียดประเภทข้อมูลนโยบายเกี่ยวกับคุกกี้ (Cookies Policy)</p>
          <hr />
          <CForm onSubmit={saveData}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                ชื่อนโยบาย
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="title" className="col-sm-2 col-form-label">
                ชื่อสำหรับแสดงผล
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="details" className="col-sm-2 col-form-label">
                รายละเอียด
              </CFormLabel>
              <CCol sm={10}>
                <CKEditor
                  editor={ClassicEditor}
                  name="details"
                  data={details}
                  onChange={(event, editor) => setDetails(editor.getData())}
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
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CCard>
    </>
  )
}

// 👇️ define prop types for the component
CookiesAdd.propTypes = {
  site_location: PropTypes.string,
}

export default CookiesAdd
