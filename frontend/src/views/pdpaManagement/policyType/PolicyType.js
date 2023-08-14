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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { cilBrowser, cilColorBorder, cilCheck, cilBan, cilXCircle, cilMedicalCross } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate } from 'react-router-dom'

const PolicyType = () => {
  const navigate = useNavigate()

  const site_location = localStorage.getItem('siteLocation')
  const userId = localStorage.getItem('userId')

  const [dataList, setDataList] = useState([])
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [visible, setVisible] = useState(false)

  // Get Company ID
  useEffect(() => {
    axios.get(`${site_location}:3001/api/company/companyByUserId/${userId}`).then((response) => {
      if (response.data != '') {
        axios
          .get(`${site_location}:3001/api/policyType/${response.data[0].id}`)
          .then((response) => {
            setDataList(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })

    return () => {}
  }, [])

  //alert confirm delete
  const handleConfirmDelete = (id) => {
    setDeleteId(id)
    // console.log('confirm delete id : ', id)
    setConfirmVisible(true)
  }

  // Delete Data
  const handleDeleteData = () => {
    setDataList((pre) => {
      const newArray = [...pre]
      return newArray.filter((item) => item.id !== deleteId)
    })

    axios
      .post(`${site_location}:3001/api/policyType/deleteData`, {
        id: deleteId,
      })
      .then((response) => {
        setConfirmVisible(false)
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
          <CIcon icon={cilBrowser} className="me-2" />{' '}
          รายการข้อมูลประเภทนโยบายความเป็นส่วนตัวทั้งหมด
        </CCardHeader>
        <CCardBody>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end py-3">
            <Link to="/pdpaManagement/policyTypeAdd">
              <CButton color="primary" className="float-end">
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
                <CTableHeaderCell scope="col">สถานะ</CTableHeaderCell>
                <CTableHeaderCell scope="col">แก้ไข</CTableHeaderCell>
                <CTableHeaderCell scope="col">ลบ</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataList.map((val, i) => (
                <CTableRow key={i}>
                  <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                  <CTableDataCell>{val.name}</CTableDataCell>
                  <CTableDataCell>{val.title}</CTableDataCell>
                  <CTableDataCell>
                    {val.actived == '1' ? (
                      <CIcon icon={cilCheck} className="me-2 text-success" />
                    ) : (
                      <CIcon icon={cilBan} className="me-2 text-dark" />
                    )}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <Link to={`/pdpaManagement/policyTypeEdit/${val.id}`}>
                      <CIcon icon={cilColorBorder} className="me-2 text-warning" />
                    </Link>
                  </CTableDataCell>
                  <CTableDataCell>
                    <Link to="#" onClick={() => handleConfirmDelete(val.id)}>
                      <CIcon icon={cilXCircle} className="me-2 text-danger" />
                    </Link>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>

        {/* Modal delete alert */}
        <CModal visible={confirmVisible} onClose={() => setConfirmVisible(false)}>
          <CModalHeader>
            <CModalTitle className="้h5 text-danger">Confirm delete data !!!</CModalTitle>
          </CModalHeader>
          <CModalBody>คุณแน่ใจที่จะต้องการลบข้อมูลนี้ใช่หรือไม่</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setConfirmVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleDeleteData}>
              OK
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal delete alert */}
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle className="้h5 text-success">Delete Data Success !!!</CModalTitle>
          </CModalHeader>
          <CModalBody>ลบข้อมูลเรียบร้อย</CModalBody>
        </CModal>
      </CCard>
    </>
  )
}

export default PolicyType
