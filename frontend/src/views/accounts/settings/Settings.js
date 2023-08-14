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

const Settings = ({ site_location }) => {
  const userId = localStorage.getItem('userId')

  const [compId, setCompId] = useState('')
  const [nameTh, setNameTh] = useState('')
  const [nameEng, setNameEng] = useState('')
  const [address, setAddress] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [empNum, setEmpNum] = useState('')

  const [visible, setVisible] = useState(false)

  const [validated, setValidated] = useState(false)

  const [active, setActive] = useState(false)

  useEffect(() => {
    axios.get(`${site_location}:3001/api/company/companyByUserId/${userId}`).then((response) => {

      if (response.data != '') {
        setCompId(response.data[0].id)
        setNameTh(response.data[0].nameTh)
        setNameEng(response.data[0].nameEng)
        setAddress(response.data[0].address)
        setTel(response.data[0].tel)
        setEmail(response.data[0].email)
        setWebsite(response.data[0].website)
        setEmpNum(response.data[0].empNum)
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
      axios.get(`${site_location}:3001/api/company/companyByUserId/${userId}`).then((responses) => {
       
        if (responses.data == '') {
        
          // Save Data
          axios
            .post(`${site_location}:3001/api/company/saveData`, {
              userId: userId,
              nameTh: nameTh,
              nameEng: nameEng,
              address: address,
              tel: tel,
              email: email,
              website: website,
              empNum: empNum,
            })
            .then((response_save) => {

              //-------------- check for available in policy type --------------
              axios
              .get(`${site_location}:3001/api/policyType/${response_save.data[0].id}`)
              .then((response_policyType) => {
                if (response_policyType.data == '') {

                  
                  // load data from policy master type
                  axios
                    .get(`${site_location}:3001/api/policyMasterType`)
                    .then((response_masterType) => {
                      // Save Data
                      axios
                        .post(`${site_location}:3001/api/policyType/saveMasterTypeData`, {
                          compId: response_save.data[0].id,
                          dataList: response_masterType.data,
                        })
                        .then((response) => {})
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                }
              })
              .catch((error) => {
                console.log(error)
              })


              //-------------- check for available in Cookies List --------------
            axios
            .get(`${site_location}:3001/api/cookiesList/${response_save.data[0].id}`)
            .then((response_cookies) => {
              if (response_cookies.data == '') {
                
                // load data from cookies master
                axios
                  .get(`${site_location}:3001/api/cookiesMaster`)
                  .then((response_master) => {
                    // Save Data
                    axios
                      .post(`${site_location}:3001/api/cookiesList/saveMasterData`, {
                        compId: response_save.data[0].id,
                        dataList: response_master.data,
                      })
                      .then((response) => {})
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }
            })
            .catch((error) => {
              console.log(error)
            })

            // end of save data -------------------------------------------------

              setVisible(true)

              setTimeout(() => {
                setVisible(false)
              }, 1500)

              setTimeout(() => {
                window.location.reload(false)
              }, 2000)
            })
        } else {
          // Update Data
          axios
            .post(`${site_location}:3001/api/company/updateData`, {
              compId: compId,
              nameTh: nameTh,
              nameEng: nameEng,
              address: address,
              tel: tel,
              email: email,
              website: website,
              empNum: empNum,
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
      })
    }

    setValidated(true)
  }


  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" /> แบบฟอร์มบันทึกข้อมูลบริษัท
        </CCardHeader>
        <CCardBody>
          <p className="h5">รายละเอียดข้อมูลบริษัท</p>
          <hr />
          <CForm className="needs-validation" noValidate validated={validated} onSubmit={saveData}>
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
                  onChange={(e) => setNameTh(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Please provide a valid Name Thai.</CFormFeedback>
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
                  onChange={(e) => setNameEng(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Please provide a valid Name English.</CFormFeedback>
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
            <CRow className="mb-3">
              <CFormLabel htmlFor="website" className="col-sm-2 col-form-label">
                เว็บไซต์
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  id="website"
                  placeholder="www.example.com"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Please provide a valid Website.</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="empNum" className="col-sm-2 col-form-label">
                จำนวนพนักงาน
              </CFormLabel>
              <CCol sm={3}>
                <CFormInput
                  name="empNum"
                  value={empNum}
                  onChange={(e) => setEmpNum(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Please provide a valid Employee Num.</CFormFeedback>
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
Settings.propTypes = {
  site_location: PropTypes.string,
}

export default Settings
