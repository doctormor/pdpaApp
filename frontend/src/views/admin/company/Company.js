import React, { useEffect, useState, createRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { cilBrowser, cilList } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Company = () => {
  const site_location = localStorage.getItem('siteLocation')

  const [CompanyList, setCompanyList] = useState([])
  const [visible, setVisible] = useState(false)
  const [showModal, setShowModal] = useState('')

  useEffect(() => {
    axios
      .get(`${site_location}:3001/api/formData`)
      .then((response) => {
        setCompanyList(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {}
  }, [])

  const handleClickModal = (id) => (e) => {
    setShowModal(id)
    setVisible(true)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" /> รายการข้อมูลบริษัทที่ใช้บริการทั้งหมด
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">ชื่อบริษัท</CTableHeaderCell>
                <CTableHeaderCell scope="col">เบอร์โทรศัพท์</CTableHeaderCell>
                <CTableHeaderCell scope="col">อีเมล์</CTableHeaderCell>
                <CTableHeaderCell scope="col">รายละเอียด</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {CompanyList.map((val, i) => (
                <CTableRow key={i}>
                  <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                  <CTableDataCell>{val.nameTh}</CTableDataCell>
                  <CTableDataCell>{val.tel}</CTableDataCell>
                  <CTableDataCell>{val.email}</CTableDataCell>
                  <CTableDataCell>
                    <Link to="#" onClick={handleClickModal(val.id)}>
                      <CIcon icon={cilList} className="me-2" />
                    </Link>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
        {CompanyList.filter((x) => x.id == showModal).map((val, i) => (
          <CModal size="xl" visible={visible} onClose={() => setVisible(false)} key={i}>
            <CModalHeader>
              <CModalTitle>รายละเอียดบริษัท</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow className="mb-3">
                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                ชื่อภาษาไทย
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    name="nameTh"
                    value={val.nameTh}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="nameEng" className="col-sm-2 col-form-label">
                ชื่อภาษาอังกฤษ
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    name="nameEng"
                    value={val.nameEng}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">
                ที่อยู่
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    name="address"
                    value={val.address}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="tel" className="col-sm-2 col-form-label">
                เบอร์โทรศัพท์
                </CFormLabel>
                <CCol sm={6}>
                  <CFormInput
                    name="tel"
                    value={val.tel}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                อีเมล์
                </CFormLabel>
                <CCol sm={6}>
                  <CFormInput
                    name="email"
                    value={val.email}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="website" className="col-sm-2 col-form-label">
                เว็บไซต์
                </CFormLabel>
                <CCol sm={6}>
                  <CFormInput
                    name="website"
                    value={val.website}
                  />
                </CCol>
              </CRow>
            </CModalBody>
          </CModal>
        ))}
      </CCard>
    </>
  )
}

export default Company
