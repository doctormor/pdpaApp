import React, { useEffect, useState, createRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
  CFormTextarea,
  CFormSwitch,
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

  const userId = localStorage.getItem('userId')

  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [actived, setActived] = useState(false)

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    axios
      .get(`${site_location}:3001/api/cookiesList/dataById/${params.id}`)
      .then((response) => {
        setName(response.data[0].name)
        setTitle(response.data[0].title)
        setDetails(response.data[0].details)
        if (response.data[0].actived == '1') {
          setActived(true)
        } else {
          setActived(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {}
  }, [])

  // Save Data
  const saveData = (e) => {
    e.preventDefault()

    let actived_val = 0
    if (actived === true) {
      actived_val = 1
    } else {
      actived_val = 0
    }

    // Save Data
    axios
      .post(`${site_location}:3001/api/cookiesList/updateData`, {
        name: name,
        title: title,
        details: details,
        actived: actived_val,
        id: params.id,
      })
      .then((response) => {
        setVisible(true)

        console.log(response.data)

        setTimeout(() => {
          setVisible(false)
        }, 1500)

        setTimeout(() => {
          //   window.location.reload(false)
          navigate('/pdpaManagement/cookiesList', { replace: true })
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
          <div className="d-grid gap-2 d-md-flex justify-content-md-end py-3">
            <CButton onClick={() => navigate(-1)} color="info" className="float-end">
              <CIcon icon={cilArrowThickLeft} /> Back
            </CButton>
          </div>
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
            <CRow className="mb-3">
              <CFormLabel htmlFor="actived" className="col-sm-2 col-form-label">
                ใช้งาน
              </CFormLabel>
              <CCol sm={10}>
                <CFormSwitch
                  name="actived"
                  onChange={(e) => setActived(!actived)}
                  checked={actived == '1' ? true : false}
                  defaultChecked
                />
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
FormCompany.propTypes = {
  site_location: PropTypes.string,
}

export default FormCompany
