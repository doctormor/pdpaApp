import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import PropTypes from 'prop-types'
import { cilBrowser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import '../../../style.css'

const PrintPdpa = () => {
  const [dataList, setDataList] = useState('')

  const handleChange = (e) => {
    // const fieldVal = e.target.value

    console.log(e)
  }

  console.log(dataList)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBrowser} className="me-2" /> แบบฟอร์มบันทึกข้อมูลส่วนตัว
        </CCardHeader>
        <CCardBody>
          <p className="h5">รายละเอียดข้อมูลส่วนตัว</p>
          <hr />
          <div className="App">
            <h2>Using CKEditor 5 build in React</h2>
            <CKEditor
              editor={ClassicEditor}
              data="Hello Doctor"
              onChange={(event, editor) => {
                const data = editor.getData()
                handleChange(data)
              }}
            />
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default PrintPdpa
