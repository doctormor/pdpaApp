import React, { useEffect, useState, createRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilGlobeAlt, cilSearch } from '@coreui/icons'

const Dashboard = () => {
  const site_location = localStorage.getItem('siteLocation')
  const userId = localStorage.getItem('userId')

  const [compId, setCompId] = useState('')
  const [countPdpaAll, setCountPdpaAll] = useState(0)
  const [countActivePdpa, setCountActivePdpa] = useState(0)
  const [countUnActivePdpa, setCountUnActivePdpa] = useState(0)
  const [countCookiesAll, setCountCookiesAll] = useState(0)
  const [countActiveCookies, setCountActiveCookies] = useState(0)
  const [countUnActiveCookies, setCountUnActiveCookies] = useState(0)

  const [listAll1, setListAll1] = useState(0)
  const [listUse1, setListUse1] = useState(0)

  const [listAll2, setListAll2] = useState(0)
  const [listUse2, setListUse2] = useState(0)

  const [listAll3, setListAll3] = useState(0)
  const [listUse3, setListUse3] = useState(0)

  const [listAll4, setListAll4] = useState(0)
  const [listUse4, setListUse4] = useState(0)

  const [listAll5, setListAll5] = useState(0)
  const [listUse5, setListUse5] = useState(0)

  useEffect(() => {
    axios.get(`${site_location}:3001/api/company/companyByUserId/${userId}`).then((response) => {
      if (response.data != '') {
        setCompId(response.data[0].id)

        // Count Type
        axios
          .get(`${site_location}:3001/api/dashboard/countPdpaAll/${response.data[0].id}`)
          .then((response) => {
            setCountPdpaAll(response.data[0].pdpaCount)
          })
        axios
          .get(`${site_location}:3001/api/dashboard/countPdpaActive/${response.data[0].id}/1`)
          .then((response) => {
            setCountActivePdpa(response.data[0].pdpaCount)
          })
        axios
          .get(`${site_location}:3001/api/dashboard/countPdpaActive/${response.data[0].id}/0`)
          .then((response) => {
            setCountUnActivePdpa(response.data[0].pdpaCount)
          })

        // Count Cookies
        axios
          .get(`${site_location}:3001/api/dashboard/countCookiesAll/${response.data[0].id}`)
          .then((response) => {
            setCountCookiesAll(response.data[0].cookiesCount)
          })
        axios
          .get(`${site_location}:3001/api/dashboard/countCookiesActive/${response.data[0].id}/1`)
          .then((response) => {
            setCountActiveCookies(response.data[0].cookiesCount)
          })
        axios
          .get(`${site_location}:3001/api/dashboard/countCookiesActive/${response.data[0].id}/0`)
          .then((response) => {
            setCountUnActiveCookies(response.data[0].cookiesCount)
          })

        // Count List
        axios.get(`${site_location}:3001/api/dashboard/countListAll/1`).then((response) => {
          setListAll1(response.data[0].listCount)
        })
        axios
          .get(`${site_location}:3001/api/dashboard/countListActive/${response.data[0].id}/1`)
          .then((response) => {
            setListUse1(response.data[0].listCount)
          })

        axios.get(`${site_location}:3001/api/dashboard/countListAll/2`).then((response) => {
          setListAll2(response.data[0].listCount)
        })
        axios
          .get(`${site_location}:3001/api/dashboard/countListActive/${response.data[0].id}/2`)
          .then((response) => {
            setListUse2(response.data[0].listCount)
          })

        axios.get(`${site_location}:3001/api/dashboard/countListAll/3`).then((response) => {
          setListAll3(response.data[0].listCount)
        })
        axios
          .get(`${site_location}:3001/api/dashboard/countListActive/${response.data[0].id}/3`)
          .then((response) => {
            setListUse3(response.data[0].listCount)
          })

        axios.get(`${site_location}:3001/api/dashboard/countListAll/4`).then((response) => {
          setListAll4(response.data[0].listCount)
        })
        axios
          .get(`${site_location}:3001/api/dashboard/countListActive/${response.data[0].id}/4`)
          .then((response) => {
            setListUse4(response.data[0].listCount)
          })

        axios.get(`${site_location}:3001/api/dashboard/countListAll/5`).then((response) => {
          setListAll5(response.data[0].listCount)
        })
        axios
          .get(`${site_location}:3001/api/dashboard/countListActive/${response.data[0].id}/5`)
          .then((response) => {
            setListUse5(response.data[0].listCount)
          })
      }
    })

    return () => {}
  }, [])

  const calPercent = (valfull, val) => {
    let percent = 0
    percent = (val / valfull) * 100
    return percent
  }

  const calDiff = (val1, val2) => {
    let result = 0
    result = val1 - val2
    return result
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>การดำเนินการเกี่ยวกับข้อมูลนโยบายความเป็นส่วนตัว</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={12} xl={12}>
                  <CRow>
                    {compId != '' ? (
                      <CCol sm={12} className="d-md-block">
                        <CButtonGroup className="float-end me-3">
                          <Link to={`/pdpa`} target="_blank">
                            <CButton color="info" className="float-end text-white">
                              <CIcon icon={cilGlobeAlt} /> Preview PDPA
                            </CButton>
                          </Link>
                        </CButtonGroup>
                        <CButtonGroup className="float-end me-3">
                          <Link to={`/cookies`} target="_blank">
                            <CButton color="info" className="float-end text-white">
                              <CIcon icon={cilGlobeAlt} /> Preview Cookies
                            </CButton>
                          </Link>
                        </CButtonGroup>
                      </CCol>
                    ) : (
                      ''
                    )}
                  </CRow>
                </CCol>
              </CRow>

              <br />

              <CRow className="mb-3">
                <CCol sm={12} className="d-md-block">
                  <p className="h5">
                    รายการหัวข้อประเภทนโยบายความเป็นส่วนตัว (Privacy Policy Type)
                    และนโยบายเกี่ยวกับคุกกี้ (Cookies Policy)
                  </p>
                </CCol>
              </CRow>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                    <CTableHeaderCell>ชื่อรายการ</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">หัวข้อทั้งหมด</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">ใช้งาน</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">ไม่ใช้งาน</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">ดูรายละเอียด</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">1</CTableDataCell>
                    <CTableDataCell>ประเภทนโยบายความเป็นส่วนตัว</CTableDataCell>
                    <CTableDataCell className="text-center">{countPdpaAll}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {countActivePdpa}
                      <CProgress
                        thin
                        color="success"
                        value={calPercent(countPdpaAll, countActivePdpa)}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {countUnActivePdpa}
                      <CProgress
                        thin
                        color="primary"
                        value={calPercent(countPdpaAll, countUnActivePdpa)}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/pdpaManagement/policyType`}>
                        <CIcon icon={cilSearch} className="me-2 text-success text-center" />
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">2</CTableDataCell>
                    <CTableDataCell>นโยบายเกี่ยวกับคุกกี้</CTableDataCell>
                    <CTableDataCell className="text-center">{countCookiesAll}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {countActiveCookies}
                      <CProgress
                        thin
                        color="success"
                        value={calPercent(countCookiesAll, countActiveCookies)}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {countUnActiveCookies}
                      <CProgress
                        thin
                        color="primary"
                        value={calPercent(countCookiesAll, countUnActiveCookies)}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/pdpaManagement/cookiesList`}>
                        <CIcon icon={cilSearch} className="me-2 text-success text-center" />
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <br />
              <CRow className="mb-3">
                <CCol sm={8} className="d-md-block">
                  <p className="h5">รายการนโยบายความเป็นส่วนตัว (Privacy Policy)</p>
                </CCol>
              </CRow>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                    <CTableHeaderCell>ชื่อรายการ</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">หัวข้อทั้งหมด</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">ใช้งาน</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">ไม่ใช้งาน</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">ดูรายละเอียด</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">1</CTableDataCell>
                    <CTableDataCell>แหล่งที่เก็บข้อมูล</CTableDataCell>
                    <CTableDataCell className="text-center">{listAll1}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {listUse1}
                      <CProgress thin color="success" value={calPercent(listAll1, listUse1)} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {calDiff(listAll1, listUse1)}
                      <CProgress
                        thin
                        color="primary"
                        value={calPercent(listAll1, calDiff(listAll1, listUse1))}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/selectPolicy/formImplement`}>
                        <CIcon icon={cilSearch} className="me-2 text-success text-center" />
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">2</CTableDataCell>
                    <CTableDataCell>ประเภทข้อมูลที่เก็บ</CTableDataCell>
                    <CTableDataCell className="text-center">{listAll2}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {listUse2}
                      <CProgress thin color="success" value={calPercent(listAll2, listUse2)} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {calDiff(listAll2, listUse2)}
                      <CProgress
                        thin
                        color="primary"
                        value={calPercent(listAll2, calDiff(listAll2, listUse2))}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/selectPolicy/formType`}>
                        <CIcon icon={cilSearch} className="me-2 text-success text-center" />
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">3</CTableDataCell>
                    <CTableDataCell>สถานที่เก็บข้อมูล</CTableDataCell>
                    <CTableDataCell className="text-center">{listAll3}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {listUse3}
                      <CProgress thin color="success" value={calPercent(listAll3, listUse3)} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {calDiff(listAll3, listUse3)}
                      <CProgress
                        thin
                        color="primary"
                        value={calPercent(listAll3, calDiff(listAll3, listUse3))}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/selectPolicy/formPlace`}>
                        <CIcon icon={cilSearch} className="me-2 text-success text-center" />
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">4</CTableDataCell>
                    <CTableDataCell>ใช้ข้อมูลทำอะไรบ้าง</CTableDataCell>
                    <CTableDataCell className="text-center">{listAll4}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {listUse4}
                      <CProgress thin color="success" value={calPercent(listAll4, listUse4)} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {calDiff(listAll4, listUse4)}
                      <CProgress
                        thin
                        color="primary"
                        value={calPercent(listAll4, calDiff(listAll4, listUse4))}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/selectPolicy/formUse`}>
                        <CIcon icon={cilSearch} className="me-2 text-success text-center" />
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">5</CTableDataCell>
                    <CTableDataCell>การเปิดเผยข้อมูล</CTableDataCell>
                    <CTableDataCell className="text-center">{listAll5}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {listUse5}
                      <CProgress thin color="success" value={calPercent(listAll5, listUse5)} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {calDiff(listAll5, listUse5)}
                      <CProgress
                        thin
                        color="primary"
                        value={calPercent(listAll5, calDiff(listAll5, listUse5))}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/selectPolicy/formWho`}>
                        <CIcon icon={cilSearch} className="me-2 text-success text-center" />
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
