import React, { useEffect, useState, createRef } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormCheck,
  CFormTextarea,
} from '@coreui/react'
import { cilBrowser, cilChevronDoubleRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '../../../style.css'

const FormUse = ({ site_location }) => {
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
    axios.get(`${site_location}:3001/api/formList/dataByUserId/${userId}/4`).then((response) => {
      axios
        .get(`${site_location}:3001/api/policyMasterList/4`)
        .then((responses) => {
          setDataList(responses.data)
        })
        .catch((error) => {
          console.log(error)
        })

      if (response.data != '') {
        setDataPdpaList(response.data)
        response.data.map((data, idx) => checked.push(parseInt(data.pdpaId)))
      }
    })

    return () => {}
  }, [])

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

  const handleChange = (id, data) => {
    const fieldVal = data

    const newArray = [...dataList]
    let index = dataList.findIndex((list) => list.id === id)

    newArray[index] = { ...newArray[index], details: fieldVal }

    setDataList(newArray)
  }

  // Save Data
  const saveData = (e) => {
    e.preventDefault()

    axios.get(`${site_location}:3001/api/formList/dataByUserId/${userId}/4`).then((response) => {
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
          <CIcon icon={cilBrowser} className="me-2" /> แบบฟอร์มบันทึกการนำข้อมูลไปใช้
        </CCardHeader>
        <CCardBody>
          <p className="h5">รายละเอียดการนำข้อมูลไปใช้</p>
          <hr />
          <CForm onSubmit={saveData}>
            <CRow className="mb-3">
              <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">
                  <strong>Select choice</strong>{' '}
                  <CIcon icon={cilChevronDoubleRight} className="me-2" />
                </legend>
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
                      <CKEditor
                        editor={ClassicEditor}
                        name="details"
                        data={
                          dataPdpaList.find((x) => x.pdpaId == val.id)
                            ? dataPdpaList.find((x) => x.pdpaId == val.id).details
                            : val.details
                        }
                        onChange={(event, editor) => {
                          const data = editor.getData()
                          handleChange(val.id, data)
                        }}
                      />
                    </div>
                  ))}
                </CCol>
              </fieldset>
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
FormUse.propTypes = {
  site_location: PropTypes.string,
}

export default FormUse
