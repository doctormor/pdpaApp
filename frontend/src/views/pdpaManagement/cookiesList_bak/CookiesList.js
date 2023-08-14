import React, { useEffect, useState, createRef } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { cilBrowser, cilColorBorder, cilXCircle, cilCheck, cilWarning } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'

const PolicyType = () => {
  const site_location = localStorage.getItem('siteLocation')
  const userId = localStorage.getItem('userId')

  const [dataList, setDataList] = useState([])
  const [cookiesList, setCookiesList] = useState([])

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

  useEffect(() => {
    axios
      .get(`${site_location}:3001/api/cookiesList/${userId}`)
      .then((response) => {
        setCookiesList(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {}
  }, [])

  // let ret = dataList.filter(x => cookiesList.find((y)=> y.cookiesId === x.id))
  // let result = cookiesList.filter((x) => dataList.find((y) => x.cookiesId == y.id))
  // let result = dataList.filter((x) => cookiesList.find((y) => x.id == y.cookiesId));
  // let result = cookiesList.filter(x => x.cookiesId == 2)
  // let result = cookiesList.find(x => x.id === 2)
  // let result = cookiesList.filter((o1) => dataList.some((o2) => o1.cookiesId === o2.id))
  // console.log(result)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" /> รายการข้อมูลนโยบายเกี่ยวกับคุกกี้ (Cookies
          Policy)
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                {cookiesList
                  .filter((cookiesList) =>
                    dataList.find((dataList) => cookiesList.cookiesId === dataList.id),
                  )
                  .map((val, i) => (
                    <li key={i}>{val.name}</li>
                  ))}
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">ชื่อคุกกี้</CTableHeaderCell>
                <CTableHeaderCell scope="col">ชื่อสำหรับการแสดงผล</CTableHeaderCell>
                <CTableHeaderCell scope="col">สถานะ</CTableHeaderCell>
                <CTableHeaderCell scope="col">แก้ไข</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataList.map((val, i) => (
                <CTableRow key={i}>
                  <CTableHeaderCell scope="row">{val.id}</CTableHeaderCell>
                  <CTableDataCell>{val.name}</CTableDataCell>
                  <CTableDataCell>{val.title}</CTableDataCell>
                  <CTableDataCell>
                    {cookiesList.find((x) => x.cookiesId == val.id) ? (
                      <CIcon icon={cilCheck} className="me-2 text-success" />
                    ) : (
                      <CIcon icon={cilXCircle} className="me-2 text-danger" />
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    <Link to={`/pdpaManagement/cookiesListAdd/${val.id}`}>
                      <CIcon icon={cilColorBorder} className="me-2 text-warning" />
                    </Link>
                  </CTableDataCell>
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
