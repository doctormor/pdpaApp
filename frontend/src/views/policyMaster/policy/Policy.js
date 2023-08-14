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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import PropTypes from 'prop-types'
import {
  cilBrowser,
  cilColorBorder,
  cilXCircle,
  cilMedicalCross,
  cilList,
  cilArrowThickLeft,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const Policy = () => {
  const params = useParams()

  const navigate = useNavigate()

  const site_location = localStorage.getItem('siteLocation')

  const [nameType, setNameType] = useState('')
  const [dataList, setDataList] = useState([])
  const [deleteId, setDeleteId] = useState('')

  const [confirmVisible, setConfirmVisible] = useState(false)
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

  useEffect(() => {
    axios
      .get(`${site_location}:3001/api/policyMasterList/${params.typeId}`)
      .then((response) => {
        setDataList(response.data)
      })
      .catch((error) => {
        console.log(error)
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

    setDataList(pre => {
      const newArray = [...pre]
      return newArray.filter(item => item.id !==deleteId)
    })

    axios
      .post(`${site_location}:3001/api/policyMasterList/deleteData`, {
        id: deleteId,
      })
      .then((response) => {
        setConfirmVisible(false)
        setVisible(true)

        setTimeout(() => {
          setVisible(false)
        }, 1500)

        setTimeout(() => {
            // window.location.reload(false)
          navigate(`/policyMaster/policy/${params.typeId}`, { replace: true })
        }, 2000)
      })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" />{' '}
          <strong className="text-primary">{nameType}</strong> /
          รายการข้อมูลนโยบายความเป็นส่วนตัวทั้งหมด
        </CCardHeader>
        <CCardBody>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end py-3">
            <Link to={`/policyMaster/PolicyType`}>
              <CButton color="info" className="float-end">
                <CIcon icon={cilArrowThickLeft} /> Back
              </CButton>
            </Link>
            <Link to={`/policyMaster/PolicyAdd/${params.typeId}`}>
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
                <CTableHeaderCell scope="col">แก้ไข</CTableHeaderCell>
                <CTableHeaderCell scope="col">ลบ</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataList.slice(0).map((val, i) => (
                <CTableRow key={i}>
                  <CTableHeaderCell scope="row">{i+1}</CTableHeaderCell>
                  <CTableDataCell>{val.name}</CTableDataCell>
                  <CTableDataCell>{val.title}</CTableDataCell>
                  <CTableDataCell>
                    <Link to={`/policyMaster/policyEdit/${val.id}`}>
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
            <CButton color="primary" onClick={handleDeleteData}>OK</CButton>
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

export default Policy
