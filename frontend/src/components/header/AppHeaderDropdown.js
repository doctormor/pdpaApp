import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilSettings, cilTask, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import user_avatar from './../../assets/images/avatars/user_avatar.jpg'

const AppHeaderDropdown = () => {

  const site_location = localStorage.getItem('siteLocation')

  const logout = (evt) => {
    evt.preventDefault()
    axios.post(`${site_location}:3001/api/users/logout`, {}).then((response) => {
      if (response.data.status === false) {
        // setLoginStatus(response.data.status);
        localStorage.setItem('loginNow', response.data.status)
        localStorage.setItem('Userid', '')
        localStorage.setItem('siteLocation', '')

        window.location.reload(false)
      }
    })
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={user_avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <NavLink to="/accounts/profile">
          <CDropdownItem href="#">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
        </NavLink>
        <NavLink to="/accounts/settings">
          <CDropdownItem href="#">
            <CIcon icon={cilSettings} className="me-2" />
            Settings
          </CDropdownItem>
        </NavLink>
        <CDropdownDivider />
          <CDropdownItem href="#" onClick={logout}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Lock Out
          </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

// 👇️ define prop types for the component
AppHeaderDropdown.propTypes = {
  site_location: PropTypes.string,
}

export default AppHeaderDropdown
