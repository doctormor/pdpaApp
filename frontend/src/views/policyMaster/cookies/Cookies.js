import React, { useEffect, useState, createRef } from 'react'
import axios from 'axios'
import {
  CCol,
  CRow,
  CButtonGroup,
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
} from '@coreui/react'
import PropTypes from 'prop-types'
import { cilBrowser, cilColorBorder, cilXCircle, cilMedicalCross, cilList } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'

const PolicyType = () => {
  const site_location = localStorage.getItem('siteLocation')

  const [dataList, setDataList] = useState([])

  useEffect(() => {
    axios
      .get(`${site_location}:3001/api/cookiesMaster`)
      .then((response) => {
        setDataList(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {}
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" /> รายการข้อมูลนโยบายเกี่ยวกับคุกกี้ (Cookies
          Policy)
        </CCardHeader>
        <CCardBody>
          <CRow className="py-3">
            <CCol sm={4}></CCol>
            <CCol sm={4}></CCol>
            <CCol sm={4} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                <Link to="/policyMaster/cookiesAdd">
                  <CButton color="primary" className="float-end">
                    <CIcon icon={cilMedicalCross} /> เพิ่มข้อมูล
                  </CButton>
                </Link>
              </CButtonGroup>
            </CCol>
          </CRow>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">ชื่อคุกกี้</CTableHeaderCell>
                <CTableHeaderCell scope="col">ชื่อสำหรับการแสดงผล</CTableHeaderCell>
                <CTableHeaderCell scope="col">แก้ไข</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">ลบ</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataList.slice(0).map((val, i) => (
                <CTableRow key={i}>
                  <CTableHeaderCell scope="row">{val.id}</CTableHeaderCell>
                  <CTableDataCell>{val.name}</CTableDataCell>
                  <CTableDataCell>{val.title}</CTableDataCell>
                  <CTableDataCell>
                    <Link to={`/policyMaster/cookiesEdit/${val.id}`}>
                      <CIcon icon={cilColorBorder} className="me-2 text-warning" />
                    </Link>
                  </CTableDataCell>
                  {/* <CTableDataCell>
                    <CIcon icon={cilXCircle} className="me-2 text-danger" />
                  </CTableDataCell> */}
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default PolicyType
