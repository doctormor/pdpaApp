import React, { useEffect, useState, createRef } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import app_logo from './../assets/brand/pdpa_app.png'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation_user from '../_nav_user'
import navigation_admin from '../_nav_admin'

const AppSidebar = ({ site_location }) => {

  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const userId = localStorage.getItem('userId')

  const [userType, setUserType] = useState('')

  useEffect(() => {
    axios.get(`${site_location}:3001/api/users/userByid/${userId}`).then((response) => {

      if (response.data != '') {
        setUserType(response.data[0].userType)
      }
    })

    return () => {}
  }, [])

  let newNav = ''


  if(userType=='A'){
    newNav = navigation_admin
  } else if(userType == 'U'){
    newNav = navigation_user
  }

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={app_logo} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={newNav} site_location={site_location} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

// 👇️ define prop types for the component
AppSidebar.propTypes = {
  site_location: PropTypes.string,
}

export default React.memo(AppSidebar)
