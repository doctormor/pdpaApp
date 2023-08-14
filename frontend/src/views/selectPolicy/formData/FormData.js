import React, { useEffect, useState } from 'react'
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
import PropTypes from 'prop-types'
import { cilBrowser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '../../../style.css'

const FormData = ({ site_location }) => {
  const userId = localStorage.getItem('userId')

  const [formId, setFormId] = useState('')
  const [compId, setCompId] = useState('')
  const [details, setDetails] = useState('')
  const [nameTh, setNameTh] = useState('')
  const [nameEng, setNameEng] = useState('')
  const [address, setAddress] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // ดึงข้อมูลของแบบฟอร์มมาจากฐานข้อมูล
    axios.get(`${site_location}:3001/api/formData/dataByUserId/${userId}`).then((response) => {
      if (response.data == '') {
        // ตรวจสอบถ้าไม่เจอข้อมูล
        // ดึงข้อมูลบริษัทมาจากข้อมูลของบริษัทเพื่อกรอกข้อมูลและนำ companyId มาใช้งาน
        axios
          .get(`${site_location}:3001/api/company/companyByUserId/${userId}`)
          .then((responses) => {
            if (responses.data != '') {
              setCompId(responses.data[0].id)
              setNameTh(responses.data[0].nameTh)
              setNameEng(responses.data[0].nameEng)
              setAddress(responses.data[0].address)
              setTel(responses.data[0].tel)
              setEmail(responses.data[0].email)
              setWebsite(responses.data[0].website)
            }
          })
      } else {
        setFormId(response.data[0].id)
        setDetails(response.data[0].details)
        setNameTh(response.data[0].nameTh)
        setNameEng(response.data[0].nameEng)
        setAddress(response.data[0].address)
        setTel(response.data[0].tel)
        setEmail(response.data[0].email)
        setWebsite(response.data[0].website)
      }
    })

    return () => {}
  }, [])

  // Save Data
  const saveData = (e) => {
    e.preventDefault()

    axios.get(`${site_location}:3001/api/formData/dataByUserId/${userId}`).then((response) => {
      if (response.data == '') {
        // Save Data
        axios
          .post(`${site_location}:3001/api/formData/saveData`, {
            compId: compId,
            details: details,
          })
          .then((response) => {
            setVisible(true)

            setTimeout(() => {
              setVisible(false)
            }, 1500)
          })
      } else {
        // Update Data
        axios
          .post(`${site_location}:3001/api/formData/updateData`, {
            formId: formId,
            details: details,
          })
          .then((response) => {
            setVisible(true)

            setTimeout(() => {
              setVisible(false)
            }, 1500)

            // setTimeout(() => {
            //   window.location.reload(false)
            // }, 2000)
          })
      }
    })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" /> แบบฟอร์มบันทึกข้อมูลบริษัท
          และนโยบายความเป็นส่วนตัว (Privacy Policy)
        </CCardHeader>
        <CCardBody>
          <p className="h5">รายละเอียดข้อมูลบริษัท</p>
          <hr />
          <CForm onSubmit={saveData}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="nameTh" className="col-sm-2 col-form-label">
                ชื่อภาษาไทย
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
                ชื่อภาษาอังกฤษ
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
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="tel" className="col-sm-2 col-form-label">
                เบอร์โทรศัพท์
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput id="tel" placeholder="081-1234567" name="tel" value={tel} disabled />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Email
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  type="email"
                  id="inputEmail3"
                  placeholder="Example@email.com"
                  name="email"
                  value={email}
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="website" className="col-sm-2 col-form-label">
                เว็บไซต์
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  id="website"
                  placeholder="www.example.com"
                  name="website"
                  value={website}
                  disabled
                />
              </CCol>
            </CRow>
            <p className="h5 mt-5">รายละเอียดนโยบายความเป็นส่วนตัว (Privacy Policy)</p>
            <hr />
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
FormData.propTypes = {
  site_location: PropTypes.string,
}

export default FormData
