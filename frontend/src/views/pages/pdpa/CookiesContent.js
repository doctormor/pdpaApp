import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import '../../../style.css'
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Kanit', 'sans-serif'],
  },
})

const CookiesContent = () => {
  const site_location = localStorage.getItem('siteLocation')
  const userId = localStorage.getItem('userId')

  const [dataList, setDataList] = useState([])

  // Get Company ID
  useEffect(() => {
    axios.get(`${site_location}:3001/api/company/companyByUserId/${userId}`).then((response) => {
      if (response.data != '') {

        axios
          .get(`${site_location}:3001/api/cookiesList/show/${response.data[0].id}`)
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

  return (
    <div className="bg-light min-vh-100 d-flex flex-row pt-5">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            {dataList.map((val, i) => (
              <div key={i}>
                {val.cookiesId == '1'?(
                <p className="h1 text-info fw-semibold">
                  {val.title}
                </p>
                ):(
                  <p className="h2 text-info">
                  ข้อ {i} {val.title}
                </p>
                )}
                <p
                  className="text-muted fs-5 fw-medium"
                  dangerouslySetInnerHTML={{ __html: val.details }}
                />
              </div>
            ))}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default CookiesContent
