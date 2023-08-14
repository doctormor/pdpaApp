import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
  CPopover,
  CButton,
  CTooltip,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import app_logo from './../assets/brand/pdpa_app.png'

const AppHeader = ({ site_location }) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const userId = localStorage.getItem('userId')

  const [compId, setCompId] = useState('')

  // Get Company ID
  useEffect(() => {
    axios.get(`${site_location}:3001/api/company/companyByUserId/${userId}`).then((response) => {
      if (response.data != '') {
        setCompId(response.data[0].id)
      }
    })

    return () => {}
  }, [])

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img src={app_logo} height={48} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto"></CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CDropdown variant="nav-item">
              <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                <CIcon icon={cilBell} size="lg" />
                {compId == '' ? (
                  <CBadge color="danger" className="ms-2">
                    1
                  </CBadge>
                ) : (
                  ''
                )}
              </CDropdownToggle>
              {compId == '' ? (
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownHeader className="bg-info fw-semibold py-2 text-white">
                    Notifications Items
                  </CDropdownHeader>
                  {/* <NavLink to="/accounts/profile">
                  <CDropdownItem href="#">- Manage Profile</CDropdownItem>
                </NavLink> */}
                  <NavLink to="/accounts/settings">
                    <CDropdownItem href="#">- Manage Settings</CDropdownItem>
                  </NavLink>
                </CDropdownMenu>
              ) : (
                ''
              )}
            </CDropdown>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown site_location={site_location} />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

// 👇️ define prop types for the component
AppHeader.propTypes = {
  site_location: PropTypes.string,
}

export default AppHeader
