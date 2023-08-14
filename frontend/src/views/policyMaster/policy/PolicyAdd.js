import React, { useEffect, useState, createRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
  const params = useParams()

  const [nameType, setNameType] = useState('')
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    axios
      .get(`${site_location}:3001/api/policyMasterType/dataById/${params.typeId}`)
      .then((response) => {
        setNameType(response.data[0].name)
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {}
  }, [])

  // Save Data
  const saveData = (e) => {
    e.preventDefault()

    axios
      .post(`${site_location}:3001/api/policyMasterList/saveData`, {
        typeId: params.typeId,
        name: name,
        details: details,
      })
      .then((response) => {
        setVisible(true)

        setTimeout(() => {
          setVisible(false)
        }, 1500)

        setTimeout(() => {
          //   window.location.reload(false)
          navigate(`/policyMaster/policy/${params.typeId}`, { replace: true })
        }, 2000)
      })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" />{' '}
          <strong className="text-primary">{nameType}</strong> / เพิ่มรายการนโยบายความเป็นส่วนตัว
        </CCardHeader>
        <CCardBody>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end py-3">
            <CButton onClick={() => navigate(-1)} color="info" className="float-end">
              <CIcon icon={cilArrowThickLeft} /> Back
            </CButton>
          </div>
          <p className="h5">รายการนโยบายความเป็นส่วนตัว</p>
          <hr />
          <CForm onSubmit={saveData}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                ชื่อหัวข้อ
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
