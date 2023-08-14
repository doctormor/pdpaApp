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
  CBadge,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { cilBrowser, cilColorBorder, cilPlaylistAdd, cilMedicalCross } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'

const PolicyType = () => {
  const site_location = localStorage.getItem('siteLocation')

  const [dataList, setDataList] = useState([])

  useEffect(() => {
    axios
      .get(`${site_location}:3001/api/policyMasterType`)
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
          <CIcon icon={cilBrowser} className="me-2" />{' '}
          รายการข้อมูลประเภทนโยบายความเป็นส่วนตัวทั้งหมด
        </CCardHeader>
        <CCardBody>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end py-3">
            <Link to="/policyMaster/PolicyTypeAdd">
              <CButton color="primary" className="me-md-2 float-end">
                <CIcon icon={cilMedicalCross} /> เพิ่มข้อมูล
              </CButton>
            </Link>
          </div>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">ชื่อประเภทนโยบาย</CTableHeaderCell>
                <CTableHeaderCell scope="col">ชื่อสำหรับการแสดงผล</CTableHeaderCell>
                <CTableHeaderCell scope="col">รายการนโยบาย</CTableHeaderCell>
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
                  {val.formType == 'CHK' ? (
                    <CTableDataCell className="text-center">
                      <Link to={`/policyMaster/policy/${val.id}`}>
                        <CIcon icon={cilPlaylistAdd} className="me-2 text-success" size={'xl'} />
                      </Link>
                      <CBadge color="info">{val.listCount}</CBadge>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell className="text-center"></CTableDataCell>
                  )}
                  <CTableDataCell className="text-center">
                    <Link to={`/policyMaster/policyTypeEdit/${val.id}`}>
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
