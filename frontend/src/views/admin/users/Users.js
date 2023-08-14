import React, { useEffect, useState, createRef } from 'react'
import axios from 'axios'
import {
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
import { cilBrowser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Users = () => {
  const site_location = localStorage.getItem('siteLocation')

  const [userList, setUserList] = useState([])

  useEffect(() => {
    axios
      .get(`${site_location}:3001/api/users`)
      .then((response) => {
        setUserList(response.data)
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
          <CIcon icon={cilBrowser} className="me-2" /> รายการข้อมูลผู้ใช้งานทั้งหมด
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">ผู้ใช้งาน</CTableHeaderCell>
                <CTableHeaderCell scope="col">คำนำหน้า</CTableHeaderCell>
                <CTableHeaderCell scope="col">ชื่อ</CTableHeaderCell>
                <CTableHeaderCell scope="col">นามสกุล</CTableHeaderCell>
                <CTableHeaderCell scope="col">เบอร์โทรศัพท์</CTableHeaderCell>
                <CTableHeaderCell scope="col">อีเมล์</CTableHeaderCell>
                <CTableHeaderCell scope="col">ประเภทผู้ใช้งาน</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {userList.slice(0).map((val, i) => (
                <CTableRow key={i}>
                  <CTableHeaderCell scope="row">{i+1}</CTableHeaderCell>
                  <CTableDataCell>{val.username}</CTableDataCell>
                  <CTableDataCell>{val.title}</CTableDataCell>
                  <CTableDataCell>{val.firstname}</CTableDataCell>
                  <CTableDataCell>{val.lastname}</CTableDataCell>
                  <CTableDataCell>{val.tel}</CTableDataCell>
                  <CTableDataCell>{val.email}</CTableDataCell>
                  <CTableDataCell>{val.userType=='A'? 'ผู้ดูแลระบบ' : val.userType=='U'? 'ผู้ใช้งานทั่วไป' : ''}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Users
