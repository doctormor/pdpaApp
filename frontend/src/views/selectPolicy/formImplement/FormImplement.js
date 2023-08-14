import React, { useEffect, useState, createRef } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormTextarea,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormCheck,
  CBadge,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import { cilBrowser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'

const FormImplement = ({ site_location }) => {
  const userId = localStorage.getItem('userId')

  const [compId, setCompId] = useState('')
  const [dataList, setDataList] = useState([])
  const [dataPdpaList, setDataPdpaList] = useState([])
  const [checked, setChecked] = useState([])

  const [visible, setVisible] = useState(false)

  // Get Company ID
  useEffect(() => {
    axios.get(`${site_location}:3001/api/company/companyByUserId/${userId}`).then((response) => {
      if (response.data != '') {
        setCompId(response.data[0].id)
      }
    })

    return () => {}
  }, [])

  useEffect(() => {
    // ดึงข้อมูลของแบบฟอร์มมาจากฐานข้อมูล
    axios.get(`${site_location}:3001/api/formList/dataByUserId/${userId}/1`).then((response) => {
      axios
        .get(`${site_location}:3001/api/policyMasterList/1`)
        .then((responses) => {
          setDataList(responses.data)

          if (response.data != '') {

            setDataPdpaList(response.data)
            response.data.map((data, idx) => checked.push(parseInt(data.pdpaId)))
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })

    return () => {}
  }, [])

  
  // dataPdpaList.forEach((element) => {
  //   const newArray = [...dataList]
  //   const index = dataList.findIndex((list) => list.id == element.pdpaId)

  //   newArray[index] = { ...newArray[index], details: element.details }
  //   if (newArray != '') {
  //   setDataList(newArray)
  //   }
  // })
  // if (newArray != '') {
  //   console.log(newArray)
  //   setDataList(newArray)
  // }
  // setDataList(...dataList, newArray)

  // console.log(dataList)
  

  // console.log(dataList)

  // if (dataPdpaList != '') {
  //   // console.log(dataPdpaList)
  //   const newArray = [...dataList]
  //   dataPdpaList.forEach((element) => {

  //     // dataList.forEach((val, i) => {
  //     //   val.id == element.pdpaId
  //     //     ? (newArray[i] = { ...newArray[i], details: element.details })
  //     //     : (newArray[i] = { ...newArray[i], details: val.details })
  //     // })
  //     dataList.forEach((val, i) => {
  //       val.id == element.pdpaId
  //         ? console.log(element.details)
  //         : console.log(val.details)
  //     })

  //     // setDataList(newArray)
  //   })
  //   console.log(newArray)
  // }

  // console.log(dataList)

  // Add/Remove checked item from list
  const handleCheck = (id) => {
    const newChecked = [...checked]
    const index = newChecked.indexOf(id)

    if (index == -1) {
      newChecked.push(id)
    } else {
      newChecked.splice(index, 1)
    }
    setChecked(newChecked)
  }

  const handleChange = (id) => (e) => {
    const field = e.target.name
    const fieldVal = e.target.value

    const newArray = [...dataList]
    let index = dataList.findIndex((list) => list.id === id)

    newArray[index] = { ...newArray[index], details: fieldVal }

    setDataList(newArray)
  }

  // Save Data
  const saveData = (e) => {
    e.preventDefault()

    axios.get(`${site_location}:3001/api/formList/dataByUserId/${userId}/1`).then((response) => {
      if (response.data == '') {
        // Save Data
        axios
          .post(`${site_location}:3001/api/formList/saveData`, {
            compId: compId,
            checked: checked,
            dataList: dataList,
          })
          .then((response) => {
            setVisible(true)

            setTimeout(() => {
              setVisible(false)
            }, 1500)
          })
      } else {
        //Update data
        axios
          .post(`${site_location}:3001/api/formList/updateData`, {
            compId: compId,
            checked: checked,
            dataList: dataList,
          })
          .then((response) => {
            setVisible(true)

            setTimeout(() => {
              setVisible(false)
            }, 1500)
          })
      }
    })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" /> แบบฟอร์มบันทึกข้อมูลแหล่งที่เก็บข้อมูล
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol sm={8} className="d-md-block">
              <p className="h5">คุณเก็บข้อมูลส่วนบุคคลของผู้ใช้งานจากแหล่งใดบ้าง</p>
            </CCol>
            <CCol sm={4} className="d-md-block">
              {/* <CBadge color="success" className="float-end">
                Active
              </CBadge> */}
            </CCol>
          </CRow>
          <hr />
          <CForm onSubmit={saveData}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                ชื่อนโยบาย
              </CFormLabel>
              <CCol sm={10}>
                {dataList.map((val, i) => (
                  <div className="mb-4" key={i}>
                    <CFormCheck
                      type="checkbox"
                      value={val.id}
                      label={val.name}
                      className="mb-2"
                      onChange={() => handleCheck(val.id)}
                      checked={checked.find((x) => x == val.id) ? true : false}
                    />
                    <CFormInput
                      index={i}
                      name="details"
                      value={
                        dataPdpaList.find((x) => x.pdpaId == val.id)
                          ? dataPdpaList
                              .filter((x) => x.pdpaId == val.id)
                              .map((val, i) => val.details)
                          : val.details
                      }
                      // value={val.details}
                      onChange={handleChange(val.id)}
                    />
                  </div>
                ))}
              </CCol>
            </CRow>
            <CButton type="submit" className="float-end">
              Save
            </CButton>
          </CForm>
        </CCardBody>

        {/* Modal save success */}
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle className="้h5 text-success">Save Success !!!</CModalTitle>
          </CModalHeader>
          <CModalBody>บันทึกข้อมูลเรียบร้อย</CModalBody>
        </CModal>
      </CCard>
    </>
  )
}

// 👇️ define prop types for the component
FormImplement.propTypes = {
  site_location: PropTypes.string,
}

export default FormImplement
