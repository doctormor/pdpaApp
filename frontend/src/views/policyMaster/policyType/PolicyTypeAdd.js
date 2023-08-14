import React, { useEffect, useState, createRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CButtonGroup,
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
  CFormTextarea,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { cilBrowser, cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '../../../style.css'

const FormCompany = ({ site_location }) => {
  const navigate = useNavigate()

  const userId = localStorage.getItem('userId')

  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [par1, setPar1] = useState('')
  const [par2, setPar2] = useState('')
  const [formType, setFormType] = useState('')

  const [visible, setVisible] = useState(false)

  // Save Data
  const saveData = (e) => {
    e.preventDefault()

    // Save Data
    axios
      .post(`${site_location}:3001/api/policyMasterType/saveData`, {
        name: name,
        title: title,
        par1: par1,
        par2: par2,
        formType: formType,
      })
      .then((response) => {
        setVisible(true)

        setTimeout(() => {
          setVisible(false)
        }, 1500)

        setTimeout(() => {
          navigate('/policyMaster/policyType', { replace: true })
        }, 2000)
      })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" />{' '}
          แบบฟอร์มบันทึกข้อมูลประเภทนโยบายความเป็นส่วนตัว
        </CCardHeader>
        <CCardBody>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end py-3">
            <CButton onClick={() => navigate(-1)} color="info" className="float-end">
              <CIcon icon={cilArrowThickLeft} /> Back
            </CButton>
          </div>
          <p className="h5">รายละเอียดประเภทนโยบายความเป็นส่วนตัว</p>
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
              <CFormLabel htmlFor="par1" className="col-sm-2 col-form-label">
                รายละเอียด (แสดงผลข้อความชิดด้านบน)
              </CFormLabel>
              <CCol sm={10}>
                <CKEditor
                  editor={ClassicEditor}
                  name="par1"
                  data={par1}
                  onChange={(event, editor) => setPar1(editor.getData())}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="par2" className="col-sm-2 col-form-label">
                รายละเอียด (แสดงผลข้อความชิดด้านล่าง)
              </CFormLabel>
              <CCol sm={10}>
                <CKEditor
                  editor={ClassicEditor}
                  name="par2"
                  data={par2}
                  onChange={(event, editor) => setPar2(editor.getData())}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="formType" className="col-sm-2 col-form-label">
                ประเภทของแบบฟอร์ม
              </CFormLabel>
              <CCol sm={4}>
                <CFormSelect
                  id="formType"
                  name="formType"
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                >
                  <option value="CHK">Check Box</option>
                  <option value="FORM">Input Form</option>
                </CFormSelect>
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
FormCompany.propTypes = {
  site_location: PropTypes.string,
}

export default FormCompany
