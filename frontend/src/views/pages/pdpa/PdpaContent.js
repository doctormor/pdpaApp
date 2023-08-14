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

const PdpaContent = () => {
  const site_location = localStorage.getItem('siteLocation')
  const userId = localStorage.getItem('userId')

  const [dataPdpa, setDataPdpa] = useState('')
  const [dataList, setDataList] = useState([])
  const [dataChoiceList, setDataChoiceList] = useState([])

  // Get Company ID
  useEffect(() => {
    axios.get(`${site_location}:3001/api/company/companyByUserId/${userId}`).then((response) => {
      if (response.data != '') {
        axios
          .get(`${site_location}:3001/api/policyType/show/${response.data[0].id}`)
          .then((response) => {
            setDataList(response.data)
          })
          .catch((error) => {
            console.log(error)
          })

        axios
          .get(`${site_location}:3001/api/formList/${response.data[0].id}`)
          .then((response) => {
            setDataChoiceList(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })

    axios
      .get(`${site_location}:3001/api/formData/dataByUserId/${userId}`)
      .then((response) => {
        if(response.data!=''){
          setDataPdpa(response.data[0])
        }
      
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {}
  }, [])

  //   console.log(dataChoiceList)

  return (
    <div className="bg-light min-vh-100 d-flex flex-row pt-5">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <p className="h1 text-info fw-semibold">นโยบายความเป็นส่วนตัว (Privacy Policy)</p>
            <p
              className="text-muted fs-5 fw-medium"
              dangerouslySetInnerHTML={{ __html: dataPdpa.details }}
            />
            {dataList.map((val, i) => (
              <div key={i}>
                <p className="h2 text-info">
                  ข้อ {i + 1} {val.title}
                </p>
                {val.par1 != '' ? (
                  <p
                    className="text-muted fs-5 fw-medium"
                    dangerouslySetInnerHTML={{ __html: val.par1 }}
                  />
                ) : (
                  ''
                )}
                <ul>
                  {dataChoiceList
                    .filter((x) => x.typeId == val.typeId)
                    .map((subval, ii) => (
                      <div key={ii}>
                        <li className="text-dark fs-5 fw-medium">
                          {subval.name}
                        </li>
                        <p
                          className="text-muted fs-5 fw-medium"
                          dangerouslySetInnerHTML={{ __html: subval.details }}
                        />
                      </div>
                    ))}
                </ul>
                {val.par2 != '' ? (
                  <p
                    className="text-muted fs-5 fw-medium"
                    dangerouslySetInnerHTML={{ __html: val.par2 }}
                  />
                ) : (
                  ''
                )}
              </div>
            ))}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default PdpaContent
